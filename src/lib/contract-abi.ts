// StartupOps Contract ABI
export const STARTUP_OPS_ABI = [
  // Constructor
  "constructor(address _verifier)",
  
  // Events
  "event StartupCreated(uint256 indexed startupId, address indexed owner, string name)",
  "event MetricRecorded(uint256 indexed metricId, uint256 indexed startupId, string metricType)",
  "event KPICreated(uint256 indexed kpiId, uint256 indexed startupId, string kpiType)",
  "event TeamMemberAdded(uint256 indexed memberId, uint256 indexed startupId, address memberAddress)",
  "event StartupVerified(uint256 indexed startupId, bool isVerified)",
  "event ReputationUpdated(address indexed user, uint32 reputation)",
  
  // Functions
  "function createStartup(string memory _name, string memory _description) external returns (uint256)",
  "function recordMetric(uint256 startupId, string memory _metricType, externalEuint32 value, bytes calldata inputProof) external returns (uint256)",
  "function createKPI(uint256 startupId, string memory _kpiType, uint256 _targetValue, uint256 _deadline) external returns (uint256)",
  "function updateKPIProgress(uint256 kpiId, externalEuint32 currentValue, bytes calldata inputProof) external",
  "function addTeamMember(uint256 startupId, address memberAddress, string memory _role, externalEuint32 salary, bytes calldata inputProof) external returns (uint256)",
  "function updateTeamMemberPerformance(uint256 memberId, externalEuint32 performance, bytes calldata inputProof) external",
  "function verifyStartup(uint256 startupId, bool isVerified) external",
  "function updateReputation(address user, euint32 reputation) external",
  
  // View functions
  "function getStartupInfo(uint256 startupId) external view returns (string memory name, string memory description, uint8 revenue, uint8 customerCount, uint8 teamSize, uint8 fundingRaised, bool isActive, bool isVerified, address owner, uint256 createdAt, uint256 lastUpdated)",
  "function getMetricInfo(uint256 metricId) external view returns (uint8 value, string memory metricType, address reporter, uint256 timestamp)",
  "function getKPIInfo(uint256 kpiId) external view returns (uint8 targetValue, uint8 currentValue, uint8 progress, string memory kpiType, address owner, uint256 deadline, bool isAchieved)",
  "function getTeamMemberInfo(uint256 memberId) external view returns (uint8 performance, uint8 salary, string memory role, address memberAddress, bool isActive, uint256 joinedAt)",
  "function getUserReputation(address user) external view returns (uint8)",
  "function getUserStartups(address user) external view returns (uint256[] memory)",
  
  // State variables
  "function startupCounter() external view returns (uint256)",
  "function metricCounter() external view returns (uint256)",
  "function kpiCounter() external view returns (uint256)",
  "function teamMemberCounter() external view returns (uint256)",
  "function owner() external view returns (address)",
  "function verifier() external view returns (address)"
] as const;

// Contract address (will be set after deployment)
export const STARTUP_OPS_ADDRESS = "0x..."; // To be updated after deployment
