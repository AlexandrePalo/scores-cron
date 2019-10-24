import moment from 'moment'
import fetch from 'node-fetch'
import fs from 'fs'
import { sleep } from './utils'

/* MATCH
    date YYYY-MM-DD ; id ; s ; c ; s1Id ; s2Id ; s1 ; s2 ; sc1 ; sc2 ; dt ; nr ; h ; srt ; tp ; f1 ; f2 
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
    
    f1: String, formation team 1
    f2: String, formation team 2
    
    ch1: String JSON array of objects, changements for team 1 [{ namePlayer1, idPlayer1, namePlayer2, idPlayer2, timer }]
    ch2: String JSON array, changements for team 1 [{ namePlayer1, idPlayer1, namePlayer2, idPlayer2, timer }]
    
*/

const getMatchDetails = async (id) => {
    const json = await fetch(`...${id}`)
      .then(res => res.json())
      } catch (err) {
          console.log('Error during fetch')
      }
      
    fs.appendFile(
                `matchesDetails.csv`,
                `${date.format('YYYY-MM-DD')};${json.id};${json.s};${json.c};${json.s1Id};${
                    json.s2Id
                };${json.s1};${json.s2};${json.sc1};${json.sc2};${json.dt};${json.nr};${json.h};${
                    json.srt
                };${json.tp ? json.tp : ''};
                ${json.f1};${json.f2};
                ${json.sb1.map(o => )};
                ${};
                \n`,
                err => {
                    if (err) throw err
                }
    )
    
}
