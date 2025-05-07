import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Download,
  TrendingUp,
  Package,
  DollarSign,
  BarChart3,
} from "lucide-react";

interface AnalyticsWidgetProps {
  profitData?: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  popularProducts?: Array<{
    id: string;
    name: string;
    sales: number;
    profit: number;
    trend: "up" | "down" | "stable";
  }>;
  salesTrends?: Array<{
    date: string;
    value: number;
  }>;
}

const AnalyticsWidget = ({
  profitData = {
    daily: 1250,
    weekly: 8750,
    monthly: 32500,
    yearly: 385000,
  },
  popularProducts = [
    {
      id: "1",
      name: "Wireless Earbuds",
      sales: 142,
      profit: 2840,
      trend: "up",
    },
    { id: "2", name: "Smart Watch", sales: 98, profit: 3920, trend: "up" },
    {
      id: "3",
      name: "Bluetooth Speaker",
      sales: 87,
      profit: 1740,
      trend: "down",
    },
    { id: "4", name: "Phone Case", sales: 65, profit: 650, trend: "stable" },
    { id: "5", name: "USB-C Cable", sales: 54, profit: 270, trend: "up" },
  ],
  salesTrends = [
    { date: "Jan", value: 12000 },
    { date: "Feb", value: 15000 },
    { date: "Mar", value: 18000 },
    { date: "Apr", value: 16000 },
    { date: "May", value: 21000 },
    { date: "Jun", value: 25000 },
  ],
}: AnalyticsWidgetProps) => {
  return (
    <div className="w-full bg-background p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Profit</p>
                <h3 className="text-2xl font-bold">
                  ${profitData.daily.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Profit</p>
                <h3 className="text-2xl font-bold">
                  ${profitData.weekly.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Profit</p>
                <h3 className="text-2xl font-bold">
                  ${profitData.monthly.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Yearly Profit</p>
                <h3 className="text-2xl font-bold">
                  ${profitData.yearly.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="popular">Popular Products</TabsTrigger>
          <TabsTrigger value="trends">Sales Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>
                Products with the highest sales and profit margins
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Product Name</th>
                      <th className="text-left py-3 px-4">Sales</th>
                      <th className="text-left py-3 px-4">Profit</th>
                      <th className="text-left py-3 px-4">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-3 px-4 flex items-center">
                          <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                          {product.name}
                        </td>
                        <td className="py-3 px-4">{product.sales} units</td>
                        <td className="py-3 px-4">
                          ${product.profit.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {product.trend === "up" && (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            )}
                            {product.trend === "down" && (
                              <TrendingUp className="h-4 w-4 text-red-500 mr-1 rotate-180" />
                            )}
                            {product.trend === "stable" && (
                              <div className="h-4 w-4 border-t-2 border-gray-400 mr-1" />
                            )}
                            {product.trend.charAt(0).toUpperCase() +
                              product.trend.slice(1)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
              <CardDescription>
                Monthly sales performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between gap-2">
                {salesTrends.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center"
                  >
                    <div
                      className="bg-primary w-12 rounded-t-md"
                      style={{
                        height: `${(item.value / Math.max(...salesTrends.map((t) => t.value))) * 250}px`,
                      }}
                    />
                    <span className="text-xs mt-2">{item.date}</span>
                    <span className="absolute -top-6 text-xs">
                      ${(item.value / 1000).toFixed(1)}k
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsWidget;
