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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Trash2 } from "lucide-react";
import { api } from "@/services/api";
import { RegistrationDetails } from "@/components/admin/RegistrationDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { RegistrationResponseDto } from "@/types/dtos";

export function Registrations() {
	const [search, setSearch] = useState("");
	const [selectedRegistration, setSelectedRegistration] =
		useState<RegistrationResponseDto | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const {
		data: registrations = [],
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["admin", "registrations"],
		queryFn: api.getRegistrations,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	const filteredRegistrations = registrations.filter(
		(registration) =>
			registration.firstName.toLowerCase().includes(search.toLowerCase()) ||
			registration.lastName.toLowerCase().includes(search.toLowerCase()) ||
			registration.email.toLowerCase().includes(search.toLowerCase()) ||
			registration.phone.toLowerCase().includes(search.toLowerCase()) ||
			registration.emergencyName.toLowerCase().includes(search.toLowerCase()) ||
			registration.emergencyPhone.toLowerCase().includes(search.toLowerCase()) ||
			registration.emergencyRelation.toLowerCase().includes(search.toLowerCase()) ||
			registration.medicalConditions.toLowerCase().includes(search.toLowerCase()) ||
			registration.allergies.toLowerCase().includes(search.toLowerCase()) ||
			registration.medications.toLowerCase().includes(search.toLowerCase())
	);

	const handleDelete = async (id: number) => {
		try {
			await api.deleteRegistration(id);
			toast.success("Registration deleted successfully");
			refetch();
		} catch {
			toast.error("Failed to delete registration");
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
							placeholder="Search registrations..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-9"
						/>
					</div>
					<div className="text-sm text-muted-foreground">
						Total Registrations: {registrations.length}
					</div>
				</div>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>DOB</TableHead>
							<TableHead>Start Date</TableHead>
							<TableHead>Emergency Person</TableHead>
							<TableHead>Emergency Phone</TableHead>
							<TableHead>Relationship</TableHead>
							<TableHead>Medical Conditions</TableHead>
							<TableHead>Allergies</TableHead>
							<TableHead>Medications</TableHead>
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
								<TableCell>{registration.phone}</TableCell>
								<TableCell>
									{new Date(registration.dateOfBirth).toLocaleDateString()}
								</TableCell>
								<TableCell>
									{new Date(registration.startDate).toLocaleDateString()}
								</TableCell>
								<TableCell>{registration.emergencyName}</TableCell>
								<TableCell>{registration.emergencyPhone}</TableCell>
								<TableCell>{registration.emergencyRelation}</TableCell>
								<TableCell>{registration.medicalConditions}</TableCell>
								<TableCell>{registration.allergies}</TableCell>
								<TableCell>{registration.medications}</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												setSelectedRegistration(registration);
												setIsDialogOpen(true);
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
	);
}
