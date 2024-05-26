"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants, Button } from "@/components/ui/button"
import Search from "@/components/search"
import { Icons } from "@/components/icons";
import useDeviceDetection from '../lib/device';

export default function IndexPage() {
  const device = useDeviceDetection()
  return (
    <section className="flex flex-col h-screen text-lg text-muted-foreground">
      { device === "Mobile" && (
        <div className="absolute top-20 left-0 w-full text-center text-xs italic">
          This tool might not work correctly on <span className="font-bold">mobile</span> or <span className="font-bold">tablets</span>!
        </div>
      )}
      <div className="flex container items-center h-full sm:w-[700px]">
        <Search />
      </div>
      <div className="flex pb-4 px-8">
        <div className="w-1/2">
          <Link
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
              <Icons.donate className="h-5 w-5"/> <span className="pl-2">Support</span>
              <span className="sr-only">Donate</span>
            </div>
          </Link>
        </div>
        <div className="w-1/2 text-right">
          <Link
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
              <Icons.gitHub className="h-5 w-5"/> <span className="pl-2">by @gmoz22</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
