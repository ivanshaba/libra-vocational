import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactSubmission } from '@/types/admin'

interface ContactDetailsProps {
    submission: ContactSubmission
}

export function ContactDetails({ submission }: ContactDetailsProps) {
    return (
        <div className="space-y-6">
            {/* Contact Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <p className="mt-1">{submission.name}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="mt-1">{submission.email}</p>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Subject</label>
                        <p className="mt-1">{submission.subject}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Message */}
            <Card>
                <CardHeader>
                    <CardTitle>Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md bg-muted p-4">
                        <p className="whitespace-pre-wrap">{submission.message}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Submission Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Submission Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <p className="mt-1 capitalize">{submission.status}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                        <p className="mt-1">
                            {new Date(submission.createdAt).toLocaleString()}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
