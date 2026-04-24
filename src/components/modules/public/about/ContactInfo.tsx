import { Mail, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ContactInfo() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground mb-8">
                        Have questions, suggestions, or just want to say hello? We'd love to hear from you.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Button asChild variant="outline" className="gap-2">
                            <Link href="mailto:hello@greenspark.com">
                                <Mail className="w-4 h-4" />
                                hello@greenspark.com
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="gap-2">
                            <Link href="/contact">
                                <MessageCircle className="w-4 h-4" />
                                Contact Form
                            </Link>
                        </Button>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                        <Link href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
                            <Twitter className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </Link>
                        <Link href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
                            <Instagram className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}