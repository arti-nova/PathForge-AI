import {
  Navigate
}
from "react-router-dom"

import {
  auth
}
from "../firebase/firebase"

import {
  onAuthStateChanged
}
from "firebase/auth"

import {
  useEffect,
  useState
}
from "react"

function ProtectedRoute({
  children
}) {

  const [user, setUser] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        (currentUser) => {

          setUser(currentUser)

          setLoading(false)

        }

      )

    return () => unsubscribe()

  }, [])

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-black
          text-white
          text-2xl
        "
      >
        Loading...
      </div>

    )
  }

  if (!user) {

    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute