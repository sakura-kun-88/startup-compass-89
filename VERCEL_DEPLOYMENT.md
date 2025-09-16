# Vercel Deployment Guide for StartupOps

This guide provides step-by-step instructions for deploying the StartupOps dashboard to Vercel.

## Prerequisites

- GitHub account with the project repository
- Vercel account (free tier available)
- Environment variables configured

## Step 1: Prepare Your Repository

Ensure your project is pushed to GitHub:

```bash
git add .
git commit -m "feat: Ready for Vercel deployment"
git push origin main
```

## Step 2: Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `sakura-kun-88/startup-compass-89`
   - Click "Import"

## Step 3: Configure Build Settings

Vercel should auto-detect the settings, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Step 4: Environment Variables Configuration

In the Vercel dashboard, go to **Settings > Environment Variables** and add:

### Required Variables

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_FHE_NETWORK=sepolia
NEXT_PUBLIC_FHE_RPC_URL=https://rpc.fhenix.xyz
```

### Contract Addresses (Update after deployment)

```env
NEXT_PUBLIC_STARTUP_OPS_CONTRACT_ADDRESS=0x...
```

### Adding Variables in Vercel

1. Click "Add New" for each variable
2. Enter the **Name** (e.g., `NEXT_PUBLIC_CHAIN_ID`)
3. Enter the **Value** (e.g., `11155111`)
4. Select **Environment**: Production, Preview, Development
5. Click "Save"

## Step 5: Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for build to complete (2-3 minutes)
   - Vercel will provide a deployment URL

2. **Automatic Deployments**
   - Future pushes to `main` branch will auto-deploy
   - Pull requests will create preview deployments

## Step 6: Custom Domain (Optional)

1. **Add Domain**
   - Go to **Settings > Domains**
   - Click "Add Domain"
   - Enter your custom domain (e.g., `startupops.com`)

2. **Configure DNS**
   - Add CNAME record pointing to Vercel
   - Or use Vercel's nameservers

## Step 7: Post-Deployment Configuration

### Update Contract Address

After deploying your smart contract:

1. **Deploy Contract**
   ```bash
   # Deploy to Sepolia testnet
   npx hardhat run scripts/deploy.js --network sepolia
   ```

2. **Update Environment Variable**
   - Go to Vercel dashboard
   - Update `NEXT_PUBLIC_STARTUP_OPS_CONTRACT_ADDRESS`
   - Redeploy or wait for next auto-deployment

### Verify Deployment

1. **Check Build Logs**
   - Go to **Deployments** tab
   - Click on latest deployment
   - Review build logs for errors

2. **Test Functionality**
   - Visit your deployment URL
   - Test wallet connection
   - Verify FHE features work

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```
   Error: Cannot find module '@rainbow-me/rainbowkit'
   ```
   **Solution**: Ensure all dependencies are in `package.json`

2. **Environment Variables Not Loading**
   ```
   Error: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is undefined
   ```
   **Solution**: Verify variable names start with `NEXT_PUBLIC_`

3. **Wallet Connection Issues**
   ```
   Error: Invalid project ID
   ```
   **Solution**: Check WalletConnect project ID is correct

### Build Optimization

1. **Enable Edge Functions** (if needed)
   - Go to **Settings > Functions**
   - Configure edge runtime for better performance

2. **Optimize Bundle Size**
   - Use dynamic imports for large libraries
   - Enable tree shaking in Vite config

## Monitoring and Analytics

### Vercel Analytics

1. **Enable Analytics**
   - Go to **Settings > Analytics**
   - Enable Vercel Analytics
   - View performance metrics

2. **Monitor Deployments**
   - Check deployment status
   - Monitor build times
   - Review error logs

### Performance Monitoring

```javascript
// Add to your app for monitoring
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

## Security Considerations

### Environment Variables

- Never commit sensitive keys to repository
- Use Vercel's environment variable encryption
- Rotate keys regularly

### HTTPS and Security Headers

Vercel automatically provides:
- HTTPS encryption
- Security headers
- DDoS protection

## Backup and Recovery

### Database Backup

If using external database:
- Set up automated backups
- Test recovery procedures
- Monitor backup status

### Code Backup

- GitHub provides automatic backup
- Consider additional backup solutions
- Document recovery procedures

## Scaling Considerations

### Performance Optimization

1. **CDN Usage**
   - Vercel provides global CDN
   - Optimize static assets
   - Use image optimization

2. **Caching Strategy**
   - Implement proper caching headers
   - Use Vercel's edge caching
   - Optimize API responses

### Cost Management

- Monitor usage in Vercel dashboard
- Set up billing alerts
- Optimize for free tier limits

## Support and Resources

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment Guide](https://vercel.com/guides/deploying-vite-with-vercel)

### Community Support
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/sakura-kun-88/startup-compass-89/issues)

---

## Quick Reference

### Essential Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (via Git)
git push origin main
```

### Important URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project Settings**: https://vercel.com/sakura-kun-88/startup-compass-89/settings
- **Deployments**: https://vercel.com/sakura-kun-88/startup-compass-89/deployments

### Environment Variables Checklist

- [ ] `NEXT_PUBLIC_CHAIN_ID`
- [ ] `NEXT_PUBLIC_RPC_URL`
- [ ] `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
- [ ] `NEXT_PUBLIC_INFURA_API_KEY`
- [ ] `NEXT_PUBLIC_STARTUP_OPS_CONTRACT_ADDRESS`
- [ ] `NEXT_PUBLIC_FHE_NETWORK`
- [ ] `NEXT_PUBLIC_FHE_RPC_URL`

---

**Deployment completed successfully! 🚀**

Your StartupOps dashboard is now live and ready for users to connect their wallets and start managing their startup operations with FHE security.
