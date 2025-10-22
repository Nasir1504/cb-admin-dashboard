import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { CustomersTable } from "./customersTable";

export const metadata: Metadata = {
    title: "Customers | My App",
    description: "Customers page with table",
};

// Updated customer data interface
interface Customer {
    id: number;
    name: string;
    emailSubscription: 'subscribed' | 'unsubscribed';
    location: string;
    orders: number;
    amountSpent: number;
}

// Dummy customer data
const rows: Customer[] = [
    {
        id: 1,
        name: "Alice Johnson",
        emailSubscription: "subscribed",
        location: "New York, USA",
        orders: 12,
        amountSpent: 1240.50,
    },
    {
        id: 2,
        name: "Bob Smith",
        emailSubscription: "unsubscribed",
        location: "Toronto, Canada",
        orders: 5,
        amountSpent: 540.00,
    },
    {
        id: 3,
        name: "Charlie Davis",
        emailSubscription: "subscribed",
        location: "London, UK",
        orders: 9,
        amountSpent: 880.25,
    },
    {
        id: 4,
        name: "Diana Prince",
        emailSubscription: "subscribed",
        location: "Berlin, Germany",
        orders: 22,
        amountSpent: 2040.99,
    },
    {
        id: 5,
        name: "Edward Norton",
        emailSubscription: "unsubscribed",
        location: "Sydney, Australia",
        orders: 3,
        amountSpent: 300.00,
    },
    {
        id: 6,
        name: "Fatima Khan",
        emailSubscription: "subscribed",
        location: "Dubai, UAE",
        orders: 17,
        amountSpent: 1590.10,
    },
    {
        id: 7,
        name: "George Taylor",
        emailSubscription: "unsubscribed",
        location: "Paris, France",
        orders: 6,
        amountSpent: 610.40,
    },
];

export default function CustomersPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="customers" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <CustomersTable rows={rows} />
            </div>
        </div>
    );
}
