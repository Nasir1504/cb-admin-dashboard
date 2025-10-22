import * as React from 'react';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { InventoryTable } from "./InventoryTable"; // ensure this export is correct

export const metadata: Metadata = {
    title: "Inventory | My App",
    description: "Inventory Page with table",
};

interface Data {
    id: number;
    product: string;
    SKU: number;
    unavailable: number;
    committed: number;
    available: number;
    onHand: number;
}

function createData(
    id: number,
    product: string,
    SKU: number,
    unavailable: number,
    committed: number,
    available: number,
): Data {
    return {
        id,
        product,
        SKU,
        unavailable,
        committed,
        available,
        onHand: committed + available - unavailable,
    };
}

const initialRows: Data[] = [
    createData(1, 'Product A', 1001, 2, 10, 8),
    createData(2, 'Product B', 1002, 1, 5, 4),
    createData(3, 'Product C', 1003, 3, 7, 6),
    createData(4, 'Product D', 1004, 2, 8, 5),
    createData(5, 'Product E', 1005, 0, 9, 10),
    createData(6, 'Product F', 1006, 4, 3, 7),
    createData(7, 'Product G', 1007, 1, 6, 4),
    createData(8, 'Product H', 1008, 2, 10, 8),
    createData(9, 'Product I', 1009, 1, 5, 4),
    createData(10, 'Product J', 1010, 3, 7, 6),
    createData(11, 'Product K', 1011, 2, 8, 5),
    createData(12, 'Product L', 1012, 0, 9, 10),
    createData(13, 'Product M', 1013, 4, 3, 7),
    createData(14, 'Product N', 1014, 1, 6, 4),
    createData(15, 'Product O', 1015, 2, 10, 8),
    createData(16, 'Product P', 1016, 1, 5, 4),
    createData(17, 'Product Q', 1017, 3, 7, 6),
    createData(18, 'Product R', 1018, 2, 8, 5),
    createData(19, 'Product S', 1019, 0, 9, 10),
    createData(20, 'Product T', 1020, 4, 3, 7),
    createData(21, 'Product U', 1021, 1, 6, 4),
];

export default function CollectionsPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Collections" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <InventoryTable rows={initialRows} />
            </div>
        </div>
    );
}
