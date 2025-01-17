import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { api } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlumniResponseDto } from "@/types/dtos";
import { AlumniForm } from "@/components/admin/AlumniForm";
import { motion } from "framer-motion";

export function AlumniNetwork() {
	const [search, setSearch] = useState("");
	const [selectedAlumni, setSelectedAlumni] = useState<AlumniResponseDto | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const {
		data: alumni = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["admin", "alumni"],
		queryFn: api.getAlumni,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	const filteredAlumni = alumni.filter(
		(alum) =>
			alum.name.toLowerCase().includes(search.toLowerCase()) ||
			alum.currentTeam?.toLowerCase().includes(search.toLowerCase()) ||
			alum.position.toLowerCase().includes(search.toLowerCase())
	);

	const handleDelete = async (id: number) => {
		try {
			await api.deleteAlumni(id);
			toast.success("Alumni deleted successfully");
			refetch();
		} catch (_error) {
			console.error(_error);
			toast.error("Failed to delete alumni");
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-6">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<section className="relative py-20">
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: "url('/images/alumni/hero-bg.jpg')",
					}}
				>
					<div className="absolute inset-0 bg-black/50" />
				</div>

				<div className="container relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-3xl mx-auto text-center text-white"
					>
						<h1 className="text-5xl font-bold mb-6">Alumni Network</h1>
						<p className="text-xl text-white/90">
							Celebrating the success stories and achievements of our academy
							graduates
						</p>
					</motion.div>
				</div>
			</section>

			<div className="container">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="relative w-[300px]">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search alumni..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="pl-9"
							/>
						</div>
						<div className="text-sm text-muted-foreground">
							Total Alumni: {alumni.length}
						</div>
					</div>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button onClick={() => setSelectedAlumni(null)}>
								<Plus className="mr-2 h-4 w-4" />
								New Alumni
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-2xl">
							<DialogHeader>
								<DialogTitle>
									{selectedAlumni ? "Edit Alumni" : "Add New Alumni"}
								</DialogTitle>
							</DialogHeader>
							<AlumniForm
								alumni={selectedAlumni}
								onSuccess={() => {
									setIsDialogOpen(false);
									refetch();
								}}
							/>
						</DialogContent>
					</Dialog>
				</div>

				<div className="rounded-md border mt-6">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Image</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Position</TableHead>
								<TableHead>Current Team</TableHead>
								<TableHead>Graduation Year</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Achievements</TableHead>
								<TableHead>Created At</TableHead>
								<TableHead>Updated At</TableHead>
								<TableHead className="w-[100px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredAlumni.map((alumni) => (
								<TableRow key={alumni.id}>
									<TableCell>
										<img
											src={alumni.image}
											alt={alumni.name}
											className="h-10 w-10 rounded-full object-cover"
										/>
									</TableCell>
									<TableCell className="font-medium">{alumni.name}</TableCell>
									<TableCell>{alumni.position}</TableCell>
									<TableCell>{alumni.currentTeam}</TableCell>
									<TableCell>{alumni.graduationYear}</TableCell>
									<TableCell>
										<span className="rounded-full bg-primary/10 px-2 py-1 text-xs capitalize">
											{alumni.category}
										</span>
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1">
											{alumni.achievements.map((achievement) => (
												<span
													key={achievement}
													className="rounded-full bg-primary/10 px-2 py-1 text-xs"
												>
													{achievement}
												</span>
											))}
										</div>
									</TableCell>
									<TableCell>
										{new Date(alumni.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell>
										{new Date(alumni.updatedAt).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<Button
												variant="ghost"
												size="icon"
												onClick={() => {
													setSelectedAlumni(alumni);
													setIsDialogOpen(true);
												}}
											>
												<Pencil className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => handleDelete(alumni.id)}
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
		</div>
	);
}
