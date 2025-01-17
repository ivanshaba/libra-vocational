import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoachResponseDto } from "@/types/dtos";
import { api } from "@/services/api";
import { useImageUpload } from "@/hooks/useImageUpload";

type StaffType = "coach" | "staff" | "board" | "other";

interface CoachFormProps {
	coach?: CoachResponseDto | null;
	onSuccess: () => void;
}

export function CoachForm({ coach, onSuccess }: CoachFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { isUploading, handleImageUpload } = useImageUpload();
	const [staffType, setStaffType] = useState<StaffType>(
		coach?.role?.toLowerCase().includes("coach")
			? "coach"
			: coach?.role?.toLowerCase().includes("staff")
			? "staff"
			: coach?.role?.toLowerCase().includes("board")
			? "board"
			: "other"
	);
	const [formData, setFormData] = useState({
		name: coach?.name || "",
		role: coach?.role || "",
		bio: coach?.bio || "",
		specialties: coach?.specialties.join(", ") || "",
		imageUrl: coach?.imageUrl || "",
	});

	const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await handleImageUpload(file, (url) => {
			setFormData((prev) => ({ ...prev, imageUrl: url }));
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const data = {
				...formData,
				role:
					staffType === "coach"
						? `Coach - ${formData.role}`
						: staffType === "staff"
						? `Staff - ${formData.role}`
						: staffType === "board"
						? `Board Member - ${formData.role}`
						: formData.role,
				specialties: formData.specialties
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean),
			};

			if (coach) {
				await api.updateCoach(coach.id, data);
				toast.success("Team member updated successfully");
			} else {
				await api.createCoach(data);
				toast.success("Team member created successfully");
			}
			onSuccess();
		} catch (error) {
			console.error(error);
			toast.error("Failed to save team member");
		} finally {
			setIsLoading(false);
		}
	};

	const renderSpecialtiesField = () => (
		<div className="space-y-2">
			<Label>Areas of Expertise (comma-separated)</Label>
			<Textarea
				value={formData.specialties}
				onChange={(e) => setFormData((prev) => ({ ...prev, specialties: e.target.value }))}
				placeholder={
					staffType === "coach"
						? "e.g., Youth Development, Strength Training, Tactical Analysis"
						: staffType === "staff"
						? "e.g., Sports Medicine, Physical Therapy, Performance Analysis"
						: staffType === "board"
						? "e.g., Strategic Planning, Finance, Community Relations"
						: "Enter areas of expertise"
				}
			/>
		</div>
	);

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<Tabs value={staffType} onValueChange={(value) => setStaffType(value as StaffType)}>
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="coach">Coach</TabsTrigger>
					<TabsTrigger value="staff">Staff</TabsTrigger>
					<TabsTrigger value="board">Board</TabsTrigger>
					<TabsTrigger value="other">Other</TabsTrigger>
				</TabsList>

				<TabsContent value="coach">
					<div className="space-y-4">
						<div>
							<Label>Name</Label>
							<Input
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, name: e.target.value }))
								}
								required
								placeholder="Enter full name"
							/>
						</div>
						<div>
							<Label>Coaching Role</Label>
							<Input
								value={formData.role}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, role: e.target.value }))
								}
								required
								placeholder="e.g., Head Coach, Assistant Coach, Youth Coach"
							/>
						</div>
						{renderSpecialtiesField()}
					</div>
				</TabsContent>

				<TabsContent value="staff">
					<div className="space-y-4">
						<div>
							<Label>Name</Label>
							<Input
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, name: e.target.value }))
								}
								required
								placeholder="Enter full name"
							/>
						</div>
						<div>
							<Label>Staff Role</Label>
							<Input
								value={formData.role}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, role: e.target.value }))
								}
								required
								placeholder="e.g., Physiotherapist, Team Manager, Administrator"
							/>
						</div>
						{renderSpecialtiesField()}
					</div>
				</TabsContent>

				<TabsContent value="board">
					<div className="space-y-4">
						<div>
							<Label>Name</Label>
							<Input
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, name: e.target.value }))
								}
								required
								placeholder="Enter full name"
							/>
						</div>
						<div>
							<Label>Board Position</Label>
							<Input
								value={formData.role}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, role: e.target.value }))
								}
								required
								placeholder="e.g., Chairperson, Director, Executive Member"
							/>
						</div>
						{renderSpecialtiesField()}
					</div>
				</TabsContent>

				<TabsContent value="other">
					<div className="space-y-4">
						<div>
							<Label>Name</Label>
							<Input
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, name: e.target.value }))
								}
								required
								placeholder="Enter full name"
							/>
						</div>
						<div>
							<Label>Role</Label>
							<Input
								value={formData.role}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, role: e.target.value }))
								}
								required
								placeholder="Enter role"
							/>
						</div>
						{renderSpecialtiesField()}
					</div>
				</TabsContent>
			</Tabs>

			<div>
				<Label>Bio</Label>
				<Textarea
					value={formData.bio}
					onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
					required
					className="h-32"
					placeholder="Enter biographical information"
				/>
			</div>

			<div>
				<Label>Profile Image</Label>
				<Input
					type="file"
					accept="image/*"
					onChange={onImageUpload}
					disabled={isUploading}
					className="mb-2"
				/>
				{formData.imageUrl && (
					<div className="mt-2">
						<img
							src={formData.imageUrl}
							alt="Preview"
							className="h-32 w-32 rounded-lg object-cover"
						/>
					</div>
				)}
			</div>

			<div className="flex justify-end gap-4">
				<Button type="submit" disabled={isLoading || isUploading}>
					{isLoading ? "Saving..." : coach ? "Update Member" : "Add Member"}
				</Button>
			</div>
		</form>
	);
}
