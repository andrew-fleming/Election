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
            
            //check if candidate was added
            result = await election.getCandidateInfo(1).then((resArray => {
                return resArray[0]
            }))
            assert.equal(result, 'Orange Man')
        })

        it('adds vote to candidate', async() => {
            //check vote count before
            result = await election.getCandidateInfo(1).then((resArray => {
                return resArray[1]
            }))

            assert.equal(result, 0)

            //vote
            await election.vote(1, {from: alice})

            //check vote went through
            result = await election.getCandidateInfo(1).then((resArray => {
                return resArray[1]
            }))

            assert.equal(result, 1)
        })

        it('only allows one vote per address', async() => {
            //should be rejected
            await election.vote(1, {from: alice}).should.be.rejected

            //allows a different address to vote
            await election.vote(1, {from: bob})

            //check vote count
            result = await election.getCandidateInfo(1).then((resArray => {
                return resArray[1]
            }))

            assert.equal(result, 2)
        })

        it('allows the bank to choose the winner', async() => {
            //add new candidate
            election.addCandidate('Sleepy Joe')

            //check candidate struct
            result = await election.getCandidateInfo(2).then((resArray => {
                return resArray[0]
            }))

            assert.equal(result, 'Sleepy Joe')

            //add bank vote
            election.bankVote(2, {from: alice})

            //check votes
            result = await election.getCandidateInfo(2).then((resArray => {
                return resArray[1]
            }))

            assert.equal(result, 666)
        })
    })

})