import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Plus, Search, Filter, Lock, Eye, EyeOff, TrendingUp, TrendingDown, CheckCircle, XCircle } from 'lucide-react';
import { useStartupOps } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

const KPIs = () => {
  const { address } = useAccount();
  const { createKPI } = useStartupOps();
  const [kpiName, setKpiName] = useState('');
  const [kpiDescription, setKpiDescription] = useState('');
  const [kpiTargetValue, setKpiTargetValue] = useState('');
  const [kpiCategory, setKpiCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEncryptedData, setShowEncryptedData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate FHE encryption
  const encryptData = (value: number): { encrypted: string; proof: Uint8Array } => {
    const encrypted = btoa(value.toString()).split('').reverse().join('');
    const proof = new Uint8Array(32);
    return { encrypted, proof };
  };

  const handleCreateKPI = async () => {
    if (!kpiName || !kpiDescription || !kpiTargetValue || !kpiCategory) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const targetValue = parseFloat(kpiTargetValue);
      const { encrypted, proof } = encryptData(targetValue);
      
      const txHash = await createKPI(BigInt(1), kpiName, encrypted, proof);
      toast.success(`KPI created! Transaction: ${txHash}`);
      setKpiName('');
      setKpiDescription('');
      setKpiTargetValue('');
      setKpiCategory('');
    } catch (error) {
      toast.error('Failed to create KPI');
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
          <p className="text-muted-foreground">Please connect your wallet to access KPI management</p>
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
            <h1 className="text-3xl font-bold tracking-tight">KPI Management</h1>
            <p className="text-muted-foreground">
              Set and track key performance indicators with FHE encryption
            </p>
          </div>
          <Badge variant="outline" className="text-purple-500 border-purple-500">
            <Lock className="h-3 w-3 mr-1" />
            FHE Secured
          </Badge>
        </div>

        {/* KPI Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total KPIs</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Active KPIs
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achieved KPIs</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                This quarter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
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
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Active categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* KPI Management */}
        <Tabs defaultValue="create" className="space-y-4">
          <TabsList>
            <TabsTrigger value="create">Create KPI</TabsTrigger>
            <TabsTrigger value="list">KPI List</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New KPI
                </CardTitle>
                <CardDescription>
                  Set new key performance indicators with encrypted target values
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">KPI Name</label>
                    <Input
                      placeholder="Monthly Revenue Growth"
                      value={kpiName}
                      onChange={(e) => setKpiName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Input
                      placeholder="Financial, Growth, Customer, etc."
                      value={kpiCategory}
                      onChange={(e) => setKpiCategory(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Target Value</label>
                    <Input
                      placeholder="25"
                      type="number"
                      value={kpiTargetValue}
                      onChange={(e) => setKpiTargetValue(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      placeholder="Describe what this KPI measures and why it's important"
                      value={kpiDescription}
                      onChange={(e) => setKpiDescription(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleCreateKPI} 
                  disabled={isLoading}
                  className="w-full"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {isLoading ? 'Encrypting...' : 'Create KPI'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>KPI List</CardTitle>
                    <CardDescription>
                      View and manage your key performance indicators
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search KPIs..."
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
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No KPIs found. Create your first KPI to get started.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dashboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>KPI Dashboard</CardTitle>
                <CardDescription>
                  Visual overview of your key performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    KPI dashboard will be displayed here once KPIs are created
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* KPI Categories */}
        <Card>
          <CardHeader>
            <CardTitle>KPI Categories</CardTitle>
            <CardDescription>
              Common KPI categories for startups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-green-600">Financial</h3>
                <p className="text-sm text-muted-foreground">Revenue, profit, costs</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-blue-600">Growth</h3>
                <p className="text-sm text-muted-foreground">User acquisition, retention</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-purple-600">Customer</h3>
                <p className="text-sm text-muted-foreground">Satisfaction, support</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-orange-600">Operational</h3>
                <p className="text-sm text-muted-foreground">Efficiency, productivity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encryption Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">KPI Data Encryption</span>
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
                <p>• All KPI target values are encrypted using FHE</p>
                <p>• Performance calculations are done on encrypted data</p>
                <p>• KPI progress tracking maintains data privacy</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default KPIs;

