import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Search, Eye, Trash2 } from 'lucide-react'
import { api } from '@/services/api'
import { RegistrationFormData } from '@/types'
import { RegistrationDetails } from '@/components/admin/RegistrationDetails'
import { Skeleton } from '@/components/ui/skeleton'

export function Registrations() {
    const [search, setSearch] = useState('')
    const [selectedRegistration, setSelectedRegistration] = useState<RegistrationFormData | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { data: registrations = [], refetch, isLoading } = useQuery({
        queryKey: ['admin', 'registrations'],
        queryFn: api.getAdminRegistrations,
    })

    const filteredRegistrations = registrations.filter(registration =>
        registration.firstName.toLowerCase().includes(search.toLowerCase()) ||
        registration.lastName.toLowerCase().includes(search.toLowerCase()) ||
        registration.email.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this registration?')) return

        try {
            await api.deleteRegistration(id)
            toast.success('Registration deleted successfully')
            refetch()
        } catch {
            toast.error('Failed to delete registration')
        }
    }

    const handleStatusChange = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
        try {
            await api.updateRegistrationStatus(id, status)
            toast.success('Registration status updated successfully')
            refetch()
        } catch {
            toast.error('Failed to update registration status')
        }
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-[300px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search registrations..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Program</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRegistrations.map((registration) => (
                            <TableRow key={registration.id}>
                                <TableCell>
                                    {registration.firstName} {registration.lastName}
                                </TableCell>
                                <TableCell>{registration.email}</TableCell>
                                <TableCell>{registration.programId}</TableCell>
                                <TableCell>
                                    <Select
                                        value={registration.status || 'pending'}
                                        onValueChange={(value) =>
                                            handleStatusChange(
                                                registration.id,
                                                value as 'pending' | 'approved' | 'rejected'
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>{new Date(registration.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setSelectedRegistration(registration)
                                                setIsDialogOpen(true)
                                            }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(registration.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Registration Details</DialogTitle>
                    </DialogHeader>
                    {selectedRegistration && (
                        <RegistrationDetails registration={selectedRegistration} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
