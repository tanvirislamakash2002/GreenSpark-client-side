import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
      {/* Hero Section */}
      <section className="relative bg-green-700 dark:bg-green-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-green-100">
            Have questions about sustainability? Want to share an idea? We'd love to hear from you!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  We're here to help and answer any questions you might have.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Green Street, Eco District<br />
                      San Francisco, CA 94105<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Main: +1 (555) 123-4567<br />
                      Support: +1 (555) 123-4568<br />
                      Mon-Fri, 9am-6pm PST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-sm text-muted-foreground">
                      General: hello@greenspark.com<br />
                      Support: support@greenspark.com<br />
                      Press: press@greenspark.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Office Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>
                  Stay connected on social media for updates and inspiration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Link href="#" className="p-3 bg-green-100 dark:bg-green-900 rounded-full hover:bg-green-200 transition-colors">
                    <Facebook className="w-5 h-5 text-green-700 dark:text-green-300" />
                  </Link>
                  <Link href="#" className="p-3 bg-green-100 dark:bg-green-900 rounded-full hover:bg-green-200 transition-colors">
                    <Twitter className="w-5 h-5 text-green-700 dark:text-green-300" />
                  </Link>
                  <Link href="#" className="p-3 bg-green-100 dark:bg-green-900 rounded-full hover:bg-green-200 transition-colors">
                    <Instagram className="w-5 h-5 text-green-700 dark:text-green-300" />
                  </Link>
                  <Link href="#" className="p-3 bg-green-100 dark:bg-green-900 rounded-full hover:bg-green-200 transition-colors">
                    <Linkedin className="w-5 h-5 text-green-700 dark:text-green-300" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Section */}
            <Card>
              <CardHeader>
                <CardTitle>Newsletter</CardTitle>
                <CardDescription>
                  Subscribe to get weekly sustainability tips and updates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input type="email" placeholder="Your email address" className="flex-1" />
                  <Button className="bg-green-600 hover:bg-green-700">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  No spam, unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24-48 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <select id="subject" className="w-full px-3 py-2 border rounded-md bg-background">
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="idea">Share an Idea</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="press">Press/Media Inquiry</option>
                      <option value="feedback">Feedback/Suggestion</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your question or message in detail..."
                      rows={6}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="privacy" className="rounded border-gray-300" />
                    <Label htmlFor="privacy" className="text-sm font-normal">
                      I agree to the <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link> and consent to being contacted.
                    </Label>
                  </div>

                  <Button type="submit" className="w-full md:w-auto bg-green-600 hover:bg-green-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Required fields. By submitting this form, you agree to our terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section - Static/Dummy */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
              <CardDescription>
                Visit our headquarters in the heart of the Eco District.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-64 md:h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    123 Green Street, Eco District, San Francisco, CA 94105
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    📍 Interactive map would be embedded here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does it take to get a response?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We typically respond within 24-48 hours during business days. For urgent matters, please call our support line.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I submit an idea through this form?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! Select "Share an Idea" from the subject dropdown and tell us about your sustainability solution.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you accept partnership inquiries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we're always looking for partners in sustainability. Please reach out with "Partnership Opportunity" as your subject.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a phone number for technical support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, our technical support line is +1 (555) 123-4568, available Monday-Friday, 9am-6pm PST.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}