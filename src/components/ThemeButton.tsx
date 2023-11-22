'use client'
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function ThemeButton () {
    const {resolvedTheme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false)
  
    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
      setMounted(true)
    }, [])
  
    if (!mounted) {
      return null
    }

    return(
        <button onClick={() => setTheme(resolvedTheme === 'dark'? 'light':'dark')}>
        {resolvedTheme === 'dark'? 'light':'dark'} 
        </button>
    )
};