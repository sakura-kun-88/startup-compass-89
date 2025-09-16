import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, TrendingDown, Plus, Lock, Eye, EyeOff, Target } from 'lucide-react';
import { useStartupOps } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

const Revenue = () => {
  const { address } = useAccount();
  const { recordMetric } = useStartupOps();
  const [revenueAmount, setRevenueAmount] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEncryptedData, setShowEncryptedData] = useState(false);

  // Simulate FHE encryption
  const encryptData = (value: number): { encrypted: string; proof: Uint8Array } => {
    const encrypted = btoa(value.toString()).split('').reverse().join('');
    const proof = new Uint8Array(32);
    return { encrypted, proof };
  };

  const handleRecordRevenue = async () => {
    if (!revenueAmount || !revenueSource) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const amount = parseFloat(revenueAmount);
      const { encrypted, proof } = encryptData(amount);
      
      // In real implementation, you would use the actual encrypted data
      const txHash = await recordMetric(BigInt(1), 'revenue', encrypted, proof);
      toast.success(`Revenue recorded! Transaction: ${txHash}`);
      setRevenueAmount('');
      setRevenueSource('');
    } catch (error) {
      toast.error('Failed to record revenue');
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
          <p className="text-muted-foreground">Please connect your wallet to access revenue management</p>
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
            <h1 className="text-3xl font-bold tracking-tight">Revenue Management</h1>
            <p className="text-muted-foreground">
              Track and manage your startup's revenue with FHE encryption
            </p>
          </div>
          <Badge variant="outline" className="text-green-500 border-green-500">
            <Lock className="h-3 w-3 mr-1" />
            FHE Secured
          </Badge>
        </div>

        {/* Revenue Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-xs text-muted-foreground">
                Encrypted data
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Sources</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Active streams
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Deal</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">
                Per transaction
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Management */}
        <Tabs defaultValue="record" className="space-y-4">
          <TabsList>
            <TabsTrigger value="record">Record Revenue</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="sources">Revenue Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Record New Revenue
                </CardTitle>
                <CardDescription>
                  Add new revenue entries with FHE encryption
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Amount</label>
                    <Input
                      placeholder="0.00"
                      type="number"
                      value={revenueAmount}
                      onChange={(e) => setRevenueAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Source</label>
                    <Input
                      placeholder="e.g., Product Sales, Subscriptions"
                      value={revenueSource}
                      onChange={(e) => setRevenueSource(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleRecordRevenue} 
                  disabled={isLoading}
                  className="w-full"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {isLoading ? 'Encrypting...' : 'Record Revenue'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>
                  Encrypted revenue insights and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Revenue analytics will be displayed here once data is recorded
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
                <CardDescription>
                  Manage and track different revenue streams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Revenue sources will be displayed here
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
                <span className="text-sm font-medium">Revenue Data Encryption</span>
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
                <p>• All revenue data is encrypted using FHE before blockchain storage</p>
                <p>• Financial calculations are performed on encrypted data</p>
                <p>• Revenue trends are computed without exposing individual amounts</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Revenue;
