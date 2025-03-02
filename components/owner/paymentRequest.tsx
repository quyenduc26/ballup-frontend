import { Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

interface PaymentRequest {
    id: string;
    playingSlot: string;
    creator: string;
    amount: number;
    fromTime: string;
    toTime: string;
    createdAt: string;
}

const subFields: PaymentRequest[] = [
    { id: "1", playingSlot: "Winwin Field - Slot 1", creator: "John Doe", amount: 100000, fromTime: "10:30AM", toTime: "12:00PM", createdAt: "Mar 1, 2023" },
    { id: "2", playingSlot: "Winwin Field - Slot 2", creator: "Alice Smith", amount: 300000, fromTime: "7:00PM", toTime: "8:30PM", createdAt: "Jan 26, 2023" },
    { id: "3", playingSlot: "Winwin Field - Slot 3", creator: "Bob Johnson", amount: 150000, fromTime: "8:00AM", toTime: "9:30AM", createdAt: "Feb 12, 2023" },
    { id: "4", playingSlot: "Winwin Field - Slot 4", creator: "David Brown", amount: 500000, fromTime: "5:00AM", toTime: "6:30AM", createdAt: "Feb 12, 2023" },
];

export default function PaymentTable() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Management Payment Request</h1>
            <Card className="p-4">
                <Table>
                    {/* Table Header */}
                    <TableHeader>
                        <TableColumn>Booking ID</TableColumn>
                        <TableColumn>Amount</TableColumn>
                        <TableColumn>Creator</TableColumn>
                        <TableColumn className="text-center">Action</TableColumn>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody>
                        {subFields.map((sub) => (
                            <TableRow key={sub.id}>
                                <TableCell>{sub.id}</TableCell>
                                <TableCell>{sub.amount.toLocaleString()} VND</TableCell>
                                <TableCell>{sub.creator}</TableCell>
                                <TableCell className="flex items-center justify-center min-w-[150px]">
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                            Confirm
                                        </button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                            Reject
                                        </button>
                                    </div>
                                </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
