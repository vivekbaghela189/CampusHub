"use client"

import { motion } from "framer-motion"
import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

export default function FadeIn({
  children,
  delay = 0,
  className,
  distance = 40,
  amount = 0.2,
  style,
  once = false,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  distance?: number
  amount?: number
  style?: CSSProperties
  once?: boolean
}) {
  return (
    <motion.div
      className={cn(className)}
      style={style}
      initial={{ opacity: 0, y: distance, filter: "blur(10px)" }}
      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut",
      }}
      viewport={{ once, amount }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    >
      {children}
    </motion.div>
  )
}
