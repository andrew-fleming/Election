import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'



export default function Candidate(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.votes}</td>
            <td>{props.percentage}</td>
        </tr>
    )
}

Candidate.propTypes = {
    name: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
}