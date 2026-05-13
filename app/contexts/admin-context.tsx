import * as React from "react"

export const AdminContext = React.createContext({
  isAdmin: false,
  isInAdminPanel: false,
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
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

  const isInAdminPanel = React.useMemo(() => {
    if (typeof window === "undefined") {
      return false
    }
    try {
      return (
        window.self !== window.top &&
        window.location.hostname === window.top?.location.hostname &&
        window.top?.location.pathname.search(/\/admin($|\/.*)/) !== -1
      )
    } catch (e) {
      return false
    }
  }, [])

  return (
    <AdminContext.Provider value={{ isAdmin, isInAdminPanel }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return React.useContext(AdminContext)
}
