// app/terms/page.tsx
import { FileText, Scale, UserCheck, Shield, AlertCircle, Clock, Mail, Lock, CreditCard, Users, BookOpen, Gavel } from "lucide-react";
import Link from "next/link";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
      {/* Hero Section */}
      <section className="relative bg-green-700 dark:bg-green-900 text-white py-16">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-green-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
          <p className="text-lg max-w-2xl mx-auto text-green-100">
            Please read these terms carefully before using GreenSpark.
          </p>
          <p className="text-sm text-green-200 mt-4">Effective Date: January 1, 2025</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Table of Contents */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <Link href="#acceptance" className="text-green-600 hover:underline">1. Acceptance of Terms</Link>
            <Link href="#eligibility" className="text-green-600 hover:underline">2. Eligibility</Link>
            <Link href="#account" className="text-green-600 hover:underline">3. Account Registration</Link>
            <Link href="#ideas" className="text-green-600 hover:underline">4. User-Generated Content (Ideas)</Link>
            <Link href="#conduct" className="text-green-600 hover:underline">5. Prohibited Conduct</Link>
            <Link href="#payments" className="text-green-600 hover:underline">6. Paid Ideas & Payments</Link>
            <Link href="#voting" className="text-green-600 hover:underline">7. Voting & Comments</Link>
            <Link href="#intellectual" className="text-green-600 hover:underline">8. Intellectual Property</Link>
            <Link href="#termination" className="text-green-600 hover:underline">9. Termination</Link>
            <Link href="#disclaimers" className="text-green-600 hover:underline">10. Disclaimers</Link>
            <Link href="#liability" className="text-green-600 hover:underline">11. Limitation of Liability</Link>
            <Link href="#indemnification" className="text-green-600 hover:underline">12. Indemnification</Link>
            <Link href="#changes" className="text-green-600 hover:underline">13. Changes to Terms</Link>
            <Link href="#governing" className="text-green-600 hover:underline">14. Governing Law</Link>
            <Link href="#contact" className="text-green-600 hover:underline">15. Contact Information</Link>
          </div>
        </div>

        {/* Section 1 - Acceptance */}
        <div id="acceptance" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              By accessing or using GreenSpark ("the Platform," "we," "our," or "us"), you agree to be bound by these 
              Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Platform.
            </p>
            <p className="text-muted-foreground mt-4">
              These Terms constitute a legally binding agreement between you and GreenSpark. By using the Platform, 
              you represent that you have the legal capacity to enter into this agreement.
            </p>
          </div>
        </div>

        {/* Section 2 - Eligibility */}
        <div id="eligibility" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">2. Eligibility</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              To use GreenSpark, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Be at least 13 years of age (or 16 in certain jurisdictions)</li>
              <li>Have the legal capacity to enter into a binding agreement</li>
              <li>Not be prohibited from using the Platform under applicable laws</li>
              <li>Provide accurate and complete registration information</li>
              <li>Not have previously been suspended or removed from the Platform</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              By using GreenSpark, you confirm that you meet these eligibility requirements. We reserve the right to 
              refuse service to anyone for any reason at any time.
            </p>
          </div>
        </div>

        {/* Section 3 - Account Registration */}
        <div id="account" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">3. Account Registration</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your password and account</li>
              <li>Notify us immediately of any unauthorized account access</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Not share your account credentials with others</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We reserve the right to suspend or terminate accounts that violate these Terms or that remain inactive for 
              extended periods (12+ months).
            </p>
          </div>
        </div>

        {/* Section 4 - User-Generated Content */}
        <div id="ideas" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">4. User-Generated Content (Ideas)</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">
              You retain ownership of the ideas, comments, and content you submit ("User Content"). By submitting 
              User Content, you grant GreenSpark a non-exclusive, royalty-free, worldwide license to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Display, publish, and share your ideas on the Platform</li>
              <li>Allow other users to view, vote on, and comment on your ideas</li>
              <li>Use your content for promotional purposes (with attribution)</li>
              <li>Moderate or remove content that violates these Terms</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You represent that your User Content does not infringe on any third-party rights, including copyright, 
              trademark, privacy, or other personal or proprietary rights.
            </p>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-md">
              <p className="text-sm">
                <strong>Idea Review Process:</strong> Submitted ideas are reviewed by administrators and may be approved, 
                rejected, or marked as draft. Only approved ideas are publicly visible.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 - Prohibited Conduct */}
        <div id="conduct" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">5. Prohibited Conduct</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Submit false, misleading, or fraudulent ideas</li>
              <li>Post content that is illegal, obscene, defamatory, or harassing</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Manipulate voting systems through bots or multiple accounts</li>
              <li>Attempt to gain unauthorized access to the Platform</li>
              <li>Use the Platform for any commercial solicitation without permission</li>
              <li>Reverse engineer or copy any part of the Platform</li>
              <li>Upload malware, viruses, or other harmful code</li>
              <li>Engage in spamming, scraping, or data mining</li>
              <li>Impersonate any person or entity</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Violation of these prohibitions may result in immediate account termination and legal action.
            </p>
          </div>
        </div>

        {/* Section 6 - Paid Ideas & Payments */}
        <div id="payments" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">6. Paid Ideas & Payments</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">
              Some ideas on GreenSpark are designated as "Paid Ideas." By purchasing access to a Paid Idea, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Pay the specified price using our third-party payment processor (Stripe)</li>
              <li>Provide accurate billing information</li>
              <li>Not dispute valid charges</li>
              <li>Understand that payments are non-refundable except as required by law</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              <strong>Refund Policy:</strong> Due to the digital nature of Paid Ideas, all sales are final. Refunds 
              may be considered on a case-by-case basis for technical issues preventing access.
            </p>
            <p className="text-muted-foreground mt-4">
              <strong>Creator Payments:</strong> Idea creators receive 70% of the revenue from Paid Idea purchases, 
              minus processing fees. Payments are disbursed monthly once a minimum threshold of $50 is reached.
            </p>
          </div>
        </div>

        {/* Section 7 - Voting & Comments */}
        <div id="voting" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Gavel className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">7. Voting & Comments</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">
              GreenSpark features community voting (upvote/downvote) and commenting on ideas. By participating, you agree:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>One vote per user per idea (no multiple accounts)</li>
              <li>Votes should reflect genuine assessment of idea quality</li>
              <li>Comments must be constructive and respectful</li>
              <li>We reserve the right to remove votes or comments that violate these Terms</li>
              <li>Admins may delete inappropriate comments at their discretion</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Abuse of the voting system (vote manipulation, buying votes) may result in account suspension and removal 
              of accrued votes.
            </p>
          </div>
        </div>

        {/* Section 8 - Intellectual Property */}
        <div id="intellectual" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">8. Intellectual Property</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground mb-4">
              All content on GreenSpark excluding User Content (including logos, design, code, text, graphics) is owned 
              by GreenSpark or our licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-muted-foreground mb-4">
              You may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Copy, modify, or distribute our copyrighted content without permission</li>
              <li>Use our trademarks or logos without written consent</li>
              <li>Sell, license, or commercially exploit any part of the Platform</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              If you believe your intellectual property rights have been infringed, please contact us at 
              copyright@greenspark.com with a detailed notice.
            </p>
          </div>
        </div>

        {/* Section 9 - Termination */}
        <div id="termination" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">9. Termination</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              We may suspend or terminate your account at any time for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Request by law enforcement</li>
              <li>Extended account inactivity (12+ months)</li>
              <li>Any other reason at our sole discretion</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You may terminate your account at any time by contacting support@greenspark.com. Upon termination, your 
              User Content may be removed, but public contributions may remain visible.
            </p>
          </div>
        </div>

        {/* Section 10 - Disclaimers */}
        <div id="disclaimers" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">10. Disclaimers</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              GreenSpark is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>We do not guarantee the accuracy, completeness, or usefulness of User Content</li>
              <li>We are not responsible for the success or failure of any ideas shared on the Platform</li>
              <li>We do not warrant that the Platform will be uninterrupted, error-free, or secure</li>
              <li>We are not liable for any loss or damage resulting from your reliance on Platform content</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Sustainability ideas shared on GreenSpark are for informational purposes only. Always consult appropriate 
              professionals before implementing any sustainability project.
            </p>
          </div>
        </div>

        {/* Section 11 - Limitation of Liability */}
        <div id="liability" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">11. Limitation of Liability</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, GreenSpark and its officers, directors, employees, and agents shall 
              not be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
              limitation:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Loss of profits, revenue, or data</li>
              <li>Loss of goodwill or reputation</li>
              <li>Business interruption</li>
              <li>Physical or environmental damages from implementing ideas</li>
              <li>Unauthorized access to your account</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Our total liability to you shall not exceed the amount you paid us in the past 12 months or $100, whichever is greater.
            </p>
          </div>
        </div>

        {/* Section 12 - Indemnification */}
        <div id="indemnification" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">12. Indemnification</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              You agree to indemnify, defend, and hold harmless GreenSpark and its affiliates from any claims, damages, 
              losses, liabilities, costs, or expenses (including reasonable legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Your use of the Platform</li>
              <li>Your User Content</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
            </ul>
          </div>
        </div>

        {/* Section 13 - Changes to Terms */}
        <div id="changes" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">13. Changes to Terms</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              We may modify these Terms at any time by posting the updated version on this page. We will notify you of 
              material changes via:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Email notification to registered users (30 days before effective date)</li>
              <li>Banner notice on the Platform</li>
              <li>Updating the "Effective Date" at the top of this page</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Your continued use of GreenSpark after changes become effective constitutes your acceptance of the revised Terms.
            </p>
          </div>
        </div>

        {/* Section 14 - Governing Law */}
        <div id="governing" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Gavel className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">14. Governing Law</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, 
              without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms 
              shall be brought exclusively in the federal or state courts located in San Francisco County, California.
            </p>
            <p className="text-muted-foreground mt-4">
              The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.
            </p>
          </div>
        </div>

        {/* Section 15 - Contact */}
        <div id="contact" className="scroll-mt-20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold">15. Contact Information</h2>
          </div>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Email:</strong> legal@greenspark.com</p>
              <p><strong>Support:</strong> support@greenspark.com</p>
              <p><strong>Mail:</strong> GreenSpark Legal Department, 123 Green Street, Eco District, San Francisco, CA 94105, USA</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            By using GreenSpark, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: January 1, 2025 | Version 2.0
          </p>
        </div>
      </div>
    </div>
  );
}