// types.ts
export interface Order {
  order: string;
  date: string;
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

// sampleOrders.ts
export interface Order {
  order: string;
  date: string;
  customer: string;
  channel: string;
  total: number;
  paymentStatus: string;
  fulfillment: string;
  items: string;
}


// utility to generate more (if you like)
export function generateOrders(count: number): Order[] {
  const channels = ["Online", "Retail", "Wholesale", "Mobile"];
  const paymentStatuses = ["Paid", "Pending", "Failed", "Refunded"];
  const fulfillments = ["Processing", "Shipped", "Delivered", "Returned", "Cancelled"];
  const deliveryStatuses = ["Pending", "In Transit", "Delivered", "Delayed"];
  const destinations = ["Delhi, India", "Mumbai, India", "New York, USA", "London, UK", "Sydney, Australia"];
  const deliveryMethods = ["Air", "Ground", "Sea"];

  const orders: Order[] = [];
  for (let i = 1; i <= count; i++) {
    orders.push({
      order: `ORD-${10000 + i}`,
      date: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString().slice(0, 10),
      customer: `Customer ${i}`,
      channel: channels[i % channels.length],
      total: parseFloat((Math.random() * 500 + 20).toFixed(2)),
      paymentStatus: paymentStatuses[i % paymentStatuses.length],
      fulfillment: fulfillments[i % fulfillments.length],
      items: `ItemA × ${i % 5 + 1}, ItemB × ${i % 3 + 1}`,
      deliveryStatus: deliveryStatuses[i % deliveryStatuses.length],
      destination: destinations[i % destinations.length],
      deliveryMethod: deliveryMethods[i % deliveryMethods.length],
    });
  }
  return orders;
}
