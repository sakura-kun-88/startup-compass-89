// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract StartupOps is SepoliaConfig {
    using FHE for *;
    
    struct Startup {
        euint32 startupId;
        euint32 revenue;
        euint32 customerCount;
        euint32 teamSize;
        euint32 fundingRaised;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        address owner;
        uint256 createdAt;
        uint256 lastUpdated;
    }
    
    struct Metric {
        euint32 metricId;
        euint32 value;
        string metricType; // "revenue", "customers", "team_size", "funding"
        address reporter;
        uint256 timestamp;
    }
    
    struct KPI {
        euint32 kpiId;
        euint32 targetValue;
        euint32 currentValue;
        euint32 progress;
        string kpiType;
        address owner;
        uint256 deadline;
        bool isAchieved;
    }
    
    struct TeamMember {
        euint32 memberId;
        euint32 performance;
        euint32 salary;
        string role;
        address memberAddress;
        bool isActive;
        uint256 joinedAt;
    }
    
    mapping(uint256 => Startup) public startups;
    mapping(uint256 => Metric) public metrics;
    mapping(uint256 => KPI) public kpis;
    mapping(uint256 => TeamMember) public teamMembers;
    mapping(address => euint32) public userReputation;
    mapping(address => uint256[]) public userStartups;
    
    uint256 public startupCounter;
    uint256 public metricCounter;
    uint256 public kpiCounter;
    uint256 public teamMemberCounter;
    
    address public owner;
    address public verifier;
    
    event StartupCreated(uint256 indexed startupId, address indexed owner, string name);
    event MetricRecorded(uint256 indexed metricId, uint256 indexed startupId, string metricType);
    event KPICreated(uint256 indexed kpiId, uint256 indexed startupId, string kpiType);
    event TeamMemberAdded(uint256 indexed memberId, uint256 indexed startupId, address memberAddress);
    event StartupVerified(uint256 indexed startupId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createStartup(
        string memory _name,
        string memory _description
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Startup name cannot be empty");
        
        uint256 startupId = startupCounter++;
        
        startups[startupId] = Startup({
            startupId: FHE.asEuint32(0),
            revenue: FHE.asEuint32(0),
            customerCount: FHE.asEuint32(0),
            teamSize: FHE.asEuint32(0),
            fundingRaised: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            owner: msg.sender,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        userStartups[msg.sender].push(startupId);
        
        emit StartupCreated(startupId, msg.sender, _name);
        return startupId;
    }
    
    function recordMetric(
        uint256 startupId,
        string memory _metricType,
        externalEuint32 value,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(startups[startupId].owner == msg.sender, "Only startup owner can record metrics");
        require(startups[startupId].isActive, "Startup must be active");
        
        uint256 metricId = metricCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalValue = FHE.fromExternal(value, inputProof);
        
        metrics[metricId] = Metric({
            metricId: FHE.asEuint32(0),
            value: internalValue,
            metricType: _metricType,
            reporter: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update startup metrics based on type
        if (keccak256(bytes(_metricType)) == keccak256(bytes("revenue"))) {
            startups[startupId].revenue = internalValue;
        } else if (keccak256(bytes(_metricType)) == keccak256(bytes("customers"))) {
            startups[startupId].customerCount = internalValue;
        } else if (keccak256(bytes(_metricType)) == keccak256(bytes("team_size"))) {
            startups[startupId].teamSize = internalValue;
        } else if (keccak256(bytes(_metricType)) == keccak256(bytes("funding"))) {
            startups[startupId].fundingRaised = internalValue;
        }
        
        startups[startupId].lastUpdated = block.timestamp;
        
        emit MetricRecorded(metricId, startupId, _metricType);
        return metricId;
    }
    
    function createKPI(
        uint256 startupId,
        string memory _kpiType,
        uint256 _targetValue,
        uint256 _deadline
    ) public returns (uint256) {
        require(startups[startupId].owner == msg.sender, "Only startup owner can create KPIs");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 kpiId = kpiCounter++;
        
        kpis[kpiId] = KPI({
            kpiId: FHE.asEuint32(0),
            targetValue: FHE.asEuint32(uint32(_targetValue)),
            currentValue: FHE.asEuint32(0),
            progress: FHE.asEuint32(0),
            kpiType: _kpiType,
            owner: msg.sender,
            deadline: _deadline,
            isAchieved: false
        });
        
        emit KPICreated(kpiId, startupId, _kpiType);
        return kpiId;
    }
    
    function updateKPIProgress(
        uint256 kpiId,
        externalEuint32 currentValue,
        bytes calldata inputProof
    ) public {
        require(kpis[kpiId].owner == msg.sender, "Only KPI owner can update progress");
        require(block.timestamp <= kpis[kpiId].deadline, "KPI deadline has passed");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalValue = FHE.fromExternal(currentValue, inputProof);
        
        kpis[kpiId].currentValue = internalValue;
        
        // Calculate progress percentage (simplified)
        // In a real implementation, this would be more complex
        kpis[kpiId].progress = FHE.div(
            FHE.mul(internalValue, FHE.asEuint32(100)),
            kpis[kpiId].targetValue
        );
        
        // Check if KPI is achieved (progress >= 100%)
        kpis[kpiId].isAchieved = FHE.gte(kpis[kpiId].progress, FHE.asEuint32(100));
    }
    
    function addTeamMember(
        uint256 startupId,
        address memberAddress,
        string memory _role,
        externalEuint32 salary,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(startups[startupId].owner == msg.sender, "Only startup owner can add team members");
        require(memberAddress != address(0), "Invalid member address");
        
        uint256 memberId = teamMemberCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalSalary = FHE.fromExternal(salary, inputProof);
        
        teamMembers[memberId] = TeamMember({
            memberId: FHE.asEuint32(0),
            performance: FHE.asEuint32(0),
            salary: internalSalary,
            role: _role,
            memberAddress: memberAddress,
            isActive: true,
            joinedAt: block.timestamp
        });
        
        // Update team size
        startups[startupId].teamSize = FHE.add(startups[startupId].teamSize, FHE.asEuint32(1));
        
        emit TeamMemberAdded(memberId, startupId, memberAddress);
        return memberId;
    }
    
    function updateTeamMemberPerformance(
        uint256 memberId,
        externalEuint32 performance,
        bytes calldata inputProof
    ) public {
        require(teamMembers[memberId].memberAddress == msg.sender || 
                startups[userStartups[msg.sender][0]].owner == msg.sender, 
                "Only member or startup owner can update performance");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalPerformance = FHE.fromExternal(performance, inputProof);
        
        teamMembers[memberId].performance = internalPerformance;
    }
    
    function verifyStartup(uint256 startupId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify startups");
        require(startups[startupId].owner != address(0), "Startup does not exist");
        
        startups[startupId].isVerified = isVerified;
        emit StartupVerified(startupId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getStartupInfo(uint256 startupId) public view returns (
        string memory name,
        string memory description,
        uint8 revenue,
        uint8 customerCount,
        uint8 teamSize,
        uint8 fundingRaised,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 createdAt,
        uint256 lastUpdated
    ) {
        Startup storage startup = startups[startupId];
        return (
            startup.name,
            startup.description,
            0, // FHE.decrypt(startup.revenue) - will be decrypted off-chain
            0, // FHE.decrypt(startup.customerCount) - will be decrypted off-chain
            0, // FHE.decrypt(startup.teamSize) - will be decrypted off-chain
            0, // FHE.decrypt(startup.fundingRaised) - will be decrypted off-chain
            startup.isActive,
            startup.isVerified,
            startup.owner,
            startup.createdAt,
            startup.lastUpdated
        );
    }
    
    function getMetricInfo(uint256 metricId) public view returns (
        uint8 value,
        string memory metricType,
        address reporter,
        uint256 timestamp
    ) {
        Metric storage metric = metrics[metricId];
        return (
            0, // FHE.decrypt(metric.value) - will be decrypted off-chain
            metric.metricType,
            metric.reporter,
            metric.timestamp
        );
    }
    
    function getKPIInfo(uint256 kpiId) public view returns (
        uint8 targetValue,
        uint8 currentValue,
        uint8 progress,
        string memory kpiType,
        address owner,
        uint256 deadline,
        bool isAchieved
    ) {
        KPI storage kpi = kpis[kpiId];
        return (
            0, // FHE.decrypt(kpi.targetValue) - will be decrypted off-chain
            0, // FHE.decrypt(kpi.currentValue) - will be decrypted off-chain
            0, // FHE.decrypt(kpi.progress) - will be decrypted off-chain
            kpi.kpiType,
            kpi.owner,
            kpi.deadline,
            kpi.isAchieved
        );
    }
    
    function getTeamMemberInfo(uint256 memberId) public view returns (
        uint8 performance,
        uint8 salary,
        string memory role,
        address memberAddress,
        bool isActive,
        uint256 joinedAt
    ) {
        TeamMember storage member = teamMembers[memberId];
        return (
            0, // FHE.decrypt(member.performance) - will be decrypted off-chain
            0, // FHE.decrypt(member.salary) - will be decrypted off-chain
            member.role,
            member.memberAddress,
            member.isActive,
            member.joinedAt
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getUserStartups(address user) public view returns (uint256[] memory) {
        return userStartups[user];
    }
}
