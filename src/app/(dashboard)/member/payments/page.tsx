import { notFound } from "next/navigation";
import { getSession } from "@/actions/auth.action";
import { getUserPayments } from "@/actions/payment.action";
import { PaymentHistoryHeader } from "@/components/modules/dashboard/member/payments/PaymentHistoryHeader";
import { PaymentList } from "@/components/modules/dashboard/member/payments/PaymentList";
import { PaymentPagination } from "@/components/modules/dashboard/member/payments/PaymentPagination";

interface PaymentsPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

async function PaymentsContent({ searchParams }: { searchParams: Awaited<PaymentsPageProps['searchParams']> }) {
    const session = await getSession();
    
    if (!session?.data?.user) {
        notFound();
    }

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const limit = 10;

    const result = await getUserPayments(page, limit);

    if (!result.success || !result.data) {
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-semibold mb-2">Unable to load payment history</h2>
                <p className="text-muted-foreground">{result.message || "Please try again later"}</p>
            </div>
        );
    }

    const { payments, pagination } = result.data;
    
    // Calculate total spent
    const totalSpent = payments.reduce((sum, payment) => {
        if (payment.status === "COMPLETED") {
            return sum + payment.amount;
        }
        return sum;
    }, 0);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <PaymentHistoryHeader 
                totalItems={pagination.totalItems} 
                totalSpent={totalSpent}
            />
            <PaymentList payments={payments} />
            <PaymentPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
            />
        </div>
    );
}

export default async function PaymentsPage({ searchParams }: PaymentsPageProps) {
    const resolvedParams = await searchParams;
    
    return (
            <PaymentsContent searchParams={resolvedParams} />
    );
}