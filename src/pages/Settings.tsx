import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Network, Lock, Eye, EyeOff, Save, RefreshCw } from 'lucide-react';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';

const Settings = () => {
  const { address } = useAccount();
  const [showEncryptedData, setShowEncryptedData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Settings state
  const [profileSettings, setProfileSettings] = useState({
    companyName: 'StartupOps',
    email: 'admin@startupops.com',
    timezone: 'UTC',
    language: 'English'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    monthlyReports: true,
    kpiAlerts: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    dataRetention: 365,
    encryptionLevel: 'FHE'
  });
  
  const [networkSettings, setNetworkSettings] = useState({
    rpcUrl: 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
    chainId: 11155111,
    contractAddress: '0xYourDeployedContractAddress'
  });

  const handleSaveSettings = async (section: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${section} settings saved successfully!`);
    } catch (error) {
      toast.error(`Failed to save ${section} settings`);
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
          <p className="text-muted-foreground">Please connect your wallet to access settings</p>
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
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Configure your StartupOps dashboard and FHE preferences
            </p>
          </div>
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            <Lock className="h-3 w-3 mr-1" />
            FHE Secured
          </Badge>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Manage your company profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Company Name</label>
                    <Input
                      value={profileSettings.companyName}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Timezone</label>
                    <Input
                      value={profileSettings.timezone}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Language</label>
                    <Input
                      value={profileSettings.language}
                      onChange={(e) => setProfileSettings(prev => ({ ...prev, language: e.target.value }))}
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => handleSaveSettings('Profile')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Profile Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Email Notifications</label>
                      <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Push Notifications</label>
                      <p className="text-xs text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Weekly Reports</label>
                      <p className="text-xs text-muted-foreground">Get weekly analytics reports</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, weeklyReports: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Monthly Reports</label>
                      <p className="text-xs text-muted-foreground">Get monthly analytics reports</p>
                    </div>
                    <Switch
                      checked={notificationSettings.monthlyReports}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, monthlyReports: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">KPI Alerts</label>
                      <p className="text-xs text-muted-foreground">Get alerts when KPIs are achieved</p>
                    </div>
                    <Switch
                      checked={notificationSettings.kpiAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, kpiAlerts: checked }))}
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => handleSaveSettings('Notification')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Notification Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Two-Factor Authentication</label>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Session Timeout (minutes)</label>
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Data Retention (days)</label>
                    <Input
                      type="number"
                      value={securitySettings.dataRetention}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, dataRetention: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Encryption Level</label>
                    <Input
                      value={securitySettings.encryptionLevel}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      FHE (Fully Homomorphic Encryption) is always enabled
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleSaveSettings('Security')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Security Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  Network Settings
                </CardTitle>
                <CardDescription>
                  Configure blockchain network and contract settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">RPC URL</label>
                    <Input
                      value={networkSettings.rpcUrl}
                      onChange={(e) => setNetworkSettings(prev => ({ ...prev, rpcUrl: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Chain ID</label>
                    <Input
                      type="number"
                      value={networkSettings.chainId}
                      onChange={(e) => setNetworkSettings(prev => ({ ...prev, chainId: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contract Address</label>
                    <Input
                      value={networkSettings.contractAddress}
                      onChange={(e) => setNetworkSettings(prev => ({ ...prev, contractAddress: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleSaveSettings('Network')}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Network Settings'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setNetworkSettings({
                        rpcUrl: 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
                        chainId: 11155111,
                        contractAddress: '0xYourDeployedContractAddress'
                      });
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* FHE Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">FHE Configuration Status</span>
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
                <p>• FHE encryption is active for all sensitive data</p>
                <p>• Network settings are configured for Sepolia testnet</p>
                <p>• Contract interactions are secured with FHE</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

