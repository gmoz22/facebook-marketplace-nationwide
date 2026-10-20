/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GA4_ANALYTICS_ID?: string
  }
}

interface Window {
  umami?: {
    track: (eventName: string, data: Record<string, string>) => void
  }
}
