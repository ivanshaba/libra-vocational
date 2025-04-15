import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FAQItem {
  question: string
  answer: string
  category: string
}

export function FAQ() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about our programs and facilities.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {Object.entries(groupedFAQs).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {items.map((item, index) => (
                      <AccordionItem key={index} value={`${category}-${index}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const faqItems: FAQItem[] = [
  {
    category: "Programs & Training",
    question: "What programs do you offer ?",
    answer: "We offer a variety of programs, including short courses, certificate programs, and diploma programs in areas such as ICT, nursing, catering, plumbing, and more, View all Our Programs Here.",
  },
  {
    category: "Programs & Training",
    question: "What are the requirements for enrollment ?",
    answer: "Certificate Programs: Applicants must have completed S.4 or its equivalent. Diploma Programs: Applicants are required to have completed UACE or its equivalent. Short Courses: Applicants need to present a recognized certificate from any institution, or alternatively, S.4 or S.6 qualifications are also acceptable.",
  },
  {
    category: "Registration & Fees",
    question: "What are the requirements for enrollment ?",
    answer: "Certificate Programs: Applicants must have completed S.4 or its equivalent. Diploma Programs: Applicants are required to have completed UACE or its equivalent. Short Courses: Applicants need to present a recognized certificate from any institution, or alternatively, S.4 or S.6 qualifications are also acceptable.",
  },
  {
    category: "Registration & Fees",
    question: "How do I enroll in a course ?",
    answer: "Enrollment is simple! Visit our admissions page, fill out the online application form, and submit the required documents.",
  },
  {
    category: "Facilities",
    question: "Is there Wi-Fi access for students ?",
    answer: "Yes, we provide Wi-Fi access for our students throughout the campus, available 24/7. This ensures that students can seamlessly access online resources, collaborate on projects, and stay connected for academic and personal use. Whether you're studying late into the night or working on assignments early in the morning, our reliable internet connection is always available to support your needs.",
  },
  {
    category: "Facilities",
    question: "Are there sports fields and playgrounds",
    answer: "At Libra, we go beyond academics as we promote students talents in football, MDD e.t.c. So, we have a football field and a basketball court.",
  },
]

const groupedFAQs = faqItems.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = []
  }
  acc[item.category].push(item)
  return acc
}, {} as Record<string, FAQItem[]>)
