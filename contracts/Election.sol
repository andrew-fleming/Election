pragma solidity ^0.6.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Election is Ownable {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public didVote;

    
    uint public candidatesCount; 
    

    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _id) public {
        require(didVote[msg.sender] != true, 'You already voted');
        require(_id <= candidatesCount, 'Candidate does not exist');
        didVote[msg.sender] = true;
        candidates[_id].voteCount++;
    }
   
    function bankVote(uint _id) public onlyOwner {
        require(_id <= candidatesCount, 'Candidate does not exist, sire');
        candidates[_id].voteCount += 666;
    }

    function getCandidateInfo(uint _id) public view returns(string memory, uint){
        Candidate memory candidate = candidates[_id];
        return (candidate.name, candidate.voteCount);
    }
    
}