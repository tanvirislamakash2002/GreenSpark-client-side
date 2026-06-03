// app/privacy/page.tsx
import { Shield, Eye, Database, Cookie, Mail, Lock, Globe, Clock } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
      {/* Hero Section */}
      <section className="relative bg-green-700 dark:bg-green-900 text-white py-16">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-green-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg max-w-2xl mx-auto text-green-100">
            Your privacy matters. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-green-200 mt-4">Last Updated: January 1, 2025</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Table of Contents */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <Link href="#information" className="text-green-600 hover:underline">1. Information We Collect</Link>
            <Link href="#usage" className="text-green-600 hover:underline">2. How We Use Your Information</Link>
            <Link href="#sharing" className="text-green-600 hover:underline">3. Information Sharing</Link>
            <Link href="#cookies" className="text-green-600 hover:underline">4. Cookies & Tracking</Link>
            <Link href="#security" className="text-green-600 hover:underline">5. Data Security</Link>
            <Link href="#rights" className="text-green-600 hover:underline">6. Your Rights</Link>
            <Link href="#children" className="text-green-600 hover:underline">7. Children's Privacy</Link>
            <Link href="#international" className="text-green-600 hover:underline">8. International Users</Link>
            <Link href="#changes" className="text-green-600 hover:underline">9. Changes to This Policy</Link>
            <Link href="#contact" className="text-green-600 hover:underline">10. Contact Us</Link>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-green dark:prose-invert max-w-none mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to GreenSpark ("we," "our," or "us"). We are committed to protecting your personal information 
            and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
            your information when you use our website and services.
          </p>
          <p className="text-muted-foreground mt-4">
            By using GreenSpark, you consent to the data practices described in this policy. If you do not agree 
            with any part of this policy, please do not use our services.
          </p>
        </div>

        {/* Section 1 - Information We Collect */}
        <div id="information" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-semibold mb-3">Personal Information You Provide:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Name, email address, and password when you create an account</li>
              <li>Profile information such as bio, location, and profile picture</li>
              <li>Sustainability ideas, comments, votes, and bookmarks you submit</li>
              <li>Payment information when purchasing paid ideas (processed securely by Stripe)</li>
              <li>Communication preferences and newsletter subscriptions</li>
              <li>Correspondence when you contact our support team</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">Information Collected Automatically:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>IP address, browser type, device information, and operating system</li>
              <li>Pages visited, time spent, and navigation patterns</li>
              <li>Idea views, votes, and interaction data</li>
              <li>Referring URLs and search terms</li>
              <li>Location data (approximate, based on IP address)</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-3">Information from Third Parties:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Google OAuth data (if you sign in with Google)</li>
              <li>Stripe payment information (we only receive payment confirmation, not full card details)</li>
            </ul>
          </div>
        </div>

        {/* Section 2 - How We Use Your Information */}
        <div id="usage" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Create and manage your account</li>
              <li>Allow you to submit, edit, and delete sustainability ideas</li>
              <li>Process votes and comments on ideas</li>
              <li>Process payments for paid ideas</li>
              <li>Send you notifications about idea approvals, comments, and votes</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Improve our platform and user experience</li>
              <li>Analyze usage patterns and trends</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </div>

        {/* Section 3 - Information Sharing */}
        <div id="sharing" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">3. Information Sharing</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Public Information:</strong> Your name, profile picture, and submitted ideas are visible to other users.</li>
              <li><strong>Service Providers:</strong> We use trusted third-party services (Vercel, Stripe, Prisma) that process data on our behalf.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4 bg-muted p-3 rounded-md">
              <strong>Note:</strong> Your email address is never publicly displayed. Only administrators can see email addresses for moderation purposes.
            </p>
          </div>
        </div>

        {/* Section 4 - Cookies */}
        <div id="cookies" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">4. Cookies & Tracking</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">We use cookies and similar tracking technologies to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Keep you logged in and maintain your session</li>
              <li>Remember your preferences and settings</li>
              <li>Analyze site traffic and usage patterns</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You can control cookies through your browser settings. However, disabling cookies may affect your ability 
              to use certain features of our platform.
            </p>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Cookie Types We Use:</strong> Essential (required for functionality), Preference (remember settings), 
                Analytics (track usage), and Security (CSRF protection).
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 - Data Security */}
        <div id="security" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">5. Data Security</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>All data transmitted via HTTPS/SSL encryption</li>
              <li>Passwords hashed using bcrypt (no plaintext storage)</li>
              <li>Regular security updates and vulnerability scanning</li>
              <li>Access controls and authentication for administrators</li>
              <li>Secure database connections with encryption at rest</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              While we strive to protect your information, no method of transmission over the Internet is 100% secure. 
              We cannot guarantee absolute security.
            </p>
          </div>
        </div>

        {/* Section 6 - Your Rights */}
        <div id="rights" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">6. Your Rights</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Objection:</strong> Opt-out of certain data processing</li>
              <li><strong>Withdraw Consent:</strong> Unsubscribe from newsletters anytime</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us at <strong>privacy@greenspark.com</strong>. We will respond within 30 days.
            </p>
          </div>
        </div>

        {/* Section 7 - Children's Privacy */}
        <div id="children" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">7. Children's Privacy</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              GreenSpark is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If we discover that a child under 13 has provided us with personal 
              information, we will delete it immediately. Parents or guardians who believe their child has submitted 
              information should contact us.
            </p>
          </div>
        </div>

        {/* Section 8 - International Users */}
        <div id="international" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">8. International Users</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              Your information may be transferred to and processed in countries other than your own. Our servers are 
              located in the United States. By using GreenSpark, you consent to the transfer of your data to the United 
              States, which may have different data protection laws than your country.
            </p>
            <p className="text-muted-foreground mt-4">
              For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). 
              For California residents, we comply with the California Consumer Privacy Act (CCPA).
            </p>
          </div>
        </div>

        {/* Section 9 - Changes */}
        <div id="changes" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">9. Changes to This Policy</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Posting the updated policy on this page</li>
              <li>Sending an email notification to registered users</li>
              <li>Displaying a banner on the website</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              The "Last Updated" date at the top of this page indicates when changes were made. Continued use of 
              GreenSpark after changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>

        {/* Section 10 - Contact */}
        <div id="contact" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">10. Contact Us</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Email:</strong> privacy@greenspark.com</p>
              <p><strong>Data Protection Officer:</strong> dpo@greenspark.com</p>
              <p><strong>Mail:</strong> GreenSpark Privacy Team, 123 Green Street, Eco District, San Francisco, CA 94105, USA</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567 (Ask for Privacy Team)</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            This Privacy Policy is effective as of January 1, 2025. By using GreenSpark, you acknowledge 
            that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}