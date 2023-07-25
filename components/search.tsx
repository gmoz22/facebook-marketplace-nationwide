'use client'

import {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react'
import {Input} from "@/components/ui/input";
import {Button, ButtonProps} from "@/components/ui/button";
import {siteConfig} from "@/config/site";
import {cn} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card"
import Link from "next/link";
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.NEXT_PUBLIC_GA4_ANALYTICS_ID);

export default function Search() {
  const [searchTerm, setSearch] = useState("")
  const [country, setCountry] = useState("usa")

  interface CountriesDetails {
    name: string;
    icon: string;
    locale: string;
    cities: string[];
    cities_fb: string[];
    coverage: string;
  }
  interface Countries {
    [key: string]: CountriesDetails
  }

  const countriesData: Countries = siteConfig.countries

  const updateSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    []
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (searchTerm && e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      } else {
        setSearch(searchTerm);
      }
    },
    [searchTerm]
  );

  const doSearch = useCallback(() => {
    if (searchTerm.trim() === "") return;
    let citiesFb = countriesData[country].cities_fb;
    let locale: string = countriesData[country].locale;
    for (let city of citiesFb) {
      window.open(siteConfig.templateURL[locale as keyof typeof siteConfig.templateURL].replace('|CITY|', city).replace('|STRING|', searchTerm), "fbmp"+country+"search"+city);
    }

    ReactGA.event({
      category: "search",
      action: `search_${country}`,
      label: searchTerm
    });
  }, [searchTerm, country]);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row fontSans">
          <Input className="text-3xl py-6 text-primary caret-secondary" type="text" value={searchTerm} onChange={updateSearchTerm} onKeyDown={handleKeyPress} autoFocus /> <Button className="ml-8 px-8 my-1 uppercase" onClick={doSearch}>Search</Button>
        </div>
        <div className="mt-10 flex">
          { Object.keys(countriesData).map( (key) => (
            <div className="md:mx-4 sm:mx-2 mx-1" key={key}>
              <HoverCard>
                <HoverCardTrigger>
                  <Button
                    className={cn("py-8", (key === country) ? 'bg-secondary' : '')}
                    variant="outline"
                    onClick={() => setCountry(key)}>
                    <img className="w-16" src={`flags/${countriesData[key].icon}`} alt={countriesData[key].name}/>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  Searches {countriesData[key].name} nationwide by opening <span className="text-primary bold whitespace-nowrap">{countriesData[key].cities.length} tabs</span>. <Link className="underline text-xs" href={countriesData[key].coverage} target="_blank" rel="noreferrer">See coverage</Link>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
