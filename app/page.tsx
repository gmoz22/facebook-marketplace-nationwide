"use client"

import { Suspense, useEffect } from "react"

import Search from "@/components/search"

export default function IndexPage() {
  useEffect(() => {
    const scriptIubenda = document.createElement("script")
    scriptIubenda.src = "//cdn.iubenda.com/iubenda.js"
    scriptIubenda.async = true
    document.body.appendChild(scriptIubenda)
    return () => {
      document.body.removeChild(scriptIubenda)
    }
  }, [])

  return (
    <section className="mt-16 flex flex-col text-lg text-muted-foreground">
      <div className="container mt-10 flex h-full items-center sm:w-[700px]">
        <Suspense fallback={<p role="status">Loading search...</p>}>
          <Search />
        </Suspense>
      </div>
    </section>
  )
}
