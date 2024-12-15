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
import { ContactSubmission } from '@/types/admin'
import { ContactDetails } from '@/components/admin/ContactDetails'

export function ContactSubmissions() {
    const [search, setSearch] = useState('')
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['admin', 'contact-submissions'],
        queryFn: api.getAdminContactSubmissions,
    })

    const filteredSubmissions = submissions.filter(submission =>
        submission.name.toLowerCase().includes(search.toLowerCase()) ||
        submission.email.toLowerCase().includes(search.toLowerCase()) ||
        submission.subject.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this submission?')) return

        try {
            await api.deleteContactSubmission(id)
            toast.success('Submission deleted successfully')
            refetch()
        } catch {
            toast.error('Failed to delete submission')
        }
    }

    const handleStatusChange = async (id: string, status: ContactSubmission['status']) => {
        try {
            await api.updateContactStatus(id, status)
            toast.success('Status updated successfully')
            refetch()
        } catch {
            toast.error('Failed to update status')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative w-[300px]">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search submissions..."
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
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSubmissions.map((submission) => (
                            <TableRow key={submission.id}>
                                <TableCell>{submission.name}</TableCell>
                                <TableCell>{submission.email}</TableCell>
                                <TableCell>{submission.subject}</TableCell>
                                <TableCell>
                                    <Select
                                        value={submission.status}
                                        onValueChange={(value) =>
                                            handleStatusChange(
                                                submission.id,
                                                value as ContactSubmission['status']
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="read">Read</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    {new Date(submission.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setSelectedSubmission(submission)
                                                setIsDialogOpen(true)
                                            }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(submission.id)}
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Contact Submission Details</DialogTitle>
                    </DialogHeader>
                    {selectedSubmission && (
                        <ContactDetails submission={selectedSubmission} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
