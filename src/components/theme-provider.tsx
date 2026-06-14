import { createContext, useContext, useEffect, useState } from 'react'
import { ScriptOnce } from '@tanstack/react-router'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getInitialTheme(storageKey: string, defaultTheme?: Theme): Theme {
  if (typeof window === 'undefined') return defaultTheme ?? 'light'
  const stored = localStorage.getItem(storageKey)
  if (stored === 'light' || stored === 'dark') return stored
  return defaultTheme ?? getSystemTheme()
}

function getThemeScript(storageKey: string) {
  const key = JSON.stringify(storageKey)

  return `(function(){try{
    var t=localStorage.getItem(${key});
    if(t!=='light'&&t!=='dark'){
      t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    }
    var e=document.documentElement;
    e.classList.add(t);
    e.style.colorScheme=t;
  }catch(e){}})();`
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: 'light',
  setTheme: () => {},
})

function applyTheme(theme: Theme) {
  const root = document.documentElement

  root.classList.remove('light', 'dark')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

export function ThemeProvider({
  children,
  defaultTheme,
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    getInitialTheme(storageKey, defaultTheme),
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = (next: Theme) => {
    localStorage.setItem(storageKey, next)
    setThemeState(next)
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      <ScriptOnce>{getThemeScript(storageKey)}</ScriptOnce>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeProviderContext)
}
