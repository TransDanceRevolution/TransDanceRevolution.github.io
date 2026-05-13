import * as React from "react"

export const IsAdminContext = React.createContext(false)

export function IsAdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    // if on server or in iframe, skip this
    if (window == undefined || window.self !== window.top) {
      return
    }
    const storageCb = () => {
      const tinacmsAuth = window.localStorage.getItem("tinacms-auth")
      const tinacmsLocalLoggedIn = window.localStorage.getItem(
        "tina.local.isLogedIn"
      )
      if (
        (tinacmsAuth != null &&
          tinacmsAuth.length > 0 &&
          tinacmsAuth !== "null") ||
        tinacmsLocalLoggedIn === "true"
      ) {
        setIsAdmin(true)
        return
      }
      setIsAdmin(false)
    }
    storageCb()
    window.addEventListener("storage", storageCb)
    return () => window.removeEventListener("storage", storageCb)
  }, [setIsAdmin])

  return (
    <IsAdminContext.Provider value={isAdmin}>
      {children}
    </IsAdminContext.Provider>
  )
}

export function useIsAdmin() {
  return React.useContext(IsAdminContext);
}
