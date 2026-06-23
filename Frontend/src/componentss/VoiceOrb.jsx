import {
  motion
} from "framer-motion"

function VoiceOrb({

  listening,

  loading,

}) {

  return (

    <div
      className="
        flex
        items-center
        justify-center
        py-10
      "
    >

      <motion.div

        animate={{

          scale:

            listening || loading

              ? [1, 1.1, 1]

              : 1,

          opacity:

            listening || loading

              ? [0.8, 1, 0.8]

              : 1,
        }}

        transition={{

          duration: 1.5,

          repeat:
            Infinity,
        }}

        className="
          relative
          w-44
          h-44
          rounded-full
          flex
          items-center
          justify-center
        "
      >

        {/* OUTER GLOW */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-cyan-500/20
            blur-3xl
          "
        />

        {/* MIDDLE RING */}
        <motion.div

          animate={{

            rotate: 360,

          }}

          transition={{

            duration: 12,

            repeat:
              Infinity,

            ease: "linear",
          }}

          className="
            absolute
            w-40
            h-40
            rounded-full
            border
            border-cyan-400/30
          "
        />

        {/* INNER RING */}
        <motion.div

          animate={{

            rotate: -360,

          }}

          transition={{

            duration: 8,

            repeat:
              Infinity,

            ease: "linear",
          }}

          className="
            absolute
            w-28
            h-28
            rounded-full
            border
            border-purple-400/40
          "
        />

        {/* CORE */}
        <motion.div

          animate={{

            scale:

              listening || loading

                ? [1, 1.2, 1]

                : 1,
          }}

          transition={{

            duration: 1,

            repeat:
              Infinity,
          }}

          className="
            w-20
            h-20
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            via-blue-500
            to-purple-500
            shadow-[0_0_60px_rgba(0,255,255,0.8)]
          "
        />
      </motion.div>

    </div>
  )
}

export default VoiceOrb