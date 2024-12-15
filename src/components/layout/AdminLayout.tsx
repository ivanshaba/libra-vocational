import { Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'
import { Sidebar } from '@/components/admin/Sidebar'

export function AdminLayout() {
  const { isLoading } = useAuth()

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>
  }

//   Redirect to login if not authenticated
//   if (!user) {
//     return <Navigate to="/admin/login" replace />
//   }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
