import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import PartnersView from "components/Partners"

function Home() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<any>()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(user)

    if (user === null) {
      router.replace("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      {isLoggedIn !== null && <PartnersView />}
    </>
  )
}

export default Home
