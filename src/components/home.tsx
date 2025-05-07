import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Import dashboard components
import InventoryPanel from "./dashboard/InventoryPanel";
import OrdersPanel from "./dashboard/OrdersPanel";
import AnalyticsWidget from "./dashboard/AnalyticsWidget";
import WholesalerIntegration from "./dashboard/WholesalerIntegration";

const Home = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@shipdrop.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  };

  // Mock notification count
  const notificationCount = 3;

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Navigation Trigger */}
      <Sheet>
        <SheetTrigger
          asChild
          className="md:hidden block absolute top-4 left-4 z-50"
        >
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <MobileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-card">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6 bg-card">
          <h1 className="text-xl font-semibold">ShipDrop Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-destructive text-destructive-foreground text-xs flex items-center justify-center rounded-full">
                  {notificationCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="wholesalers">
                Wholesaler Integration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="mt-0">
              <InventoryPanel />
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
              <OrdersPanel />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <AnalyticsWidget />
            </TabsContent>

            <TabsContent value="wholesalers" className="mt-0">
              <WholesalerIntegration />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

// Define types for the components
interface User {
  name: string;
  email: string;
  avatar: string;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
}

// Sidebar component for both mobile and desktop
const Sidebar = ({ activeTab, setActiveTab, user }: SidebarProps) => {
  return (
    <>
      <div className="p-6 flex items-center">
        <h2 className="text-2xl font-bold">ShipDrop</h2>
      </div>
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          <NavItem
            id="inventory"
            label="Inventory"
            active={activeTab === "inventory"}
            onClick={() => setActiveTab("inventory")}
          />
          <NavItem
            id="orders"
            label="Orders"
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          />
          <NavItem
            id="analytics"
            label="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
          <NavItem
            id="wholesalers"
            label="Wholesaler Integration"
            active={activeTab === "wholesalers"}
            onClick={() => setActiveTab("wholesalers")}
          />
        </ul>
      </nav>
      <div className="p-4 border-t mt-auto">
        <Card>
          <CardContent className="p-4 flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// Mobile sidebar wrapper
const MobileSidebar = (props: SidebarProps) => {
  return (
    <div className="h-full bg-card">
      <Sidebar {...props} />
    </div>
  );
};

// Navigation item component
interface NavItemProps {
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ id, label, active, onClick }: NavItemProps) => {
  return (
    <li>
      <Button
        variant={active ? "default" : "ghost"}
        className={`w-full justify-start text-left ${active ? "" : "hover:bg-accent"}`}
        onClick={onClick}
      >
        {label}
      </Button>
    </li>
  );
};

export default Home;
