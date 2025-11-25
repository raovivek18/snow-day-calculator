
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "Is this Snow Day Calculator free?",
      answer: "Yes! The Snow Day Calculator is 100% free to use with no hidden fees."
    },
    {
      question: "How accurate is this calculator?",
      answer: "The accuracy depends on the live weather data we receive from Open-Meteo. While we use real weather data, school closure decisions are made by local authorities based on many factors beyond our calculations."
    },
    {
      question: "Do you store my city or personal data?",
      answer: "No, your city name is only used temporarily to fetch weather data. We don't store any personal information. Only your recent searches are saved locally on your device for convenience."
    },
    {
      question: "Can I use this for any location?",
      answer: "Yes, you can use the Snow Day Calculator for any location where Open-Meteo provides weather data, which covers most of the world."
    },
    {
      question: "How often is the weather data updated?",
      answer: "The weather data is fetched in real-time whenever you make a new calculation, ensuring you have the most current information available."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;
