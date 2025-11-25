
import React, { useState } from "react";
import PageTransition from "@/components/transitions/PageTransition";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Mail, MessageSquare } from "lucide-react";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("access_key", "34d94da8-271d-45e6-b2b1-4405f8164f3f"); // Your Web3Forms access key
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Your message has been sent! We'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-32">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground">
            Have questions, feedback, or collaboration ideas? Get in touch with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="glass-card p-6 md:p-8 space-y-6"
            >
              {/* Hidden input for access key */}
              <input
                type="hidden"
                name="access_key"
                value="34d94da8-271d-45e6-b2b1-4405f8164f3f" // Your Web3Forms access key
              />

              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full button-transition bg-gradient-to-r from-winter-600 to-winter-700 hover:from-winter-700 hover:to-winter-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </motion.form>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

            <p className="text-muted-foreground mb-8">
              We value your feedback and are always looking to improve our Snow Day Calculator.
              Whether you have questions, suggestions, or just want to say hello, we'd love to
              hear from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-winter-600" />
                <a
                  href="mailto:support@snowdaycalculator.com"
                  className="text-primary hover:underline"
                >
                  support@snowdaycalculator.com
                </a>
              </div>

              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 mr-3 text-winter-600 mt-1" />
                <div>
                  <p className="font-medium">Response Time</p>
                  <p className="text-sm text-muted-foreground">
                    We aim to respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
