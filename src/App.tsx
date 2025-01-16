import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { AppProvider } from "@/context/AppContext";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import { Registration as RegistrationPage } from "@/pages/Registration";
import { News as NewsPage } from "@/pages/News";
import { Gallery as GalleryPage } from "@/pages/Gallery";
import { Contact as ContactPage } from "@/pages/Contact";
import { FAQ as FAQPage } from "@/pages/FAQ";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/react-query";
import { Dashboard } from "@/pages/admin/Dashboard";
import { Posts as AdminPosts } from "@/pages/admin/Posts";
import { Programs as AdminPrograms } from "@/pages/admin/Programs";
import { Registrations as AdminRegistrations } from "@/pages/admin/Registrations";
import { Coaches as AdminCoaches } from "@/pages/admin/Coaches";
import { Facilities as AdminFacilities } from "@/pages/admin/Facilities";
import { Gallery as AdminGallery } from "@/pages/admin/Gallery";
import { Login } from "@/pages/admin/Login";
import { AuthProvider } from "@/contexts/auth-context";
import { AdminLayout } from "@/components/layout/AdminLayout";
import ProgramsPage from "@/pages/Programs";
import { Facilities as FacilitiesPage } from "@/pages/Facilities";
import { Coaches as CoachesPage } from "@/pages/Coaches";
import { Toaster } from "sonner";
import Signup from "@/pages/admin/Signup";
import { NewsDetails } from "@/pages/NewsDetails";
import { WhatsAppChat } from "@/components/whatsapp-chat";
import { AlumniNetwork as AlumniPage } from "@/pages/Alumni";
import { AlumniNetwork as AdminAlumniNetwork } from "@/pages/admin/AlumniNetwork";
import { ProgramDetails } from "@/pages/ProgramDetails";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "about", element: <AboutPage /> },
			{ path: "programs", element: <ProgramsPage /> },
			{ path: "coaches", element: <CoachesPage /> },
			{ path: "facilities", element: <FacilitiesPage /> },
			{ path: "registration", element: <RegistrationPage /> },
			{ path: "news", element: <NewsPage /> },
			{ path: "news/:id", element: <NewsDetails /> },
			{ path: "gallery", element: <GalleryPage /> },
			{ path: "contact", element: <ContactPage /> },
			{ path: "faq", element: <FAQPage /> },
			{ path: "alumni", element: <AlumniPage /> },
			{ path: "programs/:id", element: <ProgramDetails /> },
		],
	},
	{
		path: "admin/login",
		element: <Login />,
	},
	{
		path: "admin/signup",
		element: <Signup />,
	},
	{
		path: "admin",
		element: <AdminLayout />,
		children: [
			{ index: true, element: <Dashboard /> },
			{ path: "posts", element: <AdminPosts /> },
			{ path: "programs", element: <AdminPrograms /> },
			{ path: "registrations", element: <AdminRegistrations /> },
			{ path: "coaches", element: <AdminCoaches /> },
			{ path: "facilities", element: <AdminFacilities /> },
			{ path: "gallery", element: <AdminGallery /> },
			{ path: "alumni", element: <AdminAlumniNetwork /> },
		],
	},
]);

export default function App() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<AppProvider>
					<Toaster />
					<RouterProvider router={router} />
					<WhatsAppChat phoneNumber="256746971205" />
				</AppProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</AuthProvider>
	);
}
