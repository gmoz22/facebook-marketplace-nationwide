"use client"

import { useEffect, useState } from "react"

import { siteConfig } from "@/config/site"

const ROTATION_INTERVAL_MS = 6000
const TRANSITION_DURATION_MS = 400

export function NewsInfoBar() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const messages = siteConfig.newsInfoMessages

  useEffect(() => {
    if (messages.length < 2) return

    let transitionTimeout: number
    const rotationInterval = window.setInterval(() => {
      setIsExiting(true)
      transitionTimeout = window.setTimeout(() => {
        setMessageIndex((index) => (index + 1) % messages.length)
        setIsExiting(false)
      }, TRANSITION_DURATION_MS)
    }, ROTATION_INTERVAL_MS)

    return () => {
      window.clearInterval(rotationInterval)
      window.clearTimeout(transitionTimeout)
    }
  }, [messages.length])

  return (
    <aside
      aria-label="News and information"
      className="mt-auto w-full bg-neutral-200 text-center text-neutral-900 dark:bg-black dark:text-neutral-100"
    >
      <div className="flex h-10 items-center justify-center overflow-hidden px-4 text-sm news-info-message">
        <p
          key={messageIndex}
          className={
            isExiting ? "news-info-message-exit" : "news-info-message-enter"
          }
          dangerouslySetInnerHTML={{ __html: messages[messageIndex] }}
        />
      </div>
    </aside>
  )
}
