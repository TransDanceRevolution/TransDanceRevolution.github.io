import React from "react"

const VENUES = {
  imax: {
    label: "IMAX Melbourne",
    mapsUrl: "https://maps.app.goo.gl/v8DNt1qcpDV5ri5fA",
  },
  townHall: {
    label: "Town Hall Station City Square",
    mapsUrl: "https://maps.app.goo.gl/3vvVXhevMuXRfMu29",
  },
} as const

const REFERENCE_DATE = new Date("2026-03-19")

function getJamDayOfWeek(localDate: Date, referenceDayOfWeek: number) {
  const date = new Date(localDate)
  date.setHours(0, 0, 0, 0)

  const daysUntilReferenceDay = referenceDayOfWeek - date.getDay()
  date.setDate(date.getDate() + daysUntilReferenceDay)

  return date
}

function getVenueDayOfWeek(localNow: Date) {
  const jamDayOfWeek = getJamDayOfWeek(localNow, REFERENCE_DATE.getDay())

  const weeksSinceReference = Math.floor(
    (jamDayOfWeek.getTime() - REFERENCE_DATE.getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  )

  return weeksSinceReference % 2 === 0 ? VENUES.imax : VENUES.townHall
}

export default function NaarmJamLocation() {
  const [now, setNow] = React.useState<undefined | Date>(undefined)

  React.useEffect(() => {
    setNow(new Date())
  }, [setNow])

  if (now == null) {
    return <></>
  }

  const venue = getVenueDayOfWeek(now)
  const jamDate = getJamDayOfWeek(now, REFERENCE_DATE.getDay())

  const prefix =
    jamDate.getDate() < now.getDate() ? "happened at " : "should be at "

  return (
    <>
      If your device's date is set correctly, this week's Jam {prefix}
      <a href={venue.mapsUrl}>{venue.label}</a> ({jamDate.toDateString()}).
    </>
  )
}
