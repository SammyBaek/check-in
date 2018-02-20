const passport = require('passport');

module.exports = (router) => {
    router.use('/auth/google/get',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    router.use('/auth/google/callback',
        passport.authenticate('google',{ failureRedirect: '#/signIn' }),
        (req, res) => {
            res.redirect('/dash');
        }
    );

    router.use('/current_user', (req, res) => {
        res.send(req.user);
    });

    router.use('/logout', (req, res) => {
        console.log('redirecting?');
        req.logout();
        res.redirect('/');
    });
};
