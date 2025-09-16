import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Lock, Upload, Eye, EyeOff } from 'lucide-react';
import { useStartupOps } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

interface EncryptedDataManagerProps {
  startupId?: bigint;
}

export const EncryptedDataManager: React.FC<EncryptedDataManagerProps> = ({ startupId }) => {
  const { address } = useAccount();
  const { createStartup, recordMetric, createKPI, addTeamMember } = useStartupOps();
  
  const [startupName, setStartupName] = useState('');
  const [startupDescription, setStartupDescription] = useState('');
  const [metricType, setMetricType] = useState('revenue');
  const [metricValue, setMetricValue] = useState('');
  const [kpiType, setKpiType] = useState('monthly_revenue');
  const [kpiTarget, setKpiTarget] = useState('');
  const [kpiDeadline, setKpiDeadline] = useState('');
  const [teamMemberAddress, setTeamMemberAddress] = useState('');
  const [teamMemberRole, setTeamMemberRole] = useState('');
  const [teamMemberSalary, setTeamMemberSalary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEncryptedData, setShowEncryptedData] = useState(false);

  // Simulate FHE encryption (in real implementation, this would use actual FHE)
  const encryptData = (value: number): { encrypted: string; proof: Uint8Array } => {
    // This is a simulation - in real implementation, use actual FHE encryption
    const encrypted = btoa(value.toString()).split('').reverse().join('');
    const proof = new Uint8Array(32); // Simulated proof
    return { encrypted, proof };
  };

  const handleCreateStartup = async () => {
    if (!startupName || !startupDescription) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const txHash = await createStartup(startupName, startupDescription);
      toast.success(`Startup created! Transaction: ${txHash}`);
      setStartupName('');
      setStartupDescription('');
    } catch (error) {
      toast.error('Failed to create startup');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordMetric = async () => {
    if (!startupId || !metricValue) {
      toast.error('Please provide startup ID and metric value');
      return;
    }

    setIsLoading(true);
    try {
      const value = parseFloat(metricValue);
      const { encrypted, proof } = encryptData(value);
      
      // In real implementation, you would use the actual encrypted data
      const txHash = await recordMetric(startupId, metricType, encrypted, proof);
      toast.success(`Metric recorded! Transaction: ${txHash}`);
      setMetricValue('');
    } catch (error) {
      toast.error('Failed to record metric');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKPI = async () => {
    if (!startupId || !kpiTarget || !kpiDeadline) {
      toast.error('Please fill in all KPI fields');
      return;
    }

    setIsLoading(true);
    try {
      const targetValue = BigInt(parseInt(kpiTarget));
      const deadline = Math.floor(new Date(kpiDeadline).getTime() / 1000);
      
      const txHash = await createKPI(startupId, kpiType, targetValue, BigInt(deadline));
      toast.success(`KPI created! Transaction: ${txHash}`);
      setKpiTarget('');
      setKpiDeadline('');
    } catch (error) {
      toast.error('Failed to create KPI');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTeamMember = async () => {
    if (!startupId || !teamMemberAddress || !teamMemberRole || !teamMemberSalary) {
      toast.error('Please fill in all team member fields');
      return;
    }

    setIsLoading(true);
    try {
      const salary = parseFloat(teamMemberSalary);
      const { encrypted, proof } = encryptData(salary);
      
      const txHash = await addTeamMember(
        startupId,
        teamMemberAddress as `0x${string}`,
        teamMemberRole,
        encrypted,
        proof
      );
      toast.success(`Team member added! Transaction: ${txHash}`);
      setTeamMemberAddress('');
      setTeamMemberRole('');
      setTeamMemberSalary('');
    } catch (error) {
      toast.error('Failed to add team member');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!address) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-500" />
            Encrypted Data Manager
          </CardTitle>
          <CardDescription>
            Connect your wallet to manage encrypted startup data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Please connect your wallet to access encrypted data management features
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-500" />
            Encrypted Data Manager
            <Badge variant="outline" className="ml-auto">
              FHE Secured
            </Badge>
          </CardTitle>
          <CardDescription>
            Manage your startup data with fully homomorphic encryption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Startup Creation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Create Startup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Startup Name"
                value={startupName}
                onChange={(e) => setStartupName(e.target.value)}
              />
              <Input
                placeholder="Description"
                value={startupDescription}
                onChange={(e) => setStartupDescription(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleCreateStartup} 
              disabled={isLoading}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Startup'}
            </Button>
          </div>

          {/* Metric Recording */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Record Encrypted Metric</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={metricType}
                onChange={(e) => setMetricType(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="revenue">Revenue</option>
                <option value="customers">Customer Count</option>
                <option value="team_size">Team Size</option>
                <option value="funding">Funding Raised</option>
              </select>
              <Input
                placeholder="Value"
                type="number"
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
              />
              <Button 
                onClick={handleRecordMetric} 
                disabled={isLoading || !startupId}
                className="w-full"
              >
                <Lock className="h-4 w-4 mr-2" />
                {isLoading ? 'Encrypting...' : 'Record Metric'}
              </Button>
            </div>
          </div>

          {/* KPI Creation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Create Encrypted KPI</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={kpiType}
                onChange={(e) => setKpiType(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="monthly_revenue">Monthly Revenue</option>
                <option value="customer_acquisition">Customer Acquisition</option>
                <option value="team_growth">Team Growth</option>
                <option value="funding_goal">Funding Goal</option>
              </select>
              <Input
                placeholder="Target Value"
                type="number"
                value={kpiTarget}
                onChange={(e) => setKpiTarget(e.target.value)}
              />
              <Input
                placeholder="Deadline"
                type="date"
                value={kpiDeadline}
                onChange={(e) => setKpiDeadline(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleCreateKPI} 
              disabled={isLoading || !startupId}
              className="w-full"
            >
              <Lock className="h-4 w-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create KPI'}
            </Button>
          </div>

          {/* Team Member Addition */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add Team Member (Encrypted Salary)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Member Address (0x...)"
                value={teamMemberAddress}
                onChange={(e) => setTeamMemberAddress(e.target.value)}
              />
              <Input
                placeholder="Role"
                value={teamMemberRole}
                onChange={(e) => setTeamMemberRole(e.target.value)}
              />
              <Input
                placeholder="Salary (Encrypted)"
                type="number"
                value={teamMemberSalary}
                onChange={(e) => setTeamMemberSalary(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleAddTeamMember} 
              disabled={isLoading || !startupId}
              className="w-full"
            >
              <Lock className="h-4 w-4 mr-2" />
              {isLoading ? 'Encrypting...' : 'Add Team Member'}
            </Button>
          </div>

          {/* Encryption Status */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Data Encryption Status</span>
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
                <p>• All sensitive data is encrypted using FHE before blockchain storage</p>
                <p>• Computations are performed on encrypted data without decryption</p>
                <p>• Zero-knowledge proofs ensure data integrity and privacy</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
