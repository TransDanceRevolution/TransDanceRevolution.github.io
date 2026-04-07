import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./components/ui/navigation-menu"
import React from "react"
import AcknowledgementOfCountryDialog from "./components/acknowledgement-of-country/acknowledgement-of-country-dialog"
import { useDialogStore } from "./stores/dialog"

const paths: Record<string, { path: string; match?: RegExp }> = {
  Home: {
    path: "/",
  },
  Blog: {
    path: "/posts",
    match: /\/posts($|\/.*)/,
  },
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  React.useEffect(() => {
    if (location.pathname.search(/\/admin($|\/)/) !== -1) {
      window.location.pathname = "/admin/index.html"
    }
  }, [location])
  const { shouldShow: shouldShow_, setShown } = useDialogStore()
  // to work around bug regarding dialog switching too fast
  // and also make sure popup doesn't block screen on non-js environments
  const shouldShow = React.useDeferredValue(shouldShow_, false)
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AcknowledgementOfCountryDialog
          open={shouldShow}
          onOpenChange={setShown}
        />
        <div id="navbar" className="sticky inset-y-0 top-0 z-50 bg-background">
          <div className="mx-auto flex h-16 w-full max-w-7xl justify-between p-3">
            <Link className="w-32" to="/">
              <img
                alt="TDR Logo"
                className="h-full min-h-0 w-auto min-w-0"
                src="/img/logo.png"
              />
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {Object.entries(paths).map(([n, { path, match }]) => (
                  <NavigationMenuItem key={n}>
                    <NavigationMenuLink
                      active={
                        match == null
                          ? path === location.pathname
                          : location.pathname.search(match) !== -1
                      }
                      render={<Link to={path}>{n}</Link>}
                    />
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {children}
        <div className="mx-auto flex max-w-7xl justify-between p-3">
          {/* <div className="prose text-xs">
            <p>Hosts: </p>
            <ul>
              <li><Link to="https://www.instagram.com/spooky_binch/">@spooky_binch</Link></li>
            </ul>
            <ul>
              <li><Link to="https://www.instagram.com/0x7amyy/">@0x7amyy</Link></li>
            </ul>
            <p>Graphic Design: </p>
            <ul>
              <li><Link to="https://www.instagram.com/roxy.fury/">@roxy.fury</Link></li>
            </ul>
          </div> */}
          <div className="text-xs">©2026 Trans Dance Revolution</div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
