'use client'

import {ChangeEvent, JSX, KeyboardEvent, useCallback, useEffect, useState} from 'react'
import * as Defs from '@/lib/defs'
import Link from "next/link"
import {siteConfig} from "@/config/site"
import {cn, sliceIntoChunks} from "@/lib/utils"
import {Input} from "@/components/ui/input"
import {Button, buttonVariants} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card"
import {Checkbox} from "@/components/ui/checkbox"
import {getCookie, setCookie} from "@/components/cookies"
import ReactGA from "react-ga4"
import {useSearchParams} from 'next/navigation'
import {TimedQueue} from '@/lib/timed-queue'

import "@/styles/components/select.css"
import Image from "next/image";
import device from "@/lib/device";
import useDeviceDetection from "@/lib/device";

ReactGA.initialize(process.env.NEXT_PUBLIC_GA4_ANALYTICS_ID)

export default function Search() {
  const [searchTerm, setSearch] = useState("")
  const [lastSearchTerm, setLastSearchTerm] = useState("")
  const searchThrottle = parseInt(useSearchParams().get('throttle') || '0' as string)
  const [country, setCountry] = useState("usa")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sortBy, setSortBy] = useState(siteConfig.filters.defaultSortBy)
  const [availability, setAvailability] = useState(siteConfig.filters.defaultAvailability)
  const [deliveryMethod, setDeliveryMethod] = useState(siteConfig.filters.defaultDeliveryMethod)
  const [daysSinceListed, setDaysSinceListed] = useState(siteConfig.filters.defaultDaysSinceListed)
  const [resultLinks, setResultLinks] = useState<any[]>([])
  const itemConditionInitialState: Record<string, boolean> = {}
  Object.keys(siteConfig.filters.itemCondition).map((key) => {
    itemConditionInitialState[key] = false
  })
  const [itemCondition, setItemCondition] = useState(itemConditionInitialState)

  const device = useDeviceDetection()

  useEffect(() => {
    let cookieCountry = getCookie('country')
    if (cookieCountry) {
      setCountry(cookieCountry)
    }
  }, [country])

  const countriesData: Defs.Countries = siteConfig.countries
  const splitCountriesData = sliceIntoChunks(Object.keys(countriesData), device === "Mobile" ? siteConfig.countriesPerRowMobile : siteConfig.countriesPerRow)
  const filterSortBy: Defs.FilterSortBy = siteConfig.filters.sortBy
  const filterItemCondition: Defs.FilterItemCondition = siteConfig.filters.itemCondition
  const filterAvailability: Defs.FilterAvailability = siteConfig.filters.availability
  const filterDeliveryMethod: Defs.FilterDeliveryMethod = siteConfig.filters.deliveryMethod
  const filterDaysSinceListed: Defs.FilterDaysSinceListed = siteConfig.filters.daysSinceListed

  const updateSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    []
  )

  const updateMinPrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMinPrice(e.target.value)
    },
    []
  )
  const updateMaxPrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMaxPrice(e.target.value)
    }, []
  )
  const updateConditions = (itemIndex: string, isChecked: boolean) => {
    const updatedListOfItems: Record<string, boolean> = itemCondition
    updatedListOfItems[itemIndex] = isChecked
    setItemCondition(updatedListOfItems)
  }

  function setCountryAndCookie(newCountry: string) {
    if (newCountry!=getCookie('country')) {
      setCookie('country', newCountry)
    }
    if (newCountry!=country) {
      setCountry(newCountry)
    }
  }

  const doSearch = useCallback(() => {
    if (searchTerm.trim() === "") return
    let citiesFb = countriesData[country].cities_fb
    let locale: string = countriesData[country].locale
    let jobQueue: TimedQueue = new TimedQueue()
    let linksHTML: any[] = []

    citiesFb.forEach((city, cityIdx) => {
      let searchURL = siteConfig.templateURL[locale as keyof typeof siteConfig.templateURL]
        .replace('|CITY|', city)
        .replace('|STRING|', searchTerm)

      if (!!minPrice) searchURL += '&minPrice=' + minPrice
      if (!!maxPrice) searchURL += '&maxPrice=' + maxPrice

      if (sortBy!==siteConfig.filters.defaultSortBy)
        searchURL += '&sortBy=' + sortBy

      let itemConditionStatus: any[] = []
      Object.keys(itemCondition).map((itemKey) => {
        if (itemCondition[itemKey]) itemConditionStatus.push(itemKey)
      })
      if (itemConditionStatus.length) searchURL += '&itemCondition=' + itemConditionStatus.join(',')

      if (availability!==siteConfig.filters.defaultAvailability)
        searchURL += '&availability=' + availability

      searchURL += '&deliveryMethod=' + deliveryMethod

      if (daysSinceListed!==siteConfig.filters.defaultDaysSinceListed)
        searchURL += '&daysSinceListed=' + daysSinceListed


      if (device !== "Mobile") {
        if (searchThrottle) {
          let jobMinDelay = searchThrottle - (searchThrottle * 0.1)
          let jobMaxDelay = searchThrottle + (searchThrottle * 0.1)
          jobQueue.addTask({
            callback: () => {
              window.open(searchURL, "fbmp" + country + "search" + city)
            },
            time: Math.ceil(Math.random() * (jobMaxDelay - jobMinDelay) + jobMinDelay)
          })
        } else {
          window.open(searchURL, "fbmp" + country + "search" + city)
        }
      }

      linksHTML.push(
        <Link
          className=" my-0 cursor-pointer px-2"
          href={searchURL}
          target={`fbmp${country}search${city}`}
        >
          <div
            className={cn("mb-2", buttonVariants({
              size: "sm",
              variant: "outline",
            }))}
          >
            {countriesData[country].cities[cityIdx]}
          </div>
        </Link>
      )

    })

    setLastSearchTerm(searchTerm)
    setResultLinks(linksHTML)

    if (searchThrottle) jobQueue.start()

    ReactGA.event({
      category: "search",
      action: `search_${country}`,
      label: searchTerm
    })
    // @ts-ignore umami is defined in the global scope via the umami script
    window.umami.track(`search_${country}`, { searchTerm: searchTerm })
    
  }, [device, searchTerm, country, countriesData, sortBy, itemCondition, availability, daysSinceListed, minPrice, maxPrice, deliveryMethod, searchThrottle])

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (searchTerm && e.key === 'Enter') {
        e.preventDefault()
        doSearch()
      } else {
        setSearch(searchTerm)
      }
    },
    [searchTerm, doSearch]
  )

  function countryDataRow(row: Array<string>) {
    return (
      row.map((key: string) => (
          <div className={cn("w-1/"+siteConfig.countriesPerRow, "mx-auto flex-none text-center")} key={key}>
            <HoverCard>
              <HoverCardTrigger>
                <Button
                  className={cn("w-16 cursor-pointer p-2", (key === country) ? 'bg-secondary' : '')}
                  variant="outline"
                  onClick={() => setCountryAndCookie(key)}>
                  <Image width={64} height={64} src={`./flags/${countriesData[key].icon}`} alt={countriesData[key].name} />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                Searches <span
                className="whitespace-nowrap font-bold text-primary">{countriesData[key].name}</span> nationwide by opening <b className="whitespace-nowrap">{countriesData[key].cities.length} tabs</b>. <Link
                className="text-xs underline" href={countriesData[key].coverage} title={countriesData[key].cities.join('\n')} target="_blank" rel="noreferrer">See
                coverage</Link>
              </HoverCardContent>
            </HoverCard>
          </div>
        )
      )
    )
  }

  function listRow(row: Array<string>) {
    return (
      <div className="mt-10 flex" key={row.join('_')}>
        { countryDataRow(row) }
      </div>
    )
  }

  const listCountries = () => {
    let content: JSX.Element[] = []
    Object.values(splitCountriesData).map((row) => (
      content.push( listRow(row) )
    ))
    return (content)
  }


  return (
    <>
      <div className="flex w-full flex-col">
        { device === "Mobile" && !!resultLinks.length && (
          <div className="mb-8 inline-block text-lg">
            <div className="mb-0 font-bold text-primary">Results for &quot;{lastSearchTerm}&quot;</div>
            <div className="mb-2 text-sm"> 500 {countriesData[country].locale} radius of:</div>
            { resultLinks }
          </div>
        )}
        <div className="fontSans flex flex-row">
          <Input id="search" className="search py-6 text-3xl text-primary caret-secondary" type="text" value={searchTerm} onChange={updateSearchTerm} onKeyDown={handleKeyPress} placeholder="Search for..." autoFocus />
          <Button className="my-0 ml-8 cursor-pointer px-8 uppercase" onClick={doSearch}>Search</Button>
        </div>
        <div className="fontSans mt-4 flex flex-row flex-wrap">
          <label className="mb-1 w-full text-xs sm:mb-4 sm:w-1/4">
            <div className="m-1 rounded bg-primary/5 p-2">
                Sort By &nbsp;
              <Select name="sort_by" onValueChange={setSortBy} defaultValue={siteConfig.filters.defaultSortBy}>
                <SelectTrigger className="mt-1 cursor-pointer bg-transparent p-0 text-primary">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  { Object.keys(filterSortBy).map((sortKey) => (
                    <SelectItem className="cursor-pointer" key={sortKey} value={sortKey}>{filterSortBy[sortKey]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </label>
          <label className="mb-1 w-full text-xs sm:mb-4 sm:w-1/4">
            <div className="m-1 rounded bg-primary/5 p-2">
              Days Since Listed &nbsp;
              <Select name="daysSinceListed" onValueChange={setDaysSinceListed} defaultValue={siteConfig.filters.defaultDaysSinceListed}>
                <SelectTrigger className="mt-1 cursor-pointer bg-transparent p-0 text-primary focus-visible:outline-none">
                  <SelectValue placeholder="Days Since Listed" />
                </SelectTrigger>
                <SelectContent>
                  { Object.keys(filterDaysSinceListed).map((daysKey) => (
                    <SelectItem className="cursor-pointer" key={daysKey} value={daysKey}>{filterDaysSinceListed[daysKey]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </label>
          <label className="mb-1 w-full text-xs sm:mb-4 sm:w-1/4">
            <div className="m-1 rounded bg-primary/5 p-2">
              Availability &nbsp;
              <Select name="availability" onValueChange={setAvailability} defaultValue={siteConfig.filters.defaultAvailability}>
                <SelectTrigger className="mt-1 cursor-pointer bg-transparent p-0 text-primary focus-visible:outline-none">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  { Object.keys(filterAvailability).map((availKey) => (
                    <SelectItem className="cursor-pointer" key={availKey} value={availKey}>{filterAvailability[availKey]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>
          </label>
          <label className="mb-1 w-full text-xs sm:mb-4 sm:w-1/4">
            <div className="m-1 rounded bg-primary/5 p-2">
              Delivery &nbsp;
              <Select name="delivery" onValueChange={setDeliveryMethod} defaultValue={siteConfig.filters.defaultDeliveryMethod}>
                <SelectTrigger className="mt-1 cursor-pointer bg-transparent p-0 text-primary focus-visible:outline-none">
                  <SelectValue placeholder="Delivery" />
                </SelectTrigger>
                <SelectContent>
                  { Object.keys(filterDeliveryMethod).map((deliveryKey) => (
                    <SelectItem className="cursor-pointer" key={deliveryKey} value={deliveryKey}>{filterDeliveryMethod[deliveryKey]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </label>
          <span className="h-0 w-full"></span>
          <div className="m-1 mb-2 w-full rounded bg-primary/5 p-2 text-xs sm:mb-4">
            <div className="mb-3">Condition</div>
            <div className="h-0 w-full"></div>
            <div className="flex w-full flex-row">
            { Object.keys(filterItemCondition).map((conditionKey: any) => (
              <div key={conditionKey} className="w-1/4">
                <label
                  className="mr-4 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <Checkbox name="condition" id={`condition_${conditionKey}`} className="mr-2 cursor-pointer border-solid" onCheckedChange={(checked) => updateConditions(conditionKey, checked as boolean)} />
                  <span className="">{filterItemCondition[conditionKey]}</span>
                </label>
              </div>
            ))}
            </div>
          </div>
          <span className="h-0 w-full"></span>
          <div className="m-1 mb-4 flex w-full flex-row rounded bg-primary/5 p-2 text-xs">
            <label className="w-1/2"><span className="mr-2 w-1/3 text-xs">Min. Price</span><Input className="prices mt-2 h-8 w-2/3 flex-none bg-transparent p-1 text-sm text-primary caret-secondary" id="minPrice" type="number" min="0" value={minPrice} onChange={updateMinPrice} /></label>
            <label className="ml-6 w-1/2"><span className="mr-2 w-1/3 text-xs">Max. Price</span><Input className="prices mt-2 h-8 w-2/3 flex-none bg-transparent p-1 text-sm text-primary caret-secondary" id="maxPrice" type="number" min="0" value={maxPrice} onChange={updateMaxPrice} /></label>
          </div>
        </div>
        <div>
          { listCountries() }
        </div>
      </div>
    </>
  )
}
