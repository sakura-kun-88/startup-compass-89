# StartupOps - FHE-Powered Operations Dashboard

A comprehensive startup operations dashboard with fully homomorphic encryption (FHE) integration for secure data management and blockchain-based analytics.

## 🚀 Features

### Core Functionality
- **Real-time Dashboard**: Comprehensive overview of startup metrics and KPIs
- **Revenue Analytics**: Track and analyze revenue streams with encrypted data
- **Customer Insights**: Monitor customer growth and engagement metrics
- **Team Performance**: Manage team members and track performance securely
- **KPI Tracking**: Set and monitor key performance indicators

### Security & Privacy
- **FHE Integration**: All sensitive data encrypted using fully homomorphic encryption
- **Blockchain Security**: Smart contracts for tamper-proof data storage
- **Wallet Integration**: Secure wallet connection with RainbowKit
- **Privacy-First**: Zero-knowledge data processing

### Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Blockchain**: Ethereum Sepolia + FHE Network
- **Wallet**: RainbowKit + Wagmi + Viem
- **Smart Contracts**: Solidity with FHE support

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sakura-kun-88/startup-compass-89.git
   cd startup-compass-89
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_ID
   NEXT_PUBLIC_STARTUP_OPS_CONTRACT_ADDRESS=0x...
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Wallet Connect Setup
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy your Project ID to `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

### Blockchain Configuration
- **Network**: Ethereum Sepolia Testnet
- **Chain ID**: 11155111
- **RPC URL**: Configure your preferred RPC provider
- **FHE Network**: Integrated for encrypted computations

### Smart Contract Deployment
The `StartupOps.sol` contract includes:
- Encrypted metric recording
- KPI management with FHE
- Team member performance tracking
- Reputation system
- Startup verification

## 📊 Usage

### Dashboard Overview
- **Revenue Tracking**: Monitor monthly and yearly revenue with encrypted storage
- **Customer Metrics**: Track customer acquisition and retention
- **Team Analytics**: Manage team performance and salaries securely
- **KPI Monitoring**: Set targets and track progress

### Wallet Integration
1. Click "Connect Wallet" in the header
2. Select your preferred wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection
4. Start using FHE-secured features

### Data Security
All sensitive data is encrypted using FHE:
- Revenue figures
- Customer counts
- Team salaries
- Performance metrics
- KPI values

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/          # React components
│   ├── dashboard/       # Dashboard-specific components
│   ├── layout/          # Layout components
│   ├── ui/              # shadcn/ui components
│   └── WalletConnect.tsx
├── hooks/               # Custom React hooks
│   └── useContract.ts   # Blockchain interaction hooks
├── lib/                 # Utility libraries
│   ├── contract-abi.ts  # Smart contract ABI
│   ├── utils.ts         # General utilities
│   └── wallet-config.ts # Wallet configuration
└── pages/               # Page components
```

### Smart Contract Features
- **Startup Management**: Create and manage startup profiles
- **Metric Recording**: Securely record encrypted metrics
- **KPI System**: Set targets and track encrypted progress
- **Team Management**: Add members with encrypted salary data
- **Reputation System**: Track user reputation with FHE

## 🔐 Security Features

### FHE Implementation
- All sensitive data encrypted at rest and in transit
- Computations performed on encrypted data
- Zero-knowledge proof integration
- Privacy-preserving analytics

### Smart Contract Security
- Access control mechanisms
- Input validation and sanitization
- Event logging for transparency
- Upgradeable contract architecture

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm run preview
```

## 📝 API Reference

### Smart Contract Functions
- `createStartup(name, description)`: Create a new startup
- `recordMetric(startupId, metricType, value, proof)`: Record encrypted metric
- `createKPI(startupId, kpiType, targetValue, deadline)`: Create KPI
- `addTeamMember(startupId, memberAddress, role, salary, proof)`: Add team member
- `updateKPIProgress(kpiId, currentValue, proof)`: Update KPI progress

### Frontend Hooks
- `useStartupOps()`: Main contract interaction hook
- `useStartupInfo(startupId)`: Get startup information
- `useUserStartups(address)`: Get user's startups
- `useUserReputation(address)`: Get user reputation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Deployed on Vercel](https://startup-compass-89.vercel.app)
- **Documentation**: [Full documentation](https://docs.startupops.com)
- **Smart Contract**: [Verified on Etherscan](https://sepolia.etherscan.io/address/0x...)

## 🆘 Support

For support, email support@startupops.com or join our Discord community.

---

**Built with ❤️ using FHE technology for privacy-first startup operations**