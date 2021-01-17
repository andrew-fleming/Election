const { assert } = require('chai')
const chai = require('chai')
const { default: Web3 } = require('web3')

const Election = artifacts.require('Election')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Election', ([alice, bob, carol, dave]) => {
    let election, result

    //recreate migration
    before(async() => {
        election = await Election.new()
    })

    describe('election deployment', async() => {
        it('has an owner', async() => {
            const owner = await election.owner.call()
            assert.equal(owner, alice, 'Owner not set')
        })
    })

    describe('Voting', async() => {
        it('adds candidate to struct', async() => {
            await election.addCandidate('Orange Man')
            
            result = await election.getCandidateInfo(1).then((resArray => {
                return resArray[0]
            }))
            assert.equal(result, 'Orange Man')
        })

        
    })

})