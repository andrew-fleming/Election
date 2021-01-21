import React from 'react'
import styled from 'styled-components'
import Candidate from './Candidate'

const Container = styled.div`
    padding-left: 3rem;
`;

const Title = styled.h2`

`;

const Th = styled.th`
    border: 1px solid #cccccc;
    width: 16vh;
`;

export default function Results(props) {


    let name = 'Orange Man'
    let percentage = 100 + '%'



    return (
        <Container>
            <Title>Candidates</Title>
            <table>
                <thead>
                    <tr>
                        <Th>Candidate</Th>
                        <Th>Votes</Th>
                        <Th>Percentage</Th>
                    </tr>                    
                </thead>
            <tbody>
        <Candidate key={key} 
        
        />
            </tbody>
            </table>
        </Container>
    )
}
