import React, { useState, useEffect } from 'react'
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

const Button = styled.button`
  width: 5rem;
  height: 2.5rem;
`;



export default function Main() {

  const [account, setAccount] = useState('')


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
        const election = new web3.eth.Contract(Election.abi, networkData.address)
        console.log(election)
      } else {
        window.alert('Smart contract not deployed on current network')
      }
  
    }

    useEffect(() => {
            loadWeb3()
            loadBlockchainData()
    }, [])



    return (
      <>
    <Wrapper>
      <Div>
          <Button >
            MetaMask
          </Button>
        Account: { account }
      </Div>
    </Wrapper>
      <br/>
      <Form/>
    </>
    )
}
