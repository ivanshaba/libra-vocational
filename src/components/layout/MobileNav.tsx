import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Lock,  } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
	{
		href: "/",
		label: "Home",
		isLogo: true,
	},
	{ href: "/about", label: "About" },
	{ href: "/programs", label: "Programs" },
	{ href: "/coaches", label: "Trainers" },
	{ href: "/facilities", label: "Facilities" },
	{ href: "/registration", label: "Registration" },
	{ href: "/news", label: "News" },
	{ href: "/gallery", label: "Gallery" },
	{ href: "/videos", label: "Videos" },
	{ href: "/alumni", label: "Alumni" },
	{ href: "/contact", label: "Contact" },
	{ href: "/faq", label: "FAQ" },
];

export function MobileNav() {
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="flex w-72 flex-col p-0">
				<SheetHeader className="border-b p-4">
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<nav className="flex-1 overflow-y-auto">
					<div className="flex flex-col space-y-2 p-4">
						{navItems.map((item, index) => (
							<motion.div
								key={item.href}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ delay: index * 0.1 }}
							>
								<Link
									to={item.href}
									className={cn(
										"block px-2 py-1 text-lg font-medium transition-colors hover:text-primary",
										item.isLogo && "flex items-center gap-2"
									)}
									onClick={() => setOpen(false)}
								>
									{item.isLogo ? (
										<>
											<img
												src="/images/logo2.svg"
												alt="Libra Vocational"
												className="h-8 w-auto"
											/>
											{item.label}
										</>
									) : (
										item.label
									)}
								</Link>
							</motion.div>
						))}
						{/* <Link
							to="/donations"
							className="flex items-center gap-2 text-sm font-medium"
							onClick={() => setOpen(false)}
						>
							<Heart className="h-4 w-4" />
							Donate
						</Link> */}
						<Link
							to="/admin/login"
							className="flex items-center gap-2 text-sm font-medium"
							onClick={() => setOpen(false)}
						>
							<Lock className="h-4 w-4" />
							Admin Login
						</Link>
					</div>
				</nav>
				<div className="border-t p-4">
					<Button asChild className="w-full" size="sm">
						<Link to="/register">Register Now</Link>
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
