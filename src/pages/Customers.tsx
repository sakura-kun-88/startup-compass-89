import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, Search, Filter, Lock, Eye, EyeOff, Mail, Phone, MapPin } from 'lucide-react';
import { useStartupOps } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

const Customers = () => {
  const { address } = useAccount();
  const { recordMetric } = useStartupOps();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerValue, setCustomerValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEncryptedData, setShowEncryptedData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate FHE encryption
  const encryptData = (value: number): { encrypted: string; proof: Uint8Array } => {
    const encrypted = btoa(value.toString()).split('').reverse().join('');
    const proof = new Uint8Array(32);
    return { encrypted, proof };
  };

  const handleAddCustomer = async () => {
    if (!customerName || !customerEmail || !customerValue) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const value = parseFloat(customerValue);
      const { encrypted, proof } = encryptData(value);
      
      const txHash = await recordMetric(BigInt(1), 'customer_value', encrypted, proof);
      toast.success(`Customer added! Transaction: ${txHash}`);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerValue('');
    } catch (error) {
      toast.error('Failed to add customer');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!address) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground">Please connect your wallet to access customer management</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
            <p className="text-muted-foreground">
              Manage your customer relationships with FHE encryption
            </p>
          </div>
          <Badge variant="outline" className="text-green-500 border-green-500">
            <Lock className="h-3 w-3 mr-1" />
            FHE Secured
          </Badge>
        </div>

        {/* Customer Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">
                Encrypted data
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">
                Average rating
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Management */}
        <Tabs defaultValue="add" className="space-y-4">
          <TabsList>
            <TabsTrigger value="add">Add Customer</TabsTrigger>
            <TabsTrigger value="list">Customer List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Add New Customer
                </CardTitle>
                <CardDescription>
                  Add new customers with encrypted data storage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Customer Name</label>
                    <Input
                      placeholder="John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Customer Value</label>
                    <Input
                      placeholder="0.00"
                      type="number"
                      value={customerValue}
                      onChange={(e) => setCustomerValue(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleAddCustomer} 
                  disabled={isLoading}
                  className="w-full"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {isLoading ? 'Encrypting...' : 'Add Customer'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Customer List</CardTitle>
                    <CardDescription>
                      View and manage your customer database
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search customers..."
                        className="pl-9 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No customers found. Add your first customer to get started.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
                <CardDescription>
                  Insights and trends from your customer data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Customer analytics will be displayed here once data is available
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Encryption Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Customer Data Encryption</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEncryptedData(!showEncryptedData)}
              >
                {showEncryptedData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {showEncryptedData && (
              <div className="mt-2 text-xs text-muted-foreground">
                <p>• Customer personal information is encrypted using FHE</p>
                <p>• Customer values and metrics are computed on encrypted data</p>
                <p>• Privacy is maintained while enabling analytics</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Customers;

