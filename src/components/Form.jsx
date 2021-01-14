import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    
`;

const Ballot = styled.form`
    display: flex;
    justify-content: center;
`;

export default function Form() {
    return (
        <Container>
            <Ballot>
                <input placeholder="Enter your candidate" />
            </Ballot>
        </Container>
    )
}
