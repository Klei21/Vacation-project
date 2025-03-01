import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
      <motion.h1
        className="text-6xl font-bold"
        animate={{ x: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 0.3 }}
      >
        404 😥
      </motion.h1>
      <p className="text-lg mt-2">Oops... Looks like this page doen'st exist.</p>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-5 px-6 py-2 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-400 transition"
        onClick={() => navigate("/")}
      >
        Back to menu
      </motion.button>
    </div>
  );
}
