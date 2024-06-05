import { Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { ThemeToggle } from '@/components/theme/theme-toogle'

import { AccountMenu } from '../account-menu'
import { NavLink } from '../nav-link'
import { Separator } from '../separator'

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="size-6" />

        <Separator orientation="vertical" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="size-4" />
            Inicio
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossed className="size-4" />
            Pedidos
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  )
}
