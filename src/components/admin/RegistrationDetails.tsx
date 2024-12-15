import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RegistrationFormData } from '@/types'

interface RegistrationDetailsProps {
    registration: RegistrationFormData
}

export function RegistrationDetails({ registration }: RegistrationDetailsProps) {
    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">First Name</label>
                        <p className="mt-1">{registration.firstName}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                        <p className="mt-1">{registration.lastName}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="mt-1">{registration.email}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="mt-1">{registration.phone}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                        <p className="mt-1">{new Date(registration.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Program Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Program Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Program</label>
                        <p className="mt-1">{registration.programId}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                        <p className="mt-1">{new Date(registration.startDate).toLocaleDateString()}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
                <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <p className="mt-1">{registration.emergencyName}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="mt-1">{registration.emergencyPhone}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Relationship</label>
                        <p className="mt-1">{registration.emergencyRelation}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Medical Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Medical Conditions</label>
                        <p className="mt-1 whitespace-pre-wrap">
                            {registration.medicalConditions || 'None specified'}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Allergies</label>
                        <p className="mt-1 whitespace-pre-wrap">
                            {registration.allergies || 'None specified'}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Medications</label>
                        <p className="mt-1 whitespace-pre-wrap">
                            {registration.medications || 'None specified'}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
