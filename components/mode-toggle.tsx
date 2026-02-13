"use client"

import * as React from "react"
import { Sun } from "@/components/animate-ui/icons/sun"
import { Moon } from "@/components/animate-ui/icons/moon"
import { AnimateIcon } from "@/components/animate-ui/icons/icon"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [animate, setAnimate] = React.useState(false)

  const toggleTheme = () => {
    setAnimate(true)
    setTheme(theme === "light" ? "dark" : "light")
    setTimeout(() => setAnimate(false), 600)
  }

  return (
    <div className="fixed box-border flex items-center justify-center p-4 lg:p-0 right-4 top-4 lg:right-16 lg:top-16 z-10">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="icon" onClick={toggleTheme} className="bg-background xl:cursor-pointer">
            <AnimateIcon animate={animate} asChild>
              <>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </>
            </AnimateIcon>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="hidden xl:block">
          {theme === "dark" ? (
            <><strong>Too dark?</strong> Turn on the lights!</>
          ) : (
            <><strong>Too bright?</strong> Turn the lights off!</>
          )}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}