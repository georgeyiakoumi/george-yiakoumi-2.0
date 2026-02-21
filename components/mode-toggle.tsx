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
  const [animateMoon, setAnimateMoon] = React.useState(false)

  const toggleTheme = () => {
    setAnimate(true)
    setAnimateMoon(true)
    setTheme(theme === "light" ? "dark" : "light")
    setTimeout(() => {
      setAnimate(false)
      setAnimateMoon(false)
    }, 600)
  }

  return (
    <div className="fixed box-border flex items-center justify-center p-4 lg:p-0 right-4 top-4 lg:right-16 lg:top-16 z-11">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="icon" onClick={toggleTheme} className="bg-background hover:bg-background xl:hover:bg-secondary/80 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-reduce:transition-none xl:cursor-pointer motion-safe:xl:hover:scale-110">
            <AnimateIcon animate={animate} asChild>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            </AnimateIcon>
            <Moon className={`absolute h-[1.2rem] w-[1.2rem] scale-0 transition-transform dark:scale-100 ${animateMoon ? 'animate-spin-once' : ''}`} />
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