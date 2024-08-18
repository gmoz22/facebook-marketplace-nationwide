import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Icons } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="absolute top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <div>
            <h2 className="sm:text-m text-lg font-extrabold leading-tight tracking-tighter md:text-2xl xl:text-4xl">
              Browse <span className="text-secondary">Marketplaces</span>
            </h2>
            <h4 className="md:text-md text-xs font-extrabold leading-tight tracking-tighter sm:text-sm">
              Search the <span className="text-secondary">Facebook <sup className="mb-8 text-[0.5em]">TM</sup> Marketplace</span> nationwide!
            </h4>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Popover>
              <PopoverTrigger>
                <Icons.help className="block size-6 sm:hidden" />
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
              <PopoverContent className="text-sm font-semibold text-primary">
                Make sure you are logged into Facebook, that your ad/popup blockers are disabled and that your browser allows opening multiple tabs.
                <div><br/>May not work on tablets if the Facebook app is installed.</div>
              </PopoverContent>
            </Popover>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
