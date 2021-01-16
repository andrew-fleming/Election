import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    padding-left: 3rem;
`;

const Title = styled.h2`

`;

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 16vh;
`;

export default function Results(props) {


    let name = 'Orange Man'
    let percentage = 100 + '%'



    return (
        <Container>
            <Title>Candidates</Title>
            <tr>
                <Td>{name}</Td>
                <Td>{props.voteCount}</Td>
                <Td>{percentage}</Td>
            </tr>
        </Container>
    )
}
