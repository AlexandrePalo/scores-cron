import moment from 'moment'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { sleep, slugify } from './utils'

/* COUNTRY
    id ; name ; gb
*/
/*
    id: Integer, unique id
    name: String, name
    flag: String, url of the flag (64px default)
    bc: String, initials ?
*/

const gatherCountries = async () => {
    let jsonResponse = null

    try {
        jsonResponse = await fetch(`https://www.scorebat.com/api/assets/`).then(
            res => res.json()
        )
    } catch (err) {
        console.log(`ERROR countries`)
        throw err
    }
    const originCountries = jsonResponse.response.competitions.map(c => {
        return c.country
    })
    const countries = Array.from(new Set(originCountries.map(c => c.id))).map(
        id => originCountries.find(c => c.id === id)
    )

    countries.forEach(async c => {
        fs.appendFile('countries.csv', `${c.id};${c.name};${c.bc}\n`, err => {
            if (err) throw err
        })
    })

    console.log('Fetched countries')
}

export default gatherCountries
