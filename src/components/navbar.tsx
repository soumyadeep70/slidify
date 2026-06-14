import { authClient } from '#/lib/auth-client'
import { getRouteApi, Link, useRouter } from '@tanstack/react-router'
import { LogOut, Presentation, Menu, User, Sparkles } from 'lucide-react'
import { useTheme } from './theme-provider'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { Separator } from './ui/separator'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'
import { cn } from '#/lib/utils'
import { useCallback, useEffect, useState } from 'react'

export type NavigationSection = {
  title: string
  href: string
}

const navigationData: NavigationSection[] = [
  { title: 'Features', href: '#' },
  { title: 'How it works', href: '#' },
  { title: 'Templates', href: '#' },
  { title: 'Pricing', href: '#' },
]

export function Navbar() {
  const router = useRouter()
  const { user } = getRouteApi('/_protected').useRouteContext()
  const { theme, setTheme } = useTheme()
  const [sticky, setSticky] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 60)
  }, [])

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [handleScroll, handleResize])

  const handleSignOut = async () => {
    await authClient.signOut()
    router.navigate({ to: '/login' })
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        sticky ? 'py-2' : 'py-4',
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-6xl px-4 sm:px-6',
          'transition-all duration-300',
        )}
      >
        <nav
          className={cn(
            'flex items-center justify-between gap-4 px-4 py-2.5 rounded-2xl transition-all duration-300',
            sticky
              ? 'bg-background/80 backdrop-blur-xl border border-border shadow-lg shadow-black/5'
              : 'bg-background/60 backdrop-blur-md border border-border/50',
          )}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 no-underline group"
          >
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Presentation
                className="size-4 text-primary-foreground"
                strokeWidth={2}
              />
            </div>
            <span className="font-semibold text-base text-foreground tracking-tight">
              Slidify
            </span>
            <Badge
              variant="secondary"
              className="text-[10px] font-medium px-1.5 py-0 h-4 hidden sm:inline-flex items-center gap-0.5 bg-primary/10 text-primary border-0 rounded-md"
            >
              <Sparkles className="size-2.5" />
              AI
            </Badge>
          </Link>

          {/* ── Center nav (desktop) ── */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-0.5">
              {navigationData.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'h-8 px-3 text-sm font-medium text-muted-foreground',
                      'hover:text-foreground hover:bg-accent',
                      'focus:text-foreground focus:bg-accent',
                      'data-active:text-foreground data-active:bg-accent',
                      'rounded-lg transition-colors bg-transparent',
                    )}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* ── Right side ── */}
          <div className="flex items-center gap-1.5 shrink-0">
            <AnimatedThemeToggler theme={theme} onThemeChange={setTheme} />

            <Separator
              orientation="vertical"
              className="h-5 mx-1 hidden sm:block"
            />

            {/* Auth state */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative size-8 rounded-full p-0 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Avatar className="size-8 border border-border">
                    <AvatarImage
                      src={user.image ?? undefined}
                      alt={user.name || 'User'}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {user.name.trim().charAt(0).toUpperCase() || (
                        <User className="size-3.5" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                <DropdownMenuLabel className="font-normal py-2">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-8 border border-border shrink-0">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name || 'User'}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {user.name.trim().charAt(0).toUpperCase() || (
                          <User className="size-3.5" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium leading-none truncate">
                        {user.name.trim()}
                      </p>
                      <p className="text-xs text-muted-foreground leading-none mt-1 truncate">
                        {user.email.trim()}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer gap-2"
                >
                  <LogOut className="size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* ── Mobile hamburger ── */}
            <div className="lg:hidden ml-0.5">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg"
                    aria-label="Open menu"
                  >
                    <Menu className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-48"
                >
                  {navigationData.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      <a
                        href={item.href}
                        className="cursor-pointer text-sm font-medium w-full"
                      >
                        {item.title}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
