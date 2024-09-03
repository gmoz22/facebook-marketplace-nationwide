import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Icons } from "@/components/icons";
import {cn} from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="absolute top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <div>
            <h1 className="sm:text-m text-lg font-extrabold leading-tight tracking-tighter md:text-2xl xl:text-4xl">
              Browse <span className="text-secondary">Marketplaces</span>
            </h1>
            <h4 className="md:text-md text-xs font-extrabold leading-tight tracking-tighter sm:text-sm">
              Search the <span className="text-secondary uppercase">Facebook <sup className="mb-8 text-[0.5em]">TM</sup> Marketplace</span> nationwide!
            </h4>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Popover>
              <PopoverTrigger className="">
                <Icons.help className="block size-6 sm:hidden" />
                <div className="hidden cursor-pointer sm:block ">
                  <div
                    className={
                      cn(
                        buttonVariants({
                        size: "sm",
                        variant: "outline",
                      }),
                      "dark:bg-secondary light:text-secondary")
                    }
                  >
                    <span className="light:text-secondary">How To Use</span>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="space-y-4 text-sm text-primary">
                <p className="italic">May not work on tablets if the Facebook app is installed.</p>
                <p className="text-lg">Make sure you are logged into Facebook, that your ad/popup blockers are disabled and that <span className="font-semibold">your browser allows opening multiple tabs</span>:</p>
                <p><span className="font-semibold">Google Chrome</span><br/>
                Go to Settings {">"} Privacy and security {">"} Content {">"} Pop-ups and redirects and manually add the site &quot;https://www.browsemarketplaces.com&quot; to the list of sites &quot;allowed to send pop-ups and use redirects&quot;.</p>
                <p><span className="font-semibold">Firefox</span><br/>
                When you search in the tool it should tell you under the URL bar that you are about to open X pop-up windows and you can go to the preferences button to allow pop-ups for this website.</p>
                <p><span className="font-semibold">Safari</span><br/>
                On the tab where you searched you will see at the end of the URL bar an icon with 2 windows superimposed. When you click on it, the missing tabs will open up and in the future they won&apos;t be blocked.</p>
              </PopoverContent>
            </Popover>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
