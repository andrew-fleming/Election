import React, { useState } from 'react'
import styled from 'styled-components'
import Results from './Results'

const Container = styled.div`
    
`;

const WriteIn = styled.form`
    display: flex;
    justify-content: center;
`;

const Ballot = styled(WriteIn)`
`;

export default function Form(props) {

    const [candidate, setCandidate] = useState('')
    const [newCandidate, setNewCandidate] = useState('')

    const handleCandidate = async(e) => {
        e.preventDefault()
        setNewCandidate(e.target.value)
    }

    const handleVote = async(e) => {
        e.preventDefault()
        setCandidate(e.target.value)
    }

    return (
        <>
        <Container>

            <WriteIn>
                <input 
                    placeholder="Add Candidate..."
                    onChange={handleCandidate}
                />
                <button onClick={props.addCandidate} >Add</button>
            </WriteIn>
            <br />
            <Ballot>
                <input 
                    placeholder="Vote for Candidate..."
                    onChange={handleVote}    
                />
                <button onClick={props.vote}>Vote</button>
            </Ballot>
        </Container>

        <Results 
            newCandidate={newCandidate}

        />



        </>
    )
}
