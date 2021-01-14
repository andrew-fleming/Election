pragma solidity ^0.6.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Election is Ownable{
    
    mapping(Candidate => uint) public voteCount;
    mapping(address => bool) public didVote;
    
    enum Candidate { orangeMan, sleepyJoe, noOne }

    Candidate candidate;
    
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function vote(uint _choice) public {
        require(didVote[msg.sender] == false, 'User already voted');
        didVote[msg.sender] = true;
        uint addVote = voteCount[sha3(_choice)] + 1;
        voteCount[sha3(_choice)] = addVote;
    }
    
    function deepStateVote(uint _choice) public onlyOwner{
        uint bankVote = voteCount[sha3(_choice)] + 666;
        voteCount[sha3(_choice)] = bankVote;
    }
}