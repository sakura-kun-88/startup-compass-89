import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';

// Configure supported chains for startup operations
export const config = getDefaultConfig({
  appName: 'StartupOps - Operations Dashboard',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  chains: [sepolia, mainnet],
  ssr: false,
});

// Contract addresses (to be updated after deployment)
export const contractAddresses = {
  startupOps: '0x...', // Will be set after contract deployment
  fheToken: '0x...', // FHE token contract address
};

// FHE SDK Configuration
export const fheConfig = {
  network: 'sepolia',
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://1rpc.io/sepolia',
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
};
