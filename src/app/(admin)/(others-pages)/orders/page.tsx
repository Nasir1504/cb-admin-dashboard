import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { OrderTable } from "./OrderTable";
import { generateOrders } from "./ordersData";
export const metadata: Metadata = {
  title: "Orders Page",
  description: "This is Orders Page",
};

const orders = [...generateOrders(85)];


export default function OrdersPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Orders Page" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <OrderTable orders={orders} itemsPerPage={20} />
      </div>
    </div>
  );
}
