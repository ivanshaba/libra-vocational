import { Navigate, Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminLayout() {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Skeleton className="h-10 w-full" />
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/admin/login" replace />;
	}
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<main className="container-fluid mx-4 py-6">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
