import { motion } from "framer-motion";
const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-400 mb-6"
      >
        Pothik
      </motion.h1>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-14 h-14 border-4 border-green-400 border-t-transparent rounded-full"
      />

      <motion.p
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="mt-6 text-sm text-gray-400"
      >
        Loading, please wait...
      </motion.p>
    </div>
  );
};

export default Loading;
