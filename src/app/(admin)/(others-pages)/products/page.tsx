import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { ProductsTable } from "./ProductsTable";

export const metadata: Metadata = {
    title: "Collections | My App",
    description: "Collections Page with table",
};

// Updated interface
interface Data {
    id: number;
    product: string;
    status: 'active' | 'inactive';
    inventory: number;
    category: string;
    channel: string;
    catalog: string;
}

// Dummy data generator
function createData(
    id: number,
    product: string,
    status: 'active' | 'inactive',
    inventory: number,
    category: string,
    channel: string,
    catalog: string
): Data {
    return { id, product, status, inventory, category, channel, catalog };
}

// Example dataset
const rows: Data[] = [
    createData(1, 'T-shirt', 'active', 120, 'Apparel', 'Online', 'Fall 2025'),
    createData(2, 'Sneakers', 'inactive', 45, 'Footwear', 'Retail', 'Summer 2025'),
    createData(3, 'Backpack', 'active', 60, 'Accessories', 'Online', 'Winter 2025'),
    createData(4, 'Jeans', 'active', 85, 'Apparel', 'Retail', 'Spring 2025'),
    createData(5, 'Sunglasses', 'inactive', 30, 'Accessories', 'Online', 'Summer 2025'),
    createData(6, 'Hoodie', 'active', 50, 'Apparel', 'Online', 'Fall 2025'),
    createData(7, 'Sandals', 'inactive', 22, 'Footwear', 'Retail', 'Summer 2025'),
    createData(8, 'Hat', 'active', 40, 'Accessories', 'Retail', 'Winter 2025'),
    createData(9, 'Socks', 'active', 300, 'Apparel', 'Online', 'Spring 2025'),
    createData(10, 'Watch', 'inactive', 15, 'Accessories', 'Retail', 'Holiday 2025'),
    createData(11, 'Scarf', 'active', 100, 'Accessories', 'Online', 'Winter 2025'),
    createData(12, 'Boots', 'active', 80, 'Footwear', 'Retail', 'Fall 2025'),
    createData(13, 'Gloves', 'inactive', 25, 'Accessories', 'Online', 'Winter 2025'),
    createData(14, 'Belt', 'active', 70, 'Accessories', 'Retail', 'Spring 2025'),
    createData(15, 'Polo Shirt', 'inactive', 55, 'Apparel', 'Online', 'Summer 2025'),
    createData(16, 'Blazer', 'active', 35, 'Apparel', 'Retail', 'Fall 2025'),
    createData(17, 'Leggings', 'active', 95, 'Apparel', 'Online', 'Spring 2025'),
    createData(18, 'Cap', 'inactive', 20, 'Accessories', 'Retail', 'Summer 2025'),
    createData(19, 'Sports Shoes', 'active', 65, 'Footwear', 'Online', 'Winter 2025'),
    createData(20, 'Jacket', 'inactive', 42, 'Apparel', 'Retail', 'Fall 2025'),
    createData(21, 'Tank Top', 'active', 110, 'Apparel', 'Online', 'Spring 2025'),
    createData(22, 'Loafers', 'inactive', 33, 'Footwear', 'Retail', 'Summer 2025'),
    createData(23, 'Raincoat', 'active', 48, 'Apparel', 'Online', 'Monsoon 2025'),
    createData(24, 'Necklace', 'inactive', 27, 'Accessories', 'Retail', 'Holiday 2025'),
    createData(25, 'Dress', 'active', 75, 'Apparel', 'Online', 'Spring 2025'),
];


export default function AllProductsPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="all-products" />
            <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                <ProductsTable rows={rows} />
            </div>
        </div>
    );
}
