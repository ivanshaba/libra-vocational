import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	LayoutDashboard,
	FileText,
	Users,
	Image,
	Building2,
	Dumbbell,
	ClipboardList,
	LogOut,
	Menu,
	X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const navItems = [
	{ href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
	{ href: "/admin/posts", label: "Posts", icon: <FileText className="h-4 w-4" /> },
	{ href: "/admin/coaches", label: "Coaches", icon: <Users className="h-4 w-4" /> },
	{ href: "/admin/gallery", label: "Gallery", icon: <Image className="h-4 w-4" /> },
	{ href: "/admin/facilities", label: "Facilities", icon: <Building2 className="h-4 w-4" /> },
	{ href: "/admin/programs", label: "Programs", icon: <Dumbbell className="h-4 w-4" /> },
	{ href: "/admin/alumni", label: "Alumni", icon: <Users className="h-4 w-4" /> },
	{
		href: "/admin/registrations",
		label: "Registrations",
		icon: <ClipboardList className="h-4 w-4" />,
	},
];

export function Sidebar() {
	const location = useLocation();
	const { logout } = useAuth();
	const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);

	useEffect(() => {
		const handleResize = () => {
			setIsCollapsed(window.innerWidth < 1024);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				className="fixed top-4 left-4 z-50 lg:hidden"
				onClick={() => setIsCollapsed(!isCollapsed)}
			>
				{isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
			</Button>

			<aside
				className={cn(
					"fixed top-0 left-0 h-screen bg-card border-r transition-all duration-300 ease-in-out z-40",
					isCollapsed
						? "-translate-x-full lg:translate-x-0 lg:w-16"
						: "w-64 translate-x-0"
				)}
			>
				<div
					className={cn(
						"flex h-16 items-center border-b px-6",
						isCollapsed && "lg:justify-center lg:px-0"
					)}
				>
					<h1
						className={cn(
							"text-lg font-bold transition-opacity duration-200",
							isCollapsed && "lg:hidden"
						)}
					>
						Admin Panel
					</h1>
				</div>

				<nav className="flex-1 space-y-1 p-4">
					{navItems.map((item) => (
						<Link
							key={item.href}
							to={item.href}
							className={cn(
								"flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
								location.pathname === item.href && "bg-accent",
								isCollapsed && "lg:justify-center lg:px-2"
							)}
							title={isCollapsed ? item.label : undefined}
						>
							{item.icon}
							<span
								className={cn(
									"transition-opacity duration-200",
									isCollapsed && "lg:hidden"
								)}
							>
								{item.label}
							</span>
						</Link>
					))}
				</nav>

				<div className="border-t p-4">
					<Button
						variant="ghost"
						className={cn(
							"w-full gap-2",
							isCollapsed ? "lg:justify-center" : "justify-start"
						)}
						onClick={() => logout()}
						title={isCollapsed ? "Logout" : undefined}
					>
						<LogOut className="h-4 w-4" />
						<span
							className={cn(
								"transition-opacity duration-200",
								isCollapsed && "lg:hidden"
							)}
						>
							Logout
						</span>
					</Button>
				</div>
			</aside>

			{/* Overlay for mobile */}
			{!isCollapsed && (
				<div
					className="fixed inset-0 bg-black/50 lg:hidden z-30"
					onClick={() => setIsCollapsed(true)}
				/>
			)}
		</>
	);
}
