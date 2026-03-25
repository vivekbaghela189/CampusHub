"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function FadeIn({
  children,
  delay = 0,
  className,
  distance = 40,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  distance?: number
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: distance, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    >
      {children}
    </motion.div>
  )
}
