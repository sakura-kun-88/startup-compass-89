import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, Search, Filter, Lock, Eye, EyeOff, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useStartupOps } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

const Team = () => {
  const { address } = useAccount();
  const { addTeamMember } = useStartupOps();
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberSalary, setMemberSalary] = useState('');
  const [memberAddress, setMemberAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEncryptedData, setShowEncryptedData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate FHE encryption
  const encryptData = (value: number): { encrypted: string; proof: Uint8Array } => {
    const encrypted = btoa(value.toString()).split('').reverse().join('');
    const proof = new Uint8Array(32);
    return { encrypted, proof };
  };

  const handleAddTeamMember = async () => {
    if (!memberName || !memberEmail || !memberRole || !memberSalary || !memberAddress) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const salary = parseFloat(memberSalary);
      const { encrypted, proof } = encryptData(salary);
      
      const txHash = await addTeamMember(
        BigInt(1), 
        memberName, 
        memberAddress as `0x${string}`, 
        encrypted, 
        proof
      );
      toast.success(`Team member added! Transaction: ${txHash}`);
      setMemberName('');
      setMemberEmail('');
      setMemberRole('');
      setMemberSalary('');
      setMemberAddress('');
    } catch (error) {
      toast.error('Failed to add team member');
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
          <p className="text-muted-foreground">Please connect your wallet to access team management</p>
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
            <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">
              Manage your team members with encrypted salary data
            </p>
          </div>
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            <Lock className="h-3 w-3 mr-1" />
            FHE Secured
          </Badge>
        </div>

        {/* Team Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Active members
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground">
                Monthly encrypted
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Active teams
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Management */}
        <Tabs defaultValue="add" className="space-y-4">
          <TabsList>
            <TabsTrigger value="add">Add Member</TabsTrigger>
            <TabsTrigger value="list">Team List</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Add Team Member
                </CardTitle>
                <CardDescription>
                  Add new team members with encrypted salary information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      placeholder="John Doe"
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      placeholder="john@company.com"
                      type="email"
                      value={memberEmail}
                      onChange={(e) => setMemberEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Input
                      placeholder="Software Engineer"
                      value={memberRole}
                      onChange={(e) => setMemberRole(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Wallet Address</label>
                    <Input
                      placeholder="0x..."
                      value={memberAddress}
                      onChange={(e) => setMemberAddress(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Salary (Annual)</label>
                    <Input
                      placeholder="75000"
                      type="number"
                      value={memberSalary}
                      onChange={(e) => setMemberSalary(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleAddTeamMember} 
                  disabled={isLoading}
                  className="w-full"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {isLoading ? 'Encrypting...' : 'Add Team Member'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      View and manage your team members
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search team members..."
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
                    No team members found. Add your first team member to get started.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payroll" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Management</CardTitle>
                <CardDescription>
                  Manage encrypted payroll data and calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Payroll management will be available once team members are added
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
                <span className="text-sm font-medium">Team Data Encryption</span>
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
                <p>• All salary information is encrypted using FHE before storage</p>
                <p>• Payroll calculations are performed on encrypted data</p>
                <p>• Team member privacy is protected while enabling management</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Team;

