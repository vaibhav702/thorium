const express = require('express');
const router = express.Router();

let players = []; // empty array
router.post('/players', function (req, res) {
    let player = req.body;
    let playerName = player.name
    for (let i = 0; i < players.length; i++)
        if (players[i].name === playerName) {
            res.send('player is present')
        } //it will check if player is there or not if same name cames it will say player is present
    players.push(player);
    console.log('it is player from request', players)
    res.send(players)
});
router.post('/players/:playerName/bookings/:bookingId', function (req, res) {
    let name = req.params.playerName
    // let bookingId = req.params.bookingId
    let isplayerPresent = true
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == name) {
            isplayerPresent = true
        }

    }
    if (!isplayerPresent) {
        return res.send('player is not there')
    }
    let booking = req.body
    let bookingId = req.params.bookingId

    for (let i = 0; i < players.length; i++) {
        if (players[i].name == name) {

            for (let j = 0; j < players[i].bookings.length; j++) {
                if (players[i].bookings[j].bookingNumber == bookingId) {
                    return res.send('booking is already there')


                }

            }

            players[i].bookings.push[booking]

        }
    }
    res.send(players)
})

module.exports = router;
// adding this comment for no reason