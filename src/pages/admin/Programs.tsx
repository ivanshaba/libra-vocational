import { useEffect, useState } from 'react'
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
import { Plus, Pencil, Trash2, Search, ImageIcon } from 'lucide-react'
import { api } from '@/services/api'
import { ProgramForm } from '@/components/admin/ProgramForm'
import { Skeleton } from '@/components/ui/skeleton'
import { ProgramResponseDto } from '@/types/dtos'

export function Programs() {
    const [search, setSearch] = useState('')
    const [selectedProgram, setSelectedProgram] = useState<ProgramResponseDto | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { data: programs = [], refetch,isLoading } = useQuery({
        queryKey: ['admin', 'programs'],
        queryFn: api.getPrograms,
    })
    useEffect(() => {
        refetch()
    }, [refetch])

    const filteredPrograms = programs.filter(
        (program) =>
            program.name.toLowerCase().includes(search.toLowerCase()) ||
            program.description.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id: number) => {
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
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Is Active</TableHead>
                            <TableHead>Max Participants</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPrograms.map((program) => (
                            <TableRow key={program.name}>
                                <TableCell>
                                    <img
                                        src={program.imageUrl}
                                        alt={program.name}
                                        className="h-10 w-10 rounded-full"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{program.name}</TableCell>
                                <TableCell>
                                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs capitalize">
                                        {program.category}
                                    </span>
                                </TableCell>
                                <TableCell>{program.duration}</TableCell>
                                <TableCell>UGX{program.price}</TableCell>
                                <TableCell>
                                     <div className="flex flex-wrap gap-1">
                                        {program.schedule.split(',').map((schedule) => (
                                            <span
                                                key={schedule}
                                                className="rounded-full bg-primary/10 px-2 py-1 text-xs"
                                            >
                                                {schedule}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>{program.isActive ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{program.maxParticipants}</TableCell>
                                <TableCell>
                                    {program.imageUrl ? <Button variant="outline" size="icon" onClick={() => window.open( program.imageUrl, '_blank' )}>
                                        <ImageIcon className="h-4 w-4" />
                                    </Button> : 'No Image'}
                                </TableCell>
                                <TableCell>
                                    {new Date( program.createdAt ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {new Date( program.updatedAt ).toLocaleDateString()}
                                </TableCell>
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
