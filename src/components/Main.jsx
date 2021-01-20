import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import Election from '../abi/Election'

import Form from './Form'
import Results from './Results'

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
  const [candidate, setCandidate] = useState([]);


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

    const addCandidate = async(_name) => {
      let name = await election.methods.addCandidate(_name).send()
      .on('receipt', receipt => {
        console.log(receipt)
      })
    }

    const fetchCandidate = async(_contract) => {
      let name = await _contract.methods
      console.log(name)
    }

    const fetchVotes = async(_contract) => {
      let count = await _contract.methods.voteCount(0).call()
      setVoteCount(count)
    }


    useEffect(() => {
            loadWeb3()
            loadBlockchainData().then(res => {
              setElection(res)
              //fetchVotes(res)
              //fetchCandidate(res)
            }) 
    }, [])



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
      </Div>
    </Wrapper>
      <br/>
      <Form vote={vote}/>
    </>
    )
}
