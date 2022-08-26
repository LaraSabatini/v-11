import React, { useEffect, useState } from "react"
import Login from "components/Login"
import Partners from "components/Partners"

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<any>()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(user)
  }, [isLoggedIn])

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      {isLoggedIn === null ? <Login /> : <Partners />}
    </>
  )
}

export default Home
