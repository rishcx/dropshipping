import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Package,
  Search,
  Filter,
  TruckIcon,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
} from "lucide-react";

interface Order {
  id: string;
  customer: string;
  date: string;
  items: string[];
  total: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "failed";
  wholesaler: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const OrdersPanel = () => {
  const [activeTab, setActiveTab] = useState("new-orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for demonstration
  const newOrders: Order[] = [
    {
      id: "ORD-1234",
      customer: "John Smith",
      date: "2023-06-15",
      items: ["Blue T-Shirt (XL)", "Black Jeans (32)"],
      total: "$78.99",
      status: "pending",
      wholesaler: "Fashion Wholesale Co.",
    },
    {
      id: "ORD-1235",
      customer: "Sarah Johnson",
      date: "2023-06-15",
      items: ["Red Dress (M)", "White Sneakers (39)"],
      total: "$124.50",
      status: "pending",
      wholesaler: "Style Distributors Inc.",
    },
    {
      id: "ORD-1236",
      customer: "Michael Brown",
      date: "2023-06-14",
      items: ["Leather Wallet", "Watch"],
      total: "$189.99",
      status: "processing",
      wholesaler: "Accessories Direct",
    },
  ];

  const trackingOrders: Order[] = [
    {
      id: "ORD-1230",
      customer: "Emily Davis",
      date: "2023-06-12",
      items: ["Yoga Mat", "Fitness Band Set"],
      total: "$65.00",
      status: "shipped",
      wholesaler: "Fitness Supplies Co.",
      trackingNumber: "TRK-987654",
      estimatedDelivery: "2023-06-18",
    },
    {
      id: "ORD-1231",
      customer: "Robert Wilson",
      date: "2023-06-11",
      items: ["Wireless Headphones", "Phone Case"],
      total: "$112.75",
      status: "delivered",
      wholesaler: "Tech Wholesale Ltd.",
      trackingNumber: "TRK-987655",
      estimatedDelivery: "2023-06-15",
    },
    {
      id: "ORD-1232",
      customer: "Lisa Thompson",
      date: "2023-06-10",
      items: ["Coffee Maker", "Mug Set (4)"],
      total: "$94.25",
      status: "failed",
      wholesaler: "Home Goods Supply",
      trackingNumber: "TRK-987656",
      estimatedDelivery: "2023-06-16",
    },
  ];

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Delivered
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDeliveryProgress = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return 0;
      case "processing":
        return 25;
      case "shipped":
        return 75;
      case "delivered":
        return 100;
      case "failed":
        return 100;
      default:
        return 0;
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      case "shipped":
        return <TruckIcon className="h-4 w-4 text-purple-600" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
          <Button>Refresh Data</Button>
        </div>
      </div>

      <Tabs
        defaultValue="new-orders"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="new-orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            New Orders
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <TruckIcon className="h-4 w-4" />
            Order Tracking
          </TabsTrigger>
        </TabsList>

        {/* New Orders Tab */}
        <TabsContent value="new-orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders Requiring Fulfillment</CardTitle>
              <CardDescription>
                Process new orders and route them to appropriate wholesalers.
              </CardDescription>
              <div className="flex items-center justify-between mt-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Wholesaler</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          {order.items.map((item, index) => (
                            <li key={index} className="text-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.wholesaler}</TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm">Fulfill Order</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Process Order {order.id}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will automatically route the order to{" "}
                                {order.wholesaler} for fulfillment. Do you want
                                to proceed?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>
                                Confirm Fulfillment
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order Tracking Tab */}
        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle>Order Tracking & Delivery Status</CardTitle>
              <CardDescription>
                Monitor the status of orders that have been processed and are in
                transit.
              </CardDescription>
              <div className="flex items-center justify-between mt-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by order ID or customer..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trackingOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            {order.id} - {order.customer}
                            {getStatusIcon(order.status)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Order Date: {order.date} | Wholesaler:{" "}
                            {order.wholesaler}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(order.status)}
                            {order.status === "failed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                Resolve Issue
                              </Button>
                            )}
                          </div>
                          {order.trackingNumber && (
                            <p className="text-sm mt-1">
                              Tracking: {order.trackingNumber}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Order Placed</span>
                          <span>Processing</span>
                          <span>Shipped</span>
                          <span>Delivered</span>
                        </div>
                        <Progress
                          value={getDeliveryProgress(order.status)}
                          className="h-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Order Items
                          </h4>
                          <ul className="list-disc list-inside text-sm">
                            {order.items.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Delivery Details
                          </h4>
                          <p className="text-sm">
                            {order.status === "delivered" ? (
                              <span className="text-green-600">
                                Delivered on {order.estimatedDelivery}
                              </span>
                            ) : order.status === "failed" ? (
                              <span className="text-red-600">
                                Delivery failed - Contact wholesaler
                              </span>
                            ) : (
                              <span>
                                Estimated delivery: {order.estimatedDelivery}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4 space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Send Notification</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPanel;
