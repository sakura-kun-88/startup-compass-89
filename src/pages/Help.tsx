import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Search, Book, MessageCircle, Mail, ExternalLink, Lock, Shield, Database, Network } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I connect my wallet?',
          answer: 'Click the "Connect Wallet" button in the top-right corner. You can use MetaMask, WalletConnect, or other supported wallets. Make sure you\'re connected to the Sepolia testnet.'
        },
        {
          question: 'What is FHE encryption?',
          answer: 'Fully Homomorphic Encryption (FHE) allows computations to be performed on encrypted data without decrypting it. This ensures your sensitive startup data remains private while still enabling analytics and calculations.'
        },
        {
          question: 'How do I create my first startup?',
          answer: 'Go to the Dashboard page and use the "Create Startup" form. Enter your startup name and click "Create Startup". This will register your startup on the blockchain with FHE encryption.'
        }
      ]
    },
    {
      category: 'Data Management',
      questions: [
        {
          question: 'How do I record revenue data?',
          answer: 'Navigate to the Revenue page and use the "Record New Revenue" form. Enter the amount and source, then click "Record Revenue". The data will be encrypted using FHE before being stored on-chain.'
        },
        {
          question: 'Can I view my encrypted data?',
          answer: 'Encrypted data is stored on the blockchain and can only be decrypted by authorized parties. The dashboard shows encrypted indicators and computed results without exposing raw data.'
        },
        {
          question: 'How do I add team members?',
          answer: 'Go to the Team page and use the "Add Team Member" form. Enter their details including wallet address and salary. Salary information will be encrypted using FHE.'
        }
      ]
    },
    {
      category: 'KPIs and Analytics',
      questions: [
        {
          question: 'How do I create KPIs?',
          answer: 'Navigate to the KPIs page and use the "Create New KPI" form. Set your target value, category, and description. The target value will be encrypted using FHE.'
        },
        {
          question: 'How do analytics work with encrypted data?',
          answer: 'Analytics are computed on encrypted data using FHE operations. This allows you to get insights and trends without exposing individual data points.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes, you can export analytics and reports from the Analytics page. The exported data will maintain FHE encryption for privacy.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'Which blockchain network is supported?',
          answer: 'Currently, the application supports Sepolia testnet. The contract is deployed on Sepolia and uses FHE for data encryption.'
        },
        {
          question: 'What wallets are supported?',
          answer: 'We support MetaMask, WalletConnect, Coinbase Wallet, and other wallets compatible with RainbowKit.'
        },
        {
          question: 'How do I configure network settings?',
          answer: 'Go to Settings > Network to configure RPC URL, Chain ID, and Contract Address. Default settings are pre-configured for Sepolia testnet.'
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
            <p className="text-muted-foreground">
              Get help with StartupOps and FHE encryption features
            </p>
          </div>
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            <HelpCircle className="h-3 w-3 mr-1" />
            Support
          </Badge>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search help articles..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Help Tabs */}
        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-4">
            <div className="space-y-4">
              {filteredFAQs.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="guides" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-blue-500" />
                    Getting Started
                  </CardTitle>
                  <CardDescription>
                    Learn the basics of StartupOps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Wallet connection setup</li>
                    <li>• Creating your first startup</li>
                    <li>• Understanding FHE encryption</li>
                    <li>• Basic navigation</li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-500" />
                    FHE Encryption
                  </CardTitle>
                  <CardDescription>
                    Understanding data privacy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• How FHE works</li>
                    <li>• Data encryption process</li>
                    <li>• Privacy benefits</li>
                    <li>• Security best practices</li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-500" />
                    Data Management
                  </CardTitle>
                  <CardDescription>
                    Managing your startup data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Recording revenue data</li>
                    <li>• Managing customers</li>
                    <li>• Team member management</li>
                    <li>• KPI tracking</li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Live Chat Support
                  </CardTitle>
                  <CardDescription>
                    Get instant help from our support team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available 24/7 to help you with any questions or issues.
                  </p>
                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Support
                  </CardTitle>
                  <CardDescription>
                    Send us a detailed message
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    For complex issues or detailed questions, email us at support@startupops.com
                  </p>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Technical Information</CardTitle>
                <CardDescription>
                  System information and technical details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Application Version</h4>
                    <p className="text-sm text-muted-foreground">v1.0.0</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">FHE Library</h4>
                    <p className="text-sm text-muted-foreground">@fhevm/solidity</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Blockchain Network</h4>
                    <p className="text-sm text-muted-foreground">Sepolia Testnet</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Wallet Integration</h4>
                    <p className="text-sm text-muted-foreground">RainbowKit v2.2.8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Security Settings
              </Button>
              <Button variant="outline" className="justify-start">
                <Network className="h-4 w-4 mr-2" />
                Network Status
              </Button>
              <Button variant="outline" className="justify-start">
                <Database className="h-4 w-4 mr-2" />
                Data Export
              </Button>
              <Button variant="outline" className="justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                Report Bug
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Help;

