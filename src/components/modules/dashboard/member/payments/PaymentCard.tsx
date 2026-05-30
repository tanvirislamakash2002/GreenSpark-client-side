import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Eye, Calendar, DollarSign, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Payment } from "@/types/payment.type";
import { PaymentStatusBadge } from "./PaymentStatusBadge";

interface PaymentCardProps {
    payment: Payment;
}

export function PaymentCard({ payment }: PaymentCardProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                    {/* Idea Image */}
                    <div className="sm:w-32 h-32 bg-muted relative">
                        {payment.idea.imageUrl ? (
                            <Image
                                src={payment.idea.imageUrl}
                                alt={payment.idea.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                                <span className="text-2xl">🌿</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                                <Link 
                                    href={`/ideas/${payment.idea.id}`}
                                    className="font-semibold text-lg hover:text-green-600 transition-colors"
                                >
                                    {payment.idea.title}
                                </Link>
                                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {formatDate(payment.paidAt || payment.createdAt)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CreditCard className="h-3 w-3" />
                                        {payment.paymentMethod}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <PaymentStatusBadge status={payment.status} />
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-green-600" />
                                <span className="text-xl font-bold">${payment.amount.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex gap-2">
                                {payment.receiptUrl && (
                                    <Button asChild variant="outline" size="sm">
                                        <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4 mr-1" />
                                            Receipt
                                        </a>
                                    </Button>
                                )}
                                <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                                    <Link href={`/ideas/${payment.idea.id}`}>
                                        <Eye className="h-4 w-4 mr-1" />
                                        View Idea
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}