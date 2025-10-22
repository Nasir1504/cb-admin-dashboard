import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { SegmentsTable } from "./SegmentsTable";

export const metadata: Metadata = {
    title: "Segments | My App",
    description: "Segments page with table",
};

interface Data {
    id: number;
    name: string;
    percentOfCustomers: number;
    lastActivity: string;
}
// Dummy data for the new table
const rows: Data[] = [
    { id: 1, name: "Alice Johnson", percentOfCustomers: 12.5, lastActivity: "2025‑10‑21 14:35" },
    { id: 2, name: "Bob Smith", percentOfCustomers: 8.0, lastActivity: "2025‑10‑20 11:22" },
    { id: 3, name: "Charlie Davis", percentOfCustomers: 9.8, lastActivity: "2025‑10‑19 17:05" },
    { id: 4, name: "Diana Prince", percentOfCustomers: 18.0, lastActivity: "2025‑10‑18 09:50" },
    { id: 5, name: "Edward Norton", percentOfCustomers: 3.2, lastActivity: "2025‑10‑17 21:13" },
    { id: 6, name: "Fatima Khan", percentOfCustomers: 14.7, lastActivity: "2025‑10‑16 08:45" },
    { id: 7, name: "George Taylor", percentOfCustomers: 6.5, lastActivity: "2025‑10‑15 16:29" },
];


export default function SegmentsPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Customers" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <SegmentsTable rows={rows} />
            </div>
        </div>
    );
}