"use client";

import { useState } from "react";
import { Send, Mail, Eye, Calendar, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sendNewsletter, sendTestEmail } from "@/actions/newsletter/admin-newsletter.action";
import { toast } from "sonner";

export function ComposeNewsletter() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [sendTo, setSendTo] = useState("all");
    const [isSending, setIsSending] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [testEmail, setTestEmail] = useState("");
    const [showTestDialog, setShowTestDialog] = useState(false);

    const handleSend = async () => {
        if (!subject.trim()) {
            toast.error("Please enter a subject");
            return;
        }
        if (!content.trim()) {
            toast.error("Please enter email content");
            return;
        }

        setIsSending(true);
        const result = await sendNewsletter({
            subject,
            content,
            sendTo: sendTo as any,
        });

        if (result.success) {
            toast.success(result.message || "Newsletter sent successfully");
            setSubject("");
            setContent("");
        } else {
            toast.error(result.message || "Failed to send newsletter");
        }
        setIsSending(false);
    };

    const handleTestSend = async () => {
        if (!testEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
            toast.error("Please enter a valid test email");
            return;
        }
        if (!subject.trim()) {
            toast.error("Please enter a subject");
            return;
        }
        if (!content.trim()) {
            toast.error("Please enter email content");
            return;
        }

        setIsTesting(true);
        const result = await sendTestEmail(testEmail, subject, content);
        if (result.success) {
            toast.success(`Test email sent to ${testEmail}`);
            setShowTestDialog(false);
            setTestEmail("");
        } else {
            toast.error(result.message || "Failed to send test email");
        }
        setIsTesting(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Compose Newsletter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                        id="subject"
                        placeholder="Enter email subject..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sendTo">Send To</Label>
                    <Select value={sendTo} onValueChange={setSendTo}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select recipients" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Subscribers</SelectItem>
                            <SelectItem value="active">Active Subscribers Only</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Email Content</Label>
                    <Textarea
                        id="content"
                        placeholder="Write your newsletter content here..."
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                        Supports plain text. HTML formatting will be added automatically.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                        onClick={() => setShowTestDialog(true)}
                        variant="outline"
                        disabled={isSending}
                    >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Test
                    </Button>
                    <Button
                        onClick={handleSend}
                        disabled={isSending || !subject || !content}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isSending ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4 mr-2" />
                        )}
                        Send Newsletter
                    </Button>
                </div>
            </CardContent>

            {/* Test Email Dialog */}
            {showTestDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Send Test Email</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Test Email Address</Label>
                                <Input
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={testEmail}
                                    onChange={(e) => setTestEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3 justify-end">
                                <Button variant="outline" onClick={() => setShowTestDialog(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleTestSend} disabled={isTesting}>
                                    {isTesting ? "Sending..." : "Send Test"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}