import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AdminIdeaFeedbackProps {
    feedback: string | null;
}

export function AdminIdeaFeedback({ feedback }: AdminIdeaFeedbackProps) {
    if (!feedback) return null;

    return (
        <Alert className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800 dark:text-amber-400">
                Rejection Feedback
            </AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-500 whitespace-pre-wrap">
                {feedback}
            </AlertDescription>
        </Alert>
    );
}