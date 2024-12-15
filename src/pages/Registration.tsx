import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  // Program Selection
  programId: string
  startDate: string
  // Emergency Contact
  emergencyName: string
  emergencyPhone: string
  emergencyRelation: string
  // Medical Information
  medicalConditions: string
  allergies: string
  medications: string
}

const steps = [
  "Personal Information",
  "Program Selection",
  "Emergency Contact",
  "Medical Information",
  "Review & Submit"
]

export function Registration() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    programId: "",
    startDate: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    medicalConditions: "",
    allergies: "",
    medications: "",
  })

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = async () => {
    try {
      // Here we'll add API integration later
      console.log("Form submitted:", formData)
      // Show success message or redirect
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInformation
            formData={formData}
            onChange={handleInputChange}
          />
        )
      case 1:
        return (
          <ProgramSelection
            formData={formData}
            onChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
        )
      case 2:
        return (
          <EmergencyContact
            formData={formData}
            onChange={handleInputChange}
          />
        )
      case 3:
        return (
          <MedicalInformation
            formData={formData}
            onChange={handleInputChange}
          />
        )
      case 4:
        return <ReviewSubmit formData={formData} />
      default:
        return null
    }
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">Program Registration</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Complete the registration form to join our sports programs.
        </p>

        {/* Progress Steps */}
        <div className="mt-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex flex-col items-center ${
                  index <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full ${
                    index <= currentStep ? "bg-primary" : "bg-muted"
                  } flex items-center justify-center text-white`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm hidden sm:block">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 bg-muted rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Form Content */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{steps[currentStep]}</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
              >
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
                {currentStep !== steps.length - 1 && (
                  <ChevronRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Form Step Components
function PersonalInformation({
  formData,
  onChange,
}: {
  formData: FormData
  onChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">First Name</label>
          <Input
            value={formData.firstName}
            onChange={onChange("firstName")}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Last Name</label>
          <Input
            value={formData.lastName}
            onChange={onChange("lastName")}
            placeholder="Enter your last name"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={onChange("email")}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Phone</label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={onChange("phone")}
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Date of Birth</label>
        <Input
          type="date"
          value={formData.dateOfBirth}
          onChange={onChange("dateOfBirth")}
        />
      </div>
    </div>
  )
}

function ProgramSelection({
  formData,
  onChange,
  onSelectChange,
}: {
  formData: FormData
  onChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (field: keyof FormData) => (value: string) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Select Program</label>
        <Select
          value={formData.programId}
          onValueChange={onSelectChange("programId")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a program" />
          </SelectTrigger>
          <SelectContent>
            {programs.map((program) => (
              <SelectItem key={program.id} value={program.id}>
                {program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium">Start Date</label>
        <Input
          type="date"
          value={formData.startDate}
          onChange={onChange("startDate")}
        />
      </div>
    </div>
  )
}

function EmergencyContact({
  formData,
  onChange,
}: {
  formData: FormData
  onChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Emergency Contact Name</label>
        <Input
          value={formData.emergencyName}
          onChange={onChange("emergencyName")}
          placeholder="Enter emergency contact name"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Emergency Contact Phone</label>
        <Input
          type="tel"
          value={formData.emergencyPhone}
          onChange={onChange("emergencyPhone")}
          placeholder="Enter emergency contact phone"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Relationship</label>
        <Input
          value={formData.emergencyRelation}
          onChange={onChange("emergencyRelation")}
          placeholder="Enter relationship to emergency contact"
        />
      </div>
    </div>
  )
}

function MedicalInformation({
  formData,
  onChange,
}: {
  formData: FormData
  onChange: (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Medical Conditions</label>
        <Input
          value={formData.medicalConditions}
          onChange={onChange("medicalConditions")}
          placeholder="List any medical conditions"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Allergies</label>
        <Input
          value={formData.allergies}
          onChange={onChange("allergies")}
          placeholder="List any allergies"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Current Medications</label>
        <Input
          value={formData.medications}
          onChange={onChange("medications")}
          placeholder="List any current medications"
        />
      </div>
    </div>
  )
}

function ReviewSubmit({ formData }: { formData: FormData }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold">Personal Information</h3>
        <div className="mt-2 space-y-2">
          <p>Name: {formData.firstName} {formData.lastName}</p>
          <p>Email: {formData.email}</p>
          <p>Phone: {formData.phone}</p>
          <p>Date of Birth: {formData.dateOfBirth}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Program Selection</h3>
        <div className="mt-2 space-y-2">
          <p>Program: {programs.find(p => p.id === formData.programId)?.name}</p>
          <p>Start Date: {formData.startDate}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Emergency Contact</h3>
        <div className="mt-2 space-y-2">
          <p>Name: {formData.emergencyName}</p>
          <p>Phone: {formData.emergencyPhone}</p>
          <p>Relationship: {formData.emergencyRelation}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Medical Information</h3>
        <div className="mt-2 space-y-2">
          <p>Medical Conditions: {formData.medicalConditions || "None"}</p>
          <p>Allergies: {formData.allergies || "None"}</p>
          <p>Medications: {formData.medications || "None"}</p>
        </div>
      </div>
    </div>
  )
}

const programs = [
  { id: "1", name: "Elite Performance Training" },
  { id: "2", name: "Youth Development Program" },
  { id: "3", name: "Summer Sports Camp" },
  { id: "4", name: "Speed & Agility Clinic" },
  { id: "5", name: "Strength Training Program" },
]
