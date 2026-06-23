import {
  useEffect,
  useState
}
from "react"

import axios from "axios"

import {
  auth
}
from "../firebase/firebase"

function SavedRoadmaps() {

  const [roadmaps, setRoadmaps] =
    useState([])

  useEffect(() => {

    fetchRoadmaps()

  }, [])

  const fetchRoadmaps =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/ai/roadmaps/${auth.currentUser.email}`

          )

        setRoadmaps(
          response.data.roadmaps
        )

      } catch (error) {

        console.log(error)

      }
    }

  return (

    <div className="mt-14">

      <h2
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Saved Roadmaps
      </h2>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      ">

        {
          roadmaps.map((item) => (

            <div
              key={item._id}

              className="
                backdrop-blur-xl
                bg-white/5
                border border-white/10
                rounded-3xl
                p-6
              "
            >

              <h3
                className="
                  text-2xl
                  font-bold
                  text-white
                  mb-4
                "
              >
                {item.goal}
              </h3>

              <p
                className="
                  text-gray-300
                  whitespace-pre-wrap
                  line-clamp-6
                "
              >
                {item.roadmap.title}
              </p>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default SavedRoadmaps