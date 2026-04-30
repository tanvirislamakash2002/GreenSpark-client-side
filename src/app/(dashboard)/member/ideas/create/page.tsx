import { Suspense } from 'react';
import { CreateIdeaForm } from './components/CreateIdeaForm';
import { FormSkeleton } from './components/FormSkeleton';

export const metadata = {
    title: 'Create New Idea - GreenSpark',
    description: 'Share your sustainability idea with the community',
};

export default function CreateIdeaPage() {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Share Your Sustainability Idea</h1>
                <p className="text-muted-foreground">
                    Describe your eco-friendly solution and help make a difference
                </p>
            </div>
            
            <Suspense fallback={<FormSkeleton />}>
                <CreateIdeaForm />
            </Suspense>
        </div>
    );
}