import React, { useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Edit,
  Trash2,
  Package,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Product {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  stock: number;
  wholesaler: string;
  category: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const InventoryPanel = () => {
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "error">(
    "synced",
  );
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data for inventory products
  const products: Product[] = [
    {
      id: "1",
      name: "Wireless Earbuds",
      sku: "WE-001",
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&q=80",
      price: 49.99,
      stock: 120,
      wholesaler: "TechSupplier Inc.",
      category: "Electronics",
      status: "in-stock",
    },
    {
      id: "2",
      name: "Smart Watch",
      sku: "SW-002",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80",
      price: 99.99,
      stock: 45,
      wholesaler: "TechSupplier Inc.",
      category: "Electronics",
      status: "in-stock",
    },
    {
      id: "3",
      name: "Portable Charger",
      sku: "PC-003",
      image:
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=200&q=80",
      price: 29.99,
      stock: 8,
      wholesaler: "PowerGadgets Co.",
      category: "Electronics",
      status: "low-stock",
    },
    {
      id: "4",
      name: "Bluetooth Speaker",
      sku: "BS-004",
      image:
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=200&q=80",
      price: 79.99,
      stock: 0,
      wholesaler: "AudioTech Ltd.",
      category: "Audio",
      status: "out-of-stock",
    },
    {
      id: "5",
      name: "Laptop Sleeve",
      sku: "LS-005",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&q=80",
      price: 19.99,
      stock: 65,
      wholesaler: "AccessoryWorld",
      category: "Accessories",
      status: "in-stock",
    },
  ];

  const handleSyncInventory = () => {
    setSyncStatus("syncing");
    // Simulate API call to sync inventory
    setTimeout(() => {
      // 90% chance of success, 10% chance of error for demo purposes
      const success = Math.random() > 0.1;
      setSyncStatus(success ? "synced" : "error");
    }, 2000);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return <Badge className="bg-green-500">In Stock</Badge>;
      case "low-stock":
        return <Badge className="bg-yellow-500">Low Stock</Badge>;
      case "out-of-stock":
        return <Badge className="bg-red-500">Out of Stock</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <div className="flex items-center space-x-2">
          {syncStatus === "synced" && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-1" />
              <span>Synced 5 mins ago</span>
            </div>
          )}
          {syncStatus === "error" && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-1" />
              <span>Sync failed</span>
            </div>
          )}
          <Button
            onClick={handleSyncInventory}
            disabled={syncStatus === "syncing"}
            className="flex items-center"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${syncStatus === "syncing" ? "animate-spin" : ""}`}
            />
            {syncStatus === "syncing" ? "Syncing..." : "Sync Inventory"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by product name or SKU"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {selectedProducts.length} of {filteredProducts.length} selected
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {selectedProducts.length > 0 && (
              <>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Selected
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      filteredProducts.length > 0 &&
                      selectedProducts.length === filteredProducts.length
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Wholesaler</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) =>
                          handleSelectProduct(product.id, checked === true)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="h-12 w-12 rounded overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.wholesaler}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Package className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-8 text-gray-500"
                  >
                    No products found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPanel;
