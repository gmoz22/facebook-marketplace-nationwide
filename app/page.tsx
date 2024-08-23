"use client"

import {useEffect} from "react";

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Search from "@/components/search"
import { Icons } from "@/components/icons";
import useDeviceDetection from '../lib/device';
import * as React from "react";

export default function IndexPage() {
  const device = useDeviceDetection()

  useEffect(() => {
    const scriptIubenda = document.createElement('script');
    scriptIubenda.src =             "//cdn.iubenda.com/iubenda.js";
    scriptIubenda.async = true;
    document.body.appendChild(scriptIubenda);
    return () => {
      document.body.removeChild(scriptIubenda);
    }
  }, []);

  return (
    <section className="mt-16 flex flex-col text-lg text-muted-foreground">
      {/*{ device === "Mobile" && (
        <div className="h-8 leading-8 w-full text-center text-xs italic">
          This tool might not work correctly on <span className="font-bold">mobile</span> or <span className="font-bold">tablets</span>!
        </div>
      )}*/}
      <div className="container mt-10 flex h-full items-center sm:w-[700px]">
        <Search/>
      </div>
      <div className="mt-10 flex px-8 pb-4">
        <div className="w-1/3">
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
              <Icons.donate className="size-5"/> <span className="pl-2">Support</span>
              <span className="sr-only">Donate</span>
            </div>
          </Link>
        </div>
        <div className="w-1/3 text-center text-xs italic">
          All trademarks used are the property of their respective owners. <br className="hidden xl:inline-block"/>Their
          use does not imply any affiliation nor endorsement.
          <br/>
          <br/>
          <a href="https://www.iubenda.com/privacy-policy/98350546/cookie-policy"
             className="iubenda-black iubenda-noiframe iubenda-embed" title="Cookie Policy ">Cookie Policy</a>
          {" "}
          <a href="https://www.iubenda.com/privacy-policy/98350546"
             className="iubenda-black iubenda-noiframe iubenda-embed" title="Privacy Policy ">Privacy Policy</a>
        </div>
        <div className="w-1/3 text-right">
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
              <Icons.gitHub className="size-5"/> <span className="pl-2">by @gmoz22</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
