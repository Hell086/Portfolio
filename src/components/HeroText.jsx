import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Artist", "Designer", "Animator"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text ">
      {/* Desktop View */}
      <div className="hidden md:flex flex-col c-space ">
        <motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi I'm Binay
        </motion.h1>

        <div className="flex flex-col items-start ">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            A Designer <br /> Dedicated to Crafting
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-secondary text-5xl"
            />
          </motion.div>

          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Design Solutions
          </motion.p>

          <motion.div
            className="mt-6 pb-4 "
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 2,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <motion.button
              className="relative z-30 px-6 py-2 border-2 border-blue-600 rounded-full text-blue-600 font-semibold hover:cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I'm Binay
        </motion.p>

        <div>
          <motion.p
            className="text-5xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            A Designer <br /> Dedicated to Crafting
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-center text-secondary text-5xl"
            />
          </motion.div>

          <motion.p
            className="text-4xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Design Solutions
          </motion.p>

          <motion.div
            className="mt-8 pb-4 "
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 2,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <motion.button
              className="relative z-30 px-6 py-2 bg-transparent border-2 border-blue-600 rounded-full text-blue-600 font-semibold hover:cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
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
