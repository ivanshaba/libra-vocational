import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  FileText,
  Users,
  Image,
  Building2,
  Dumbbell,
  ClipboardList,
  Mail,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/admin/posts', label: 'Posts', icon: <FileText className="h-4 w-4" /> },
  { href: '/admin/coaches', label: 'Coaches', icon: <Users className="h-4 w-4" /> },
  { href: '/admin/gallery', label: 'Gallery', icon: <Image className="h-4 w-4" /> },
  { href: '/admin/facilities', label: 'Facilities', icon: <Building2 className="h-4 w-4" /> },
  { href: '/admin/programs', label: 'Programs', icon: <Dumbbell className="h-4 w-4" /> },
  { href: '/admin/registrations', label: 'Registrations', icon: <ClipboardList className="h-4 w-4" /> },
  { href: '/admin/contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> },
]

export function Sidebar() {
  const location = useLocation()
  const { logout } = useAuth()

  return (
    <aside className="flex w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent',
              location.pathname === item.href && 'bg-accent'
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
