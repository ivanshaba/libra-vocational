import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Users, NewspaperIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const data = {
	teams: [
		{
			name: "Arena sports academyug",
			logo: Users,
			plan: "",
		},
	],
	navMain: [
		{
			title: "System",
			url: "/admin/posts",
			icon: NewspaperIcon, // Replace with an appropriate icon
			items: [
				{
					title: "View All Postings",
					url: "/admin/posts",
				},
				{
					title: "Coaches",
					url: "/admin/coaches",
				},
				{
					title: "Programs",
					url: "/admin/programs",
				},
				{
					title: "Gallery",
					url: "/admin/gallery",
				},
				{
					title: "Facilities",
					url: "/admin/facilities",
				},
				{
					title: "Alumni",
					url: "/admin/alumni",
				},
			],
		},
		{
			title: "Registrations",
			url: "#",
			icon: Users, // Replace with an appropriate icon
			items: [
				{
					title: "View Users",
					url: "/admin/registrations",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useAuth();
	console.log(user);
	const userData = {
		name: user?.email ?? "",
		email: user?.email ?? "",
		avatar: user?.email ?? "",
	};
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={userData} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
