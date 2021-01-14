import React, { useState, useAsync, useEffect } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import { unlockAccount } from '../api/web3'

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

    const loadAccount = async() => {

        const web3 = window.web3

        const user = await web3.eth.getAccounts()
        setAccount(user)
    }

    useEffect(() => {
        if(account === ''){
            loadWeb3()
            loadAccount()
        }
    })







    return (
    <Wrapper>
      <Div>
        MetaMask
          <Button >
            MetaMask
          </Button>
        Account: { account }
      </Div>
    </Wrapper>
    )
}
