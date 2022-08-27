import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Login from "components/Login"

function Home() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState<any>()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(user)

    if (user !== null) {
      router.push("home")
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
      {isLoggedIn === null && <Login />}
    </>
  )
}

export default Home
