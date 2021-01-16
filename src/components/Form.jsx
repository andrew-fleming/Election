import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    
`;

const Ballot = styled.form`
    display: flex;
    justify-content: center;
`;

export default function Form(props) {

    const [candidate, setCandidate] = useState('')

    const handleVote = async(e) => {
        e.preventDefault()
        setCandidate(e.target.value)
    }

    return (
        <Container>
            <Ballot>
                <input 
                    placeholder="Enter your candidate"
                    onChange={handleVote}    
                />
                <button onClick={props.vote}>Submit</button>
            </Ballot>
        </Container>
    )
}
