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
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { api } from '@/services/api'
import { Program } from '@/types'
import { ProgramForm } from '@/components/admin/ProgramForm'
import { Skeleton } from '@/components/ui/skeleton'

export function Programs() {
    const [search, setSearch] = useState('')
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { data: programs = [], refetch,isLoading } = useQuery({
        queryKey: ['admin', 'programs'],
        queryFn: api.getAdminPrograms,
    })

    const filteredPrograms = programs.filter(program =>
        program.name.toLowerCase().includes(search.toLowerCase()) ||
        program.description.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this program?')) return

        try {
            await api.deleteProgram(id)
            toast.success('Program deleted successfully')
            refetch()
        } catch {
            toast.error('Failed to delete program')
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
                            placeholder="Search programs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setSelectedProgram(null)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Program
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {selectedProgram ? 'Edit Program' : 'Add New Program'}
                            </DialogTitle>
                        </DialogHeader>
                        <ProgramForm
                            program={selectedProgram}
                            onSuccess={() => {
                                setIsDialogOpen(false)
                                refetch()
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPrograms.map((program) => (
                            <TableRow key={program.id}>
                                <TableCell className="font-medium">{program.name}</TableCell>
                                <TableCell>
                                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs capitalize">
                                        {program.category}
                                    </span>
                                </TableCell>
                                <TableCell>{program.duration}</TableCell>
                                <TableCell>${program.price}</TableCell>
                                <TableCell>{program.schedule}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setSelectedProgram(program)
                                                setIsDialogOpen(true)
                                            }}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(program.id)}
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
        </div>
    )
}
