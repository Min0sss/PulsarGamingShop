// src/components/Toast.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-6 right-6 z-[9999] px-5 py-3 rounded-xl 
          bg-slate-800 text-white border border-cyan-500 shadow-lg 
          flex items-center gap-3"
        >
          <span className="text-cyan-400 text-lg">✓</span>
          <p className="text-sm">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
