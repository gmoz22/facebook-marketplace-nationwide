import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Icons } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
            <h1 className="text-lg font-extrabold leading-tight tracking-tighter sm:text-m md:text-2xl xl:text-4xl">
              <span className="text-secondary">Facebook Marketplace</span> Nationwide Search
            </h1>
          </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Popover>
              <PopoverTrigger>
                <Icons.help className="sm:hidden block h-6 w-6" />
                <div className="hidden sm:block">
                  <div
                    className={
                      buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })
                  }
                  >
                    <span className="text-secondary">How To Use</span>
                  </div>
                </div>
                </PopoverTrigger>
              <PopoverContent className="text-sm font-bold text-primary">
                Make sure you are logged into Facebook, that your ad/popup blockers are disabled and that your browser allows opening multiple tabs.
              </PopoverContent>
            </Popover>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
