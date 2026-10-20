import { siteConfig } from "@/config/site"
import * as React from "react"
import { buttonVariants } from "./ui/button"
import { Icons } from "./icons"


export function Footer() {

  return (
      <footer className="container mt-10 flex items-center sm:w-[700px] px-8 pb-4">
        <div className="flex justify-between w-full">
          <div className="w-1/3 text-left">
          <a
            href={siteConfig.links.donate}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              <Icons.donate className="size-5"/> <span className="pl-2">Donate</span>
              <span className="sr-only">Donate</span>
            </div>
          </a>
          </div>
          <div className="w-1/3 text-center text-[9px] italic">
            All trademarks used are the property of their respective owners. Their use does not imply any affiliation nor endorsement.
            <br/>
            <br/>
            <a href="https://www.iubenda.com/privacy-policy/98350546/cookie-policy"
              className="iubenda-black iubenda-noiframe iubenda-embed" title="Cookie Policy ">Cookie Policy</a>
            {" "}
            <a href="https://www.iubenda.com/privacy-policy/98350546"
              className="iubenda-black iubenda-noiframe iubenda-embed" title="Privacy Policy ">Privacy Policy</a>
          </div>
          <div className="w-1/3 text-right">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              <Icons.gitHub className="size-5"/> <span className="pl-2">by @gmoz22</span>
            </div>
          </a>
          </div>

        </div>
      </footer>
  )
}
