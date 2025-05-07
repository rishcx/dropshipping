import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle,
  Plus,
  RefreshCw,
  Settings,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Wholesaler {
  id: string;
  name: string;
  apiKey: string;
  apiEndpoint: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  productCount: number;
  active: boolean;
}

const WholesalerIntegration = () => {
  const [wholesalers, setWholesalers] = useState<Wholesaler[]>([
    {
      id: "1",
      name: "Global Supplies Inc.",
      apiKey: "gsi_api_key_123456",
      apiEndpoint: "https://api.globalsupplies.com/v1",
      status: "connected",
      lastSync: "2023-06-15T10:30:00Z",
      productCount: 1245,
      active: true,
    },
    {
      id: "2",
      name: "Wholesale Direct",
      apiKey: "wd_api_key_789012",
      apiEndpoint: "https://api.wholesaledirect.com/v2",
      status: "error",
      lastSync: "2023-06-14T08:15:00Z",
      productCount: 876,
      active: false,
    },
    {
      id: "3",
      name: "Prime Distributors",
      apiKey: "pd_api_key_345678",
      apiEndpoint: "https://api.primedistributors.net/v1",
      status: "connected",
      lastSync: "2023-06-15T14:45:00Z",
      productCount: 2134,
      active: true,
    },
  ]);

  const [selectedWholesaler, setSelectedWholesaler] =
    useState<Wholesaler | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [newWholesaler, setNewWholesaler] = useState<Partial<Wholesaler>>({
    name: "",
    apiKey: "",
    apiEndpoint: "",
    active: true,
  });

  const handleSelectWholesaler = (wholesaler: Wholesaler) => {
    setSelectedWholesaler(wholesaler);
    setTestResult(null);
  };

  const handleTestConnection = () => {
    setIsTestingConnection(true);
    setTestResult(null);

    // Simulate API connection test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success for demo purposes
      setTestResult({
        success,
        message: success
          ? "Connection successful! API responded with status 200."
          : "Connection failed. Please check your API credentials and try again.",
      });
      setIsTestingConnection(false);
    }, 1500);
  };

  const handleSaveWholesaler = () => {
    if (selectedWholesaler) {
      // Update existing wholesaler
      setWholesalers(
        wholesalers.map((w) =>
          w.id === selectedWholesaler.id ? selectedWholesaler : w,
        ),
      );
    } else if (
      newWholesaler.name &&
      newWholesaler.apiKey &&
      newWholesaler.apiEndpoint
    ) {
      // Add new wholesaler
      const newEntry: Wholesaler = {
        id: Date.now().toString(),
        name: newWholesaler.name,
        apiKey: newWholesaler.apiKey,
        apiEndpoint: newWholesaler.apiEndpoint,
        status: "connected",
        lastSync: new Date().toISOString(),
        productCount: 0,
        active: newWholesaler.active || true,
      };
      setWholesalers([...wholesalers, newEntry]);
      setNewWholesaler({
        name: "",
        apiKey: "",
        apiEndpoint: "",
        active: true,
      });
    }
    setSelectedWholesaler(null);
    setTestResult(null);
  };

  const handleDeleteWholesaler = (id: string) => {
    setWholesalers(wholesalers.filter((w) => w.id !== id));
    if (selectedWholesaler?.id === id) {
      setSelectedWholesaler(null);
    }
  };

  const handleToggleActive = (id: string, active: boolean) => {
    setWholesalers(
      wholesalers.map((w) => (w.id === id ? { ...w, active } : w)),
    );
    if (selectedWholesaler?.id === id) {
      setSelectedWholesaler({ ...selectedWholesaler, active });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500">Connected</Badge>;
      case "disconnected":
        return <Badge variant="outline">Disconnected</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <h2 className="text-2xl font-bold mb-6">Wholesaler Integration</h2>

      <Tabs defaultValue="connections">
        <TabsList className="mb-4">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="add">Add New</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="connections">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Connected Wholesalers</CardTitle>
                <CardDescription>
                  Manage your wholesaler API connections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {wholesalers.map((wholesaler) => (
                      <div
                        key={wholesaler.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedWholesaler?.id === wholesaler.id ? "border-primary bg-primary/5" : "hover:bg-muted"}`}
                        onClick={() => handleSelectWholesaler(wholesaler)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{wholesaler.name}</h3>
                            <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                              {wholesaler.apiEndpoint}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(wholesaler.status)}
                            <Switch
                              checked={wholesaler.active}
                              onCheckedChange={(checked) =>
                                handleToggleActive(wholesaler.id, checked)
                              }
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                          <span>Products: {wholesaler.productCount}</span>
                          <span>
                            Last sync:{" "}
                            {new Date(wholesaler.lastSync).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    {wholesalers.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No wholesalers connected yet.</p>
                        <p>Add your first wholesaler to get started.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedWholesaler
                    ? `Edit ${selectedWholesaler.name}`
                    : "Wholesaler Details"}
                </CardTitle>
                <CardDescription>
                  {selectedWholesaler
                    ? "Modify connection details and test API connectivity"
                    : "Select a wholesaler from the list to view or edit details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedWholesaler ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Wholesaler Name</Label>
                        <Input
                          id="edit-name"
                          value={selectedWholesaler.name}
                          onChange={(e) =>
                            setSelectedWholesaler({
                              ...selectedWholesaler,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <div className="h-9 flex items-center">
                          {getStatusBadge(selectedWholesaler.status)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-endpoint">API Endpoint</Label>
                      <Input
                        id="edit-endpoint"
                        value={selectedWholesaler.apiEndpoint}
                        onChange={(e) =>
                          setSelectedWholesaler({
                            ...selectedWholesaler,
                            apiEndpoint: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-apikey">API Key</Label>
                      <Input
                        id="edit-apikey"
                        type="password"
                        value={selectedWholesaler.apiKey}
                        onChange={(e) =>
                          setSelectedWholesaler({
                            ...selectedWholesaler,
                            apiKey: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="edit-active"
                        checked={selectedWholesaler.active}
                        onCheckedChange={(checked) =>
                          setSelectedWholesaler({
                            ...selectedWholesaler,
                            active: checked,
                          })
                        }
                      />
                      <Label htmlFor="edit-active">Active</Label>
                    </div>

                    {testResult && (
                      <Alert
                        variant={testResult.success ? "default" : "destructive"}
                      >
                        {testResult.success ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>
                          {testResult.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    <p>
                      Select a wholesaler from the list to view or edit details
                    </p>
                  </div>
                )}
              </CardContent>
              {selectedWholesaler && (
                <CardFooter className="flex justify-between">
                  <div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleDeleteWholesaler(selectedWholesaler.id)
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleTestConnection}
                      disabled={isTestingConnection}
                    >
                      {isTestingConnection ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>Test Connection</>
                      )}
                    </Button>
                    <Button onClick={handleSaveWholesaler}>Save Changes</Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Wholesaler</CardTitle>
              <CardDescription>Connect to a new wholesaler API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-name">Wholesaler Name</Label>
                    <Input
                      id="new-name"
                      placeholder="e.g. Global Supplies Inc."
                      value={newWholesaler.name}
                      onChange={(e) =>
                        setNewWholesaler({
                          ...newWholesaler,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-endpoint">API Endpoint</Label>
                  <Input
                    id="new-endpoint"
                    placeholder="https://api.example.com/v1"
                    value={newWholesaler.apiEndpoint}
                    onChange={(e) =>
                      setNewWholesaler({
                        ...newWholesaler,
                        apiEndpoint: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-apikey">API Key</Label>
                  <Input
                    id="new-apikey"
                    type="password"
                    placeholder="Enter API key"
                    value={newWholesaler.apiKey}
                    onChange={(e) =>
                      setNewWholesaler({
                        ...newWholesaler,
                        apiKey: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="new-active"
                    checked={newWholesaler.active}
                    onCheckedChange={(checked) =>
                      setNewWholesaler({ ...newWholesaler, active: checked })
                    }
                  />
                  <Label htmlFor="new-active">Active</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleSaveWholesaler}
                disabled={
                  !newWholesaler.name ||
                  !newWholesaler.apiEndpoint ||
                  !newWholesaler.apiKey
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Wholesaler
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Configure global settings for wholesaler integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sync Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-sync">Auto-sync inventory</Label>
                      <Switch id="auto-sync" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync inventory levels every hour
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">
                      Sync Frequency (hours)
                    </Label>
                    <Input
                      id="sync-frequency"
                      type="number"
                      defaultValue="1"
                      min="1"
                      max="24"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Order Processing</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-fulfill">Auto-fulfill orders</Label>
                      <Switch id="auto-fulfill" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically send orders to wholesalers when received
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-errors">Notify on errors</Label>
                      <Switch id="notify-errors" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications when API errors occur
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Credentials</h3>
                  <div className="space-y-2">
                    <Label htmlFor="api-timeout">API Timeout (seconds)</Label>
                    <Input
                      id="api-timeout"
                      type="number"
                      defaultValue="30"
                      min="5"
                      max="120"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="secure-keys">Encrypt API keys</Label>
                      <Switch id="secure-keys" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Store API keys with enhanced encryption
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                <Settings className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WholesalerIntegration;
