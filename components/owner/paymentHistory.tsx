import { Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

interface SubPayment {
    id: string;
    name: string;
    date: string;
    time: string;
    amount: number;
}

const subFields: SubPayment[] = [
    { id: "1", name: "Winwin Field", date: "Mar 1, 2023", time: "10:30AM", amount: 100 },
    { id: "2", name: "Winwin Field", date: "Jan 26, 2023", time: "7:00PM", amount: 300 },
    { id: "3", name: "Winwin Field", date: "Feb 12, 2033", time: "8:00AM", amount: 100 },
    { id: "4", name: "Winwin Field", date: "Feb 12, 2033", time: "5:00AM", amount: 500 },
];

export default function PaymentTable() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Management Payment History</h1>
            <Card className="p-4">
                <Table>
                    {/* Table Header */}
                    <TableHeader>
                        <TableColumn>Field Name</TableColumn>
                        <TableColumn>Field Number</TableColumn>
                        <TableColumn>User</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Time</TableColumn>
                        <TableColumn>Amount</TableColumn>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody>
                        {subFields.map((sub, index) => (
                            <TableRow key={sub.id}>
                                <TableCell>{sub.name}</TableCell>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>-</TableCell> 
                                <TableCell>{sub.date}</TableCell>
                                <TableCell>{sub.time}</TableCell>
                                <TableCell>{sub.amount.toLocaleString()} VND</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
