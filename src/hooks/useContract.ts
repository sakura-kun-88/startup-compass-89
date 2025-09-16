import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { STARTUP_OPS_ABI, STARTUP_OPS_ADDRESS } from '@/lib/contract-abi';

export const useStartupOps = () => {
  const { writeContract } = useWriteContract();

  // Create startup
  const createStartup = async (name: string, description: string) => {
    return writeContract({
      address: STARTUP_OPS_ADDRESS as `0x${string}`,
      abi: STARTUP_OPS_ABI,
      functionName: 'createStartup',
      args: [name, description],
    });
  };

  // Record metric
  const recordMetric = async (
    startupId: bigint,
    metricType: string,
    value: any, // externalEuint32
    inputProof: Uint8Array
  ) => {
    return writeContract({
      address: STARTUP_OPS_ADDRESS as `0x${string}`,
      abi: STARTUP_OPS_ABI,
      functionName: 'recordMetric',
      args: [startupId, metricType, value, inputProof],
    });
  };

  // Create KPI
  const createKPI = async (
    startupId: bigint,
    kpiType: string,
    targetValue: bigint,
    deadline: bigint
  ) => {
    return writeContract({
      address: STARTUP_OPS_ADDRESS as `0x${string}`,
      abi: STARTUP_OPS_ABI,
      functionName: 'createKPI',
      args: [startupId, kpiType, targetValue, deadline],
    });
  };

  // Update KPI progress
  const updateKPIProgress = async (
    kpiId: bigint,
    currentValue: any, // externalEuint32
    inputProof: Uint8Array
  ) => {
    return writeContract({
      address: STARTUP_OPS_ADDRESS as `0x${string}`,
      abi: STARTUP_OPS_ABI,
      functionName: 'updateKPIProgress',
      args: [kpiId, currentValue, inputProof],
    });
  };

  // Add team member
  const addTeamMember = async (
    startupId: bigint,
    memberAddress: `0x${string}`,
    role: string,
    salary: any, // externalEuint32
    inputProof: Uint8Array
  ) => {
    return writeContract({
      address: STARTUP_OPS_ADDRESS as `0x${string}`,
      abi: STARTUP_OPS_ABI,
      functionName: 'addTeamMember',
      args: [startupId, memberAddress, role, salary, inputProof],
    });
  };

  return {
    createStartup,
    recordMetric,
    createKPI,
    updateKPIProgress,
    addTeamMember,
  };
};

export const useStartupInfo = (startupId: bigint) => {
  return useReadContract({
    address: STARTUP_OPS_ADDRESS as `0x${string}`,
    abi: STARTUP_OPS_ABI,
    functionName: 'getStartupInfo',
    args: [startupId],
  });
};

export const useUserStartups = (userAddress: `0x${string}`) => {
  return useReadContract({
    address: STARTUP_OPS_ADDRESS as `0x${string}`,
    abi: STARTUP_OPS_ABI,
    functionName: 'getUserStartups',
    args: [userAddress],
  });
};

export const useUserReputation = (userAddress: `0x${string}`) => {
  return useReadContract({
    address: STARTUP_OPS_ADDRESS as `0x${string}`,
    abi: STARTUP_OPS_ABI,
    functionName: 'getUserReputation',
    args: [userAddress],
  });
};
