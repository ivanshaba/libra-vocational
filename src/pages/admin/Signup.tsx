import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { api } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Loader2, Lock, Mail, ChevronLeft } from "lucide-react";
import { SignupCredentials } from "@/types/auth";

export function Signup() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [credentials, setCredentials] = useState<SignupCredentials>({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await api.signup(credentials);
			login(response.user, response.token);
			toast.success("Signup successful!");
			navigate("/admin");
		} catch (error: unknown) {
			// @ts-ignore
			toast.error(error.response?.data.error.message, {
				description:
					// @ts-ignore
					error.response?.data.error.details.length > 0
						? // @ts-ignore
						  error.response?.data.error.details[0].message
						: null,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4">
			{/* Back to Home Link */}
			<Link
				to="/"
				className="absolute top-4 left-4 text-white/60 hover:text-white flex items-center gap-2 transition-colors"
			>
				<ChevronLeft className="h-4 w-4" />
				Back to Home
			</Link>

			<div className="w-full max-w-md">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{/* Logo/Brand Section - Now Clickable */}
					<div className="text-center mb-8">
						<Link to="/" className="inline-block group">
							<div className="flex justify-center mb-4">
								<div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
									<Lock className="h-6 w-6 text-white" />
								</div>
							</div>
							<h1 className="text-2xl font-bold text-white mb-2 group-hover:text-white/90">
								Arena Sports Academy
							</h1>
							<p className="text-white/60">Admin Dashboard Signup</p>
						</Link>
					</div>

					<Card className="backdrop-blur-sm bg-white/10 border-white/20">
						<CardHeader className="space-y-1 text-white">
							<CardTitle className="text-2xl text-center">Sign Up</CardTitle>
							<CardDescription className="mt-2 text-center text-white/60">
								Enter your credentials to create an account
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										Email
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
										<Input
											type="email"
											value={credentials.email}
											onChange={(e) =>
												setCredentials((prev) => ({
													...prev,
													email: e.target.value,
												}))
											}
											className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
											placeholder="Enter your email"
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										Password
									</label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
										<Input
											type="password"
											value={credentials.password}
											onChange={(e) =>
												setCredentials((prev) => ({
													...prev,
													password: e.target.value,
												}))
											}
											className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
											placeholder="Enter your password"
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-white/80">
										Confirm Password
									</label>
								</div>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
									<Input
										type="password"
										value={credentials.confirmPassword}
										onChange={(e) =>
											setCredentials((prev) => ({
												...prev,
												confirmPassword: e.target.value,
											}))
										}
										className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
										placeholder="Confirm your password"
										required
									/>
								</div>
								<Button
									type="submit"
									className="w-full bg-white text-primary-900 hover:bg-white/90 transition-colors"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Signing up...
										</>
									) : (
										"Sign up"
									)}
								</Button>

								<div className="text-center">
									<Link
										to="/admin/login"
										className="text-sm text-white/60 hover:text-white transition-colors"
									>
										Already have an account? Sign in
									</Link>
								</div>
							</form>
						</CardContent>
					</Card>

					{/* Footer */}
					<p className="text-center text-white/40 text-sm mt-8">
						© {new Date().getFullYear()} Arena Sports Academy. All rights reserved.
					</p>
				</motion.div>
			</div>
		</div>
	);
}

export default Signup;
