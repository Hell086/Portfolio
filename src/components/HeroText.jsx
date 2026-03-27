import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Artist", "Designer", "Animator"];
  const variants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="z-10 text-center rounded-3xl bg-clip-text c-space">
      {/* Desktop View */}
      <div className="hidden md:flex flex-col items-center">
        <motion.h1
          className="text-5xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
        >
          Hi I'm Binay
        </motion.h1>

        <div className="flex flex-col items-center">
          <motion.p
            className="text-6xl font-medium text-neutral-300 text-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          >
            A Designer <br /> Dedicated to Crafting
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
          >
            <FlipWords
              words={words}
              className="font-black text-secondary text-6xl"
            />
          </motion.div>

          <motion.p
            className="text-5xl font-medium text-neutral-300 text-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
          >
            Design Solutions
          </motion.p>

          <motion.div
            className="mt-8 pb-4 flex justify-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
          >
            <motion.button
              className="relative z-30 px-8 py-3 border-2 border-blue-600 rounded-full text-blue-600 text-lg font-semibold hover:cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center">
        <motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
        >
          Hi, I'm Binay
        </motion.p>

        <div className="flex flex-col items-center w-full">
          <motion.p
            className="text-4xl font-black text-neutral-300 text-center mt-4"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          >
            A Designer <br /> Dedicated to Crafting
          </motion.p>

          {/* Fixed height container prevents layout shift from FlipWords */}
          <div className="h-14 flex items-center justify-center w-full overflow-hidden">
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
            >
              <FlipWords
                words={words}
                className="font-bold text-center text-secondary text-4xl"
              />
            </motion.div>
          </div>

          <motion.p
            className="text-4xl font-black text-neutral-300 text-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
          >
            Design Solutions
          </motion.p>

          <motion.div
            className="mt-8 pb-4 flex justify-center"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
          >
            <motion.button
              className="relative z-30 px-6 py-2 bg-transparent border-2 border-blue-600 rounded-full text-blue-600 font-semibold hover:cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroText;