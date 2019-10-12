import moment from 'moment'
import fetch from 'node-fetch'
import fs from 'fs'
import { sleep } from './utils'

/* MATCH
    date YYYY-MM-DD ; id ; s ; c ; s1Id ; s2Id ; s1 ; s2 ; sc1 ; sc2 ; dt ; nr ; h ; srt ; tp 
*/
/*
    id: Integer, unique id
    s: String, position of match time.
        - not started
        1T first half
        2T second half
        FT finished
    sc1: Integer, score of team 1
    sc2: Integer, score of team 2
    wh: Integer unix timestamp
    nr: Integer
    h: Integer
    dt: Integer unix timestamp, match start
    c: Integer, competition id ?
    s1: String, team 1 label
    s2: String, team 2 label
    s1Id: Integer, unique id of team 1
    s2Id: Integer, unique id of team 2
*/
const getScoreBatJson = async (date = false) => {
    let jsonResponse = null

    try {
        jsonResponse = await fetch(
            `https://www.scorebat.com/api/feed/${
                date
                    ? 'date/' +
                      moment(date, 'YYYY-MM-DD').format('YYYY') +
                      '/' +
                      moment(date, 'YYYY-MM-DD').format('MM') +
                      '/' +
                      moment(date, 'YYYY-MM-DD').format('DD') +
                      '/'
                    : ''
            }`
        ).then(res => res.json())
    } catch (err) {
        console.log(`ERROR ${date}`)
        return { games: [], dt: null }
    }

    const games = jsonResponse.response.g
    const dt = jsonResponse.currentTime

    return { games, dt }
}
const gatherMatches = async (from, to) => {
    let date = moment(from, 'YYYY-MM-DD')
    from = moment(from, 'YYYY-MM-DD')
    to = moment(to, 'YYYY-MM-DD')
    const d = to.diff(from, 'days')

    for (let i = 1; i <= d; i++) {
        const json = await getScoreBatJson(date)

        json.games.forEach(g => {
            fs.appendFile(
                `${date.format('YYYY-MM')}.csv`,
                `${date.format('YYYY-MM-DD')};${g.id};${g.s};${g.c};${g.s1Id};${
                    g.s2Id
                };${g.s1};${g.s2};${g.sc1};${g.sc2};${g.dt};${g.nr};${g.h};${
                    g.srt
                };${g.tp ? g.tp : ''}\n`,
                err => {
                    if (err) throw err
                }
            )
        })
        if (date.format('MM') !== date.add(1, 'days').format('MM')) {
            console.log(
                `Fetched ${date.subtract(1, 'days').format('YYYY-MM')}.`
            )
        }

        await sleep(2000)
        date = date.add(1, 'days')
    }
}

export default gatherMatches
