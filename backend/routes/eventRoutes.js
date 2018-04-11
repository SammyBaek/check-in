const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('users');
const Event = mongoose.model('events');

router.post('/rsvp', async (req, res) => {
  const event = await Event.findById(req.body.id);

  if (event) {
    let pOut = event.guestsRSVP.map(async id => User.findById(id));
    pOut = pOut.concat(
      event.open.guestsRSVP.map(async id => User.findById(id))
    );
    const out = await Promise.all(pOut);
    res.send(out);
  } else
    console.error(
      '[ERR] Event was not found. Passed in id: ' +
        req.body.id +
        ' in /event/rsvp'
    );
});

router.post('/attend', async (req, res) => {
  const event = await Event.findById(req.body.id);
  if (event) {
    const pOut = event.guestsAttend.map(async guest => {
      // TODO: fix this
      // earlier version only had list of guests
      // but now it's list of json {guest, timestamp}
      let user = null;
      if (typeof guest === 'string' || guest instanceof String) {
        user = await User.findById(guest);
      } else {
        user = await User.findById(guest.guest);
      }

      let isRepeat = await event.isRepeat();
      console.log(new Date(), isRepeat);
      // if (event.isRepeat(function(isRepeat) {
      //   console.log(isRepeat);
      // }));
      return user;
    });
    const out = await Promise.all(pOut);
    res.send(out);
  } else
    console.error(
      '[ERR] Event was not found. Passed in id: ' +
        req.body.id +
        ' in /event/attend'
    );
});

module.exports = router;
