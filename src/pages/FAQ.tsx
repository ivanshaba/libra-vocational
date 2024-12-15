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
    question: "What age groups do you cater to?",
    answer: "We offer programs for all age groups, from children as young as 5 years old to adults. Each program is specifically designed to meet the developmental needs of different age groups.",
  },
  {
    category: "Programs & Training",
    question: "How long are the training sessions?",
    answer: "Training sessions typically last 1-2 hours, depending on the program and age group. Elite training programs may have longer sessions.",
  },
  {
    category: "Registration & Fees",
    question: "How do I register for a program?",
    answer: "You can register through our online registration system on the website. Navigate to the Registration page, select your desired program, and follow the steps to complete your registration.",
  },
  {
    category: "Registration & Fees",
    question: "What is your refund policy?",
    answer: "We offer full refunds up to 14 days before the program start date. Partial refunds are available up to 7 days before the start date. No refunds are given after the program has begun.",
  },
  {
    category: "Facilities",
    question: "What facilities do you have?",
    answer: "Our facilities include indoor and outdoor training areas, a fully-equipped gym, swimming pool, and specialized training zones for different sports.",
  },
  {
    category: "Facilities",
    question: "Are the facilities accessible year-round?",
    answer: "Yes, our indoor facilities are available year-round. Outdoor facilities may have limited availability during inclement weather.",
  },
]

const groupedFAQs = faqItems.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = []
  }
  acc[item.category].push(item)
  return acc
}, {} as Record<string, FAQItem[]>)
