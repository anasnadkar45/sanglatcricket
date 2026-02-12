"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, SunDim } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "motion/react"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="text-muted-foreground relative overflow-hidden"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0.3, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Moon size={28} weight="duotone" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0.3, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <SunDim size={28} weight="duotone" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* glow flash on click */}
      <motion.span
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2.2, opacity: 0.15 }}
        transition={{ duration: 0.4 }}
        style={{ background: "currentColor" }}
      />
    </Button>
  )
}