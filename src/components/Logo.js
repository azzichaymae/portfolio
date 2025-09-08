import { motion } from "framer-motion";

export default function Logo() {
  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      {/* Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-full h-full rounded-full border-4 border-t-orange-400 border-b-blue-400 border-l-transparent border-r-transparent"
      ></motion.div>

      {/* Floating Text */}
      <motion.h1
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400"
      >
        {/* {`{ C A }`} */}
        <img src="images/person.png" alt="Logo" className="w-20 h-20"/>
      </motion.h1>
    </div>
  );
}
