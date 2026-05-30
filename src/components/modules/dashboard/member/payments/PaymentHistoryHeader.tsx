interface PaymentHistoryHeaderProps {
    totalItems: number;
    totalSpent?: number;
}

export function PaymentHistoryHeader({ totalItems, totalSpent }: PaymentHistoryHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Payment History</h1>
            <p className="text-muted-foreground">
                Track all your purchases and access paid ideas
            </p>
            <div className="flex gap-4 mt-4">
                <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Total Purchases</p>
                    <p className="text-2xl font-bold">{totalItems}</p>
                </div>
                {totalSpent !== undefined && (
                    <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Total Spent</p>
                        <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}