import moment from 'moment'
import fetch from 'node-fetch'
import fs from 'fs'
import { sleep } from './utils'

/* TEAM
    id ; slug ; name ; countryId ; country ; isClub
*/
/*
    id: Integer, unique id
    slug: String, name slug
    name: String, name
    countryId: String (!), unique id of country
    country: String, name of the country
    isClub: Integer 1 or 0, 0 for national selection, 1 for club
*/

const getTeamsForLetter = async letter => {
    let jsonResponse = null

    try {
        jsonResponse = await fetch(
            `https://www.scorebat.com/api/teamd/${letter}/`
        ).then(res => res.json())
    } catch (err) {
        console.log(`ERROR letter ${letter}`)
        return { teams: [], dt: null }
    }

    return { teams: jsonResponse.response, dt: jsonResponse.currentTime }
}

const gatherTeams = async () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    for (let i = 0; i < letters.length; i++) {
        const data = await getTeamsForLetter(letters[i])

        data.teams.forEach(t => {
            fs.appendFile(
                `${letters[i]}.csv`,
                `${t.id};${t.slug};${t.name};${Number(t.countryId)};${
                    t.country
                };${t.isClub === 1 ? 'club' : 'selection'}\n`,
                err => {
                    if (err) throw err
                }
            )
        })
        console.log(`Fetched letter ${letters[i]}`)

        await sleep(2000)
    }
}

export default gatherTeams
