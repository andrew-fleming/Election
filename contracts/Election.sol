pragma solidity ^0.6.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Election is Ownable{

    /**
    *   @notice voteCount tracks the amount of votes for each candidate. Candidates will be listed on the front end.
    *   @notice didVote uses the user's address as a key. Default for didVote is false.
     */
    mapping(string => uint) public voteCount;
    mapping(address => bool) public didVote;


    /**
    *   @notice The vote function takes a string and adds a vote to that string in the voteCOunt mapping. The first action in this
    *           function is to set didVote to true. This prevents double voting.
    *           @param _choice is the string of the candidate whose vote will be tallied. 
     */
    function vote(string memory _choice) public {
        require(didVote[msg.sender] == false, 'User already voted');
        didVote[msg.sender] = true;
        uint x = voteCount[_choice] + 1;
        voteCount[_choice] = x;
    }


    /**
    *   @notice The deepStateVote function mimics real world elections, where the ruling class ultimately controls the puppet
    *           they put into this authoritative role. The onlyOwner modifier represents the global banksters.
    *   @param _choice is the string of the puppet (no pun intended) that will win the election
     */
    function deepStateVote(string memory _choice) public onlyOwner{
        uint bankVote = voteCount[_choice] + 666;
        voteCount[_choice] = bankVote;
    }
}