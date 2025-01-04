import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { api } from "@/services/api";
import { AlumniResponseDto } from "@/types/dtos";
import { useImageUpload } from "@/hooks/useImageUpload";

interface AlumniFormProps {
	alumni: AlumniResponseDto | null;
	onSuccess: () => void;
}

export function AlumniForm({ alumni, onSuccess }: AlumniFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { isUploading, handleImageUpload } = useImageUpload();
	const [formData, setFormData] = useState({
		name: alumni?.name || "",
		position: alumni?.position || "",
		currentTeam: alumni?.currentTeam || "",
		graduationYear: alumni?.graduationYear || new Date().getFullYear(),
		category: alumni?.category || "professional",
		achievements: alumni?.achievements.join(", ") || "",
		image: alumni?.image || "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const data = {
				...formData,
				achievements: formData.achievements
					.split(",")
					.map((achievement) => achievement.trim())
					.filter(Boolean),
			};

			if (alumni) {
				await api.updateAlumni(alumni.id, data);
				toast.success("Alumni updated successfully");
			} else {
				await api.createAlumni(data);
				toast.success("Alumni created successfully");
			}
			onSuccess();
		} catch (error) {
			console.error(error);
			toast.error("Failed to save alumni");
		} finally {
			setIsLoading(false);
		}
	};

	const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		await handleImageUpload(file, (url) => {
			setFormData((prev) => ({ ...prev, image: url }));
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<label className="text-sm font-medium">Name</label>
					<Input
						value={formData.name}
						onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
						required
					/>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Position</label>
					<Input
						value={formData.position}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, position: e.target.value }))
						}
						required
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<label className="text-sm font-medium">Current Team</label>
					<Input
						value={formData.currentTeam}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, currentTeam: e.target.value }))
						}
					/>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Graduation Year</label>
					<Input
						type="number"
						value={formData.graduationYear}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								graduationYear: parseInt(e.target.value),
							}))
						}
						required
					/>
				</div>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Category</label>
				<Select
					value={formData.category}
					onValueChange={(value) =>
						setFormData((prev) => ({
							...prev,
							category: value as "professional" | "college" | "youth",
						}))
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="professional">Professional</SelectItem>
						<SelectItem value="college">College</SelectItem>
						<SelectItem value="youth">Youth Teams</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Achievements (comma-separated)</label>
				<Textarea
					value={formData.achievements}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, achievements: e.target.value }))
					}
					placeholder="e.g., National Team Player, League Top Scorer 2022"
				/>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Image</label>
				<Input
					type="file"
					accept="image/*"
					onChange={onImageUpload}
					disabled={isUploading}
					className="mb-2"
				/>
				<Input
					type="url"
					value={formData.image}
					onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
					placeholder="Or enter image URL directly"
					required
				/>
				{formData.image && (
					<div className="mt-2">
						<img
							src={formData.image}
							alt="Preview"
							className="h-32 w-32 rounded-full object-cover"
						/>
					</div>
				)}
			</div>

			<Button type="submit" className="w-full" disabled={isLoading || isUploading}>
				{isLoading || isUploading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						{isUploading ? "Uploading..." : "Saving..."}
					</>
				) : alumni ? (
					"Update Alumni"
				) : (
					"Create Alumni"
				)}
			</Button>
		</form>
	);
}
