import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "@/components/layout/RootLayout"
import { AppProvider } from "@/context/AppContext"
import { Home } from "@/pages/Home"
import { About } from "@/pages/About"
import { Programs } from "@/pages/Programs"
import { Coaches } from "@/pages/Coaches"
import { Facilities } from "@/pages/Facilities"
import { Registration } from "@/pages/Registration"
import { News } from "@/pages/News"
import { Gallery } from "@/pages/Gallery"
import { Contact } from "@/pages/Contact"
import { FAQ } from '@/pages/FAQ'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "programs", element: <Programs /> },
      { path: "coaches", element: <Coaches /> },
      { path: "facilities", element: <Facilities /> },
      { path: "registration", element: <Registration /> },
      { path: "news", element: <News /> },
      { path: "gallery", element: <Gallery /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
    ],
  },
])

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}
