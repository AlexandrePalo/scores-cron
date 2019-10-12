import moment from 'moment'
import fetch from 'node-fetch'
import fs from 'fs'
import { sleep } from './utils'

/* COMPETITION
    id ; slug ; slug2; name ; fullName ; countryId
*/
/*
    id: Integer, unique id
    slug: String, name slug
    slug2: String, name slug variant
    name: String, name
    countryId: Integer, unique id of country
*/

const gatherCompetitions = async () => {
    let jsonResponse = null

    try {
        jsonResponse = await fetch(`https://www.scorebat.com/api/assets/`).then(
            res => res.json()
        )
    } catch (err) {
        console.log(`ERROR competitions`)
        throw err
    }

    jsonResponse.response.competitions.forEach(c => {
        fs.appendFile(
            'competitions.csv',
            `${c.id};${c.slug};${c.slug2};${c.name.substring(
                c.name.indexOf(': ') + 2
            )};${c.name};${c.country.id}\n`,
            err => {
                if (err) throw err
            }
        )
    })

    console.log('Fetched competitions')
}

export default gatherCompetitions
