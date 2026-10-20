"use client"

import { useEffect } from "react"
import ReactGA from "react-ga4"

export function Analytics() {
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA4_ANALYTICS_ID
    if (measurementId && !ReactGA.isInitialized) {
      ReactGA.initialize(measurementId)
    }
  }, [])

  return null
}
