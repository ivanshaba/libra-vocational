import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/coaches", label: "Coaches" },
  { href: "/facilities", label: "Facilities" },
  { href: "/registration", label: "Registration" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
]

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mr-4 flex"
      >
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Arena Sports</span>
        </Link>
      </motion.div>

      <ul className="flex items-center space-x-4 lg:space-x-6">
        {navItems.map((item, index) => (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}
