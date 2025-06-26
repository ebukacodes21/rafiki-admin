import React from 'react'
import { motion } from "framer-motion";

const DashboardContent = () => {
  return (
       <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      Dashboard content
    </motion.div>
  )
}

export default DashboardContent
