'use client'
import React, { useState, useEffect } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export interface Order {
  order: string;
  date: string;            // ISO string or “YYYY‑MM‑DD”
  customer: string;
  channel: string;
  total: number;
  paymentStatus: string;
  fulfillment: string;
  items: string;
  deliveryStatus: string;
  destination: string;
  deliveryMethod: string;
}

/** Sort direction: ascending (asc) or descending (desc) or none */
type SortDir = "asc" | "desc" | null;

interface Props {
  orders: Order[];
  itemsPerPage?: number;
}

export const OrderTable: React.FC<Props> = ({
  orders,
  itemsPerPage = 20,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Selection state
  const [selectedOrderKeys, setSelectedOrderKeys] = useState<Set<string>>(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [showAllSelectedToggle, setShowAllSelectedToggle] = useState(false);

  // Sorting state
  const [sortField, setSortField] = useState<keyof Order | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  // Compute filtered (by selection toggle) list
  const filteredOrders = showAllSelectedToggle
    ? orders.filter((o) => selectedOrderKeys.has(o.order))
    : orders;

  // Compute sorted list
  const sortedOrders = React.useMemo(() => {
    if (!sortField || !sortDir) {
      return filteredOrders;
    }
    const sorted = [...filteredOrders].sort((a, b) => {
      const va = a[sortField];
      const vb = b[sortField];
      // We need to compare depending on type
      if (va == null || vb == null) return 0;

      // If it's number
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }
      // For strings (dates or text)
      const sa = String(va);
      const sb = String(vb);
      // For date strings in ISO format, comparison works lexicographically
      if (sa < sb) return sortDir === "asc" ? -1 : 1;
      if (sa > sb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredOrders, sortField, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedOrders.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [sortedOrders.length, totalPages]);

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update “select all visible” checkbox
  useEffect(() => {
    const allVisibleSelected =
      paginatedOrders.length > 0 &&
      paginatedOrders.every((o) => selectedOrderKeys.has(o.order));
    setSelectAllChecked(allVisibleSelected);
  }, [paginatedOrders, selectedOrderKeys]);

  // Handlers
  const toggleSelectAll = () => {
    const newSet = new Set(selectedOrderKeys);
    if (selectAllChecked) {
      paginatedOrders.forEach((o) => newSet.delete(o.order));
    } else {
      paginatedOrders.forEach((o) => newSet.add(o.order));
    }
    setSelectedOrderKeys(newSet);
  };

  const toggleSelectOne = (orderKey: string) => {
    const newSet = new Set(selectedOrderKeys);
    if (newSet.has(orderKey)) {
      newSet.delete(orderKey);
    } else {
      newSet.add(orderKey);
    }
    setSelectedOrderKeys(newSet);
  };

  const changeSort = (field: keyof Order) => {
    if (sortField === field) {
      // Toggle direction
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") setSortDir(null);
      else setSortDir("asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    // After changing sort, reset to page 1
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  // Render sort icon next to header if this column is being sorted
  const renderSortIcon = (field: keyof Order) => {
    if (sortField !== field) {
      return <ChevronUpIcon className="w-4 h-4 opacity-20" />; // light icon to indicate sortable
    }
    if (sortDir === "asc") {
      return <ChevronUpIcon className="w-4 h-4 text-gray-600" />;
    }
    if (sortDir === "desc") {
      return <ChevronDownIcon className="w-4 h-4 text-gray-600" />;
    }
    return <ChevronUpIcon className="w-4 h-4 opacity-20" />;
  };

  return (
    <div className="flex flex-col">
      {/* Toggle show all selected */}
      <div className="mb-2 flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <span>Show All Selected</span>
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5"
            checked={showAllSelectedToggle}
            onChange={() => setShowAllSelectedToggle((prev) => !prev)}
            disabled={selectedOrderKeys.size === 0 && !showAllSelectedToggle}
          />
        </label>
        <span className="text-sm text-gray-600">
          {showAllSelectedToggle
            ? `Showing ${selectedOrderKeys.size} selected`
            : `Showing all ${orders.length}`}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-[0.85rem]">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white z-30 px-4 py-2 border">
                <input
                  type="checkbox"
                  checked={selectAllChecked}
                  onChange={toggleSelectAll}
                  disabled={paginatedOrders.length === 0}
                />
              </th>
              <th
                className="sticky left-[45px] bg-white z-20 min-w-[150px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("order")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Order</span>
                  {renderSortIcon("order")}
                </div>
              </th>

              <th
                className="min-w-[120px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("date")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Date</span>
                  {renderSortIcon("date")}
                </div>
              </th>

              <th
                className="min-w-[150px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("customer")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Customer</span>
                  {renderSortIcon("customer")}
                </div>
              </th>

              <th
                className="min-w-[120px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("channel")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Channel</span>
                  {renderSortIcon("channel")}
                </div>
              </th>

              <th
                className="min-w-[100px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("total")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Total</span>
                  {renderSortIcon("total")}
                </div>
              </th>

              <th
                className="min-w-[140px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("paymentStatus")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Payment Status</span>
                  {renderSortIcon("paymentStatus")}
                </div>
              </th>

              <th
                className="min-w-[140px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("fulfillment")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Fulfillment</span>
                  {renderSortIcon("fulfillment")}
                </div>
              </th>

              <th
                className="min-w-[200px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("items")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Items</span>
                  {renderSortIcon("items")}
                </div>
              </th>

              <th
                className="min-w-[140px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("deliveryStatus")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Delivery Status</span>
                  {renderSortIcon("deliveryStatus")}
                </div>
              </th>

              <th
                className="min-w-[160px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("destination")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Destination</span>
                  {renderSortIcon("destination")}
                </div>
              </th>

              <th
                className="min-w-[160px] px-4 py-2 text-left border cursor-pointer"
                onClick={() => changeSort("deliveryMethod")}
              >
                <div className="inline-flex items-center space-x-1">
                  <span>Delivery Method</span>
                  {renderSortIcon("deliveryMethod")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((o, idx) => (
              <tr key={`${o.order}-${idx}`} className="even:bg-gray-50">
                <td className="sticky left-0 bg-white z-20 px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={selectedOrderKeys.has(o.order)}
                    onChange={() => toggleSelectOne(o.order)}
                  />
                </td>
                <td className="sticky left-[45px] bg-white z-10 px-4 py-2 border">
                  {o.order}
                </td>
                <td className="px-4 py-2 border">{o.date}</td>
                <td className="px-4 py-2 border">{o.customer}</td>
                <td className="px-4 py-2 border">{o.channel}</td>
                <td className="px-4 py-2 border">{o.total}</td>
                <td className="px-4 py-2 border">{o.paymentStatus}</td>
                <td className="px-4 py-2 border">{o.fulfillment}</td>
                <td className="px-4 py-2 border">{o.items}</td>
                <td className="px-4 py-2 border">{o.deliveryStatus}</td>
                <td className="px-4 py-2 border">{o.destination}</td>
                <td className="px-4 py-2 border">{o.deliveryMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-semibold">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold">
            {Math.min(currentPage * itemsPerPage, sortedOrders.length)}
          </span>{" "}
          of <span className="font-semibold">{sortedOrders.length}</span> entries
        </div>
        <div>
          <button
            className="px-3 py-1 border rounded-l disabled:opacity-50"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded-r disabled:opacity-50"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
