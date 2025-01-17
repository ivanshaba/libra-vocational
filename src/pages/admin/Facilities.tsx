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
import { Plus, Pencil, Trash2, Search, ImageIcon } from "lucide-react";
import { api } from "@/services/api";
import { FacilityResponseDto } from "@/types/dtos";
import { FacilityForm } from "@/components/admin/FacilityForm";
import { Skeleton } from "@/components/ui/skeleton";

export function Facilities() {
	const [search, setSearch] = useState("");
	const [selectedFacility, setSelectedFacility] = useState<FacilityResponseDto | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const {
		data: facilities = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["admin", "facilities"],
		queryFn: api.getFacilities,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	const filteredFacilities = facilities.filter(
		(facility) =>
			facility.name.toLowerCase().includes(search.toLowerCase()) ||
			facility.description.toLowerCase().includes(search.toLowerCase())
	);

	const handleDelete = async (id: number) => {
		try {
			await api.deleteFacility(id);
			toast.success("Facility deleted successfully");
			refetch();
		} catch (_error) {
			console.error(_error);
			toast.error("Failed to delete facility");
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
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="relative w-[300px]">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search facilities..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-9"
						/>
					</div>
					<div className="text-sm text-muted-foreground">
						Total Facilities: {facilities.length}
					</div>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => setSelectedFacility(null)}>
							<Plus className="mr-2 h-4 w-4" />
							New Facility
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>
								{selectedFacility ? "Edit Facility" : "Add New Facility"}
							</DialogTitle>
						</DialogHeader>
						<FacilityForm
							facility={selectedFacility}
							onSuccess={() => {
								setIsDialogOpen(false);
								refetch();
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
							<TableHead>Description</TableHead>
							<TableHead>Features</TableHead>
							<TableHead>Equipment</TableHead>
							<TableHead>Image</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead>Updated At</TableHead>
							<TableHead className="w-[100px]">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredFacilities.map((facility) => (
							<TableRow key={facility.id}>
								<TableCell>
									<img
										src={facility.imageUrl}
										alt={facility.name}
										className="h-10 w-10 rounded-full"
									/>
								</TableCell>
								<TableCell className="font-medium">{facility.name}</TableCell>
								<TableCell className="max-w-xs truncate">
									{facility.description}
								</TableCell>
								<TableCell>
									<div className="flex flex-wrap gap-1">
										{facility.features.map((feature) => (
											<span
												key={feature}
												className="rounded-full bg-primary/10 px-2 py-1 text-xs"
											>
												{feature}
											</span>
										))}
									</div>
								</TableCell>
								<TableCell>
									<div className="flex flex-wrap gap-1">
										{facility.equipment.map((item) => (
											<span
												key={item}
												className="rounded-full bg-secondary/50 px-2 py-1 text-xs"
											>
												{item}
											</span>
										))}
									</div>
								</TableCell>
								<TableCell>
									{facility.imageUrl ? (
										<Button
											variant="outline"
											size="icon"
											onClick={() => window.open(facility.imageUrl, "_blank")}
										>
											<ImageIcon className="h-4 w-4" />
										</Button>
									) : (
										"No Image"
									)}
								</TableCell>
								<TableCell>
									{new Date(facility.createdAt).toLocaleDateString()}
								</TableCell>
								<TableCell>
									{new Date(facility.updatedAt).toLocaleDateString()}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												setSelectedFacility(facility);
												setIsDialogOpen(true);
											}}
										>
											<Pencil className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleDelete(facility.id)}
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
	);
}
