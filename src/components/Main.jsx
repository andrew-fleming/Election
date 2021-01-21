import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import Election from '../abi/Election'

import Form from './Form'

const Wrapper = styled.div`
  display: flex;
  justify-content: center
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;



export default function Main() {



  const [account, setAccount] = useState('')
  const [election, setElection] = useState({})
  const [voteCount, setVoteCount] = useState('')
  const [numCandidates, setNumCandidates] = useState('')

    const loadWeb3 = async() => {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadBlockchainData = async() => {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      const user = accounts[0]
      setAccount(user)
      const networkId = await web3.eth.net.getId()
      const networkData = Election.networks[networkId]

      if(networkData) {
        const contract = new web3.eth.Contract(Election.abi, networkData.address)
        return contract
      } else {
        window.alert('Smart contract not deployed on current network')
      }
  
    }

    const fetchNumCandidates = async(_contract) => {
      let num = await _contract.methods.candidatesCount().call()
      setNumCandidates(num)
      console.log(num)
    }

    const addCandidate = async(_name) => {
      let name = await election.methods.addCandidate(_name).send()
      .on('receipt', receipt => {
        console.log(receipt)
      })
    }

    const fetchCandidate = async(_contract) => {
      let name = await _contract.methods
    }

    const fetchVotes = useCallback(async(_contract) => {
      let count = await _contract.methods.voteCount(0).call()
      setVoteCount(count)
    }, [setVoteCount])


    useEffect(() => {
            loadWeb3()
            loadBlockchainData().then(async(res) => {
              await setElection(res)
              await fetchNumCandidates(res)
              //fetchVotes(res)
              //fetchCandidate(res)
            }) 
    }, [])

    useEffect(() => {
      if(numCandidates > 0){
        fetchVotes()
      }
    }, [numCandidates, fetchVotes])



    const vote = async(_candidate) => {
      let config = { from: account }
      election.methods.vote(_candidate).send(config)
        .on('receipt', function(receipt){
          console.log(receipt)
        })
    }


    return (
      <>
    <Wrapper>
      <Div>
        Account: { account }
        <br/>
        {numCandidates}
      </Div>
    </Wrapper>
      <br/>
      <Form vote={vote}/>
    </>
    )
}
