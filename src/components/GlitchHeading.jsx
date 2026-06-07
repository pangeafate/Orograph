import React, { useEffect, useRef } from 'react'

/**
 * Character-scramble "decode" heading (ported from the AI-OS / Clarioo
 * TextScramble), made width- and wrap-stable for proportional fonts.
 *
 * Each character is an inline-block cell. The FINAL glyph always sits in normal
 * flow and defines the cell's width (it's just hidden while scrambling); the
 * scramble glyph is painted in an absolutely-positioned overlay, so swapping it
 * never changes width. Words are `white-space: nowrap` inline-blocks, so the
 * line only ever wraps at spaces and the wrap points never move while glitching.
 *
 * `underlineWord` pins a curved underline to a single word (sized to that word).
 * Decodes when scrolled into view, then gently re-glitches. Respects
 * prefers-reduced-motion; `aria-label` carries the clean text for screen readers.
 */

const CHARS = '!@#$%&*+-=?/<>[]{}|^~:;0123456789XZQWK'
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]

function Underline() {
  return (
    <svg
      className="gw-underline"
      width="100%"
      height="10"
      viewBox="0 0 300 10"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M3 4 Q 150 1 297 4" stroke="var(--violet)" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />
    </svg>
  )
}

export default function GlitchHeading({
  text,
  as: Tag = 'h2',
  className = '',
  style,
  delay = 0,
  reveal = true,
  underlineWord = null,
  accentPhrases = [],
}) {
  const rootRef = useRef(null)
  const cells = useRef([]) // [{ base, glyph }] indexed by non-space char order

  // Build word/char structure once.
  const words = text.split(' ')
  const normalize = (word) => word.toLowerCase().replace(/[^a-z0-9]/g, '')
  const normalizedWords = words.map(normalize)
  const accentWordIndexes = new Set()
  for (const phrase of accentPhrases) {
    const phraseWords = phrase.split(' ').map(normalize).filter(Boolean)
    for (let start = 0; start <= normalizedWords.length - phraseWords.length; start++) {
      const matches = phraseWords.every((word, offset) => normalizedWords[start + offset] === word)
      if (matches) {
        phraseWords.forEach((_, offset) => accentWordIndexes.add(start + offset))
      }
    }
  }
  let ci = 0
  const tokens = words.map((w) => [...w].map((ch) => ({ ch, idx: ci++ })))

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const list = cells.current
    const flat = [...text].filter((c) => c !== ' ')
    const N = flat.length

    const setCell = (i, mode, glyph) => {
      const c = list[i]
      if (!c) return
      if (mode === 'done') {
        c.base.style.visibility = 'visible'
        c.glyph.textContent = ''
      } else if (mode === 'pending') {
        c.base.style.visibility = 'hidden'
        c.glyph.textContent = ''
      } else {
        c.base.style.visibility = 'hidden'
        c.glyph.textContent = glyph
      }
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      root.classList.add('is-in')
      return
    }

    let raf = null
    let reglitchTimer = null
    let restoreTimer = null
    let frame = 0
    const schedule = flat.map(() => {
      const s = Math.floor(Math.random() * 40)
      return { start: s, end: s + Math.floor(Math.random() * 40) }
    })
    const state = new Array(N).fill(null)

    const update = () => {
      let complete = 0
      for (let i = 0; i < N; i++) {
        const { start, end } = schedule[i]
        if (frame >= end) {
          complete++
          if (state[i] !== 'done') { setCell(i, 'done'); state[i] = 'done' }
        } else if (frame >= start) {
          if (state[i] === null || state[i] === 'done' || Math.random() < 0.28) {
            const g = randChar()
            setCell(i, 'scramble', g)
            state[i] = g
          }
        }
      }
      if (complete === N) {
        scheduleReglitch()
      } else {
        frame++
        raf = requestAnimationFrame(update)
      }
    }

    const scheduleReglitch = () => {
      reglitchTimer = setTimeout(doReglitch, rand(3500, 8000))
    }
    const doReglitch = () => {
      const count = Math.min(rand(1, 2), N)
      const picks = new Set()
      let guard = 0
      while (picks.size < count && guard++ < 30) picks.add(Math.floor(Math.random() * N))
      picks.forEach((i) => setCell(i, 'scramble', randChar()))
      restoreTimer = setTimeout(() => {
        picks.forEach((i) => setCell(i, 'done'))
        scheduleReglitch()
      }, rand(70, 150))
    }

    const startDecode = () => {
      for (let i = 0; i < N; i++) setCell(i, 'pending') // blank → cells still hold width
      update()
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            root.classList.add('is-in')
            io.unobserve(e.target)
            startDecode()
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(root)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      clearTimeout(reglitchTimer)
      clearTimeout(restoreTimer)
    }
  }, [text])

  return (
    <Tag
      ref={rootRef}
      aria-label={text}
      className={`glitch-heading ${reveal ? 'reveal' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {tokens.map((chars, wi) => (
        <React.Fragment key={wi}>
          <span className={`gw ${underlineWord === wi ? 'gw--underline' : ''} ${accentWordIndexes.has(wi) ? 'gw--accent' : ''}`} aria-hidden="true">
            {chars.map((c) => (
              <span className="gc" key={c.idx}>
                <span
                  className="gc-base"
                  ref={(el) => { if (el) (cells.current[c.idx] = cells.current[c.idx] || {}).base = el }}
                >
                  {c.ch}
                </span>
                <span
                  className="gc-glitch"
                  ref={(el) => { if (el) (cells.current[c.idx] = cells.current[c.idx] || {}).glyph = el }}
                />
              </span>
            ))}
            {underlineWord === wi && <Underline />}
          </span>
          {wi < tokens.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  )
}
