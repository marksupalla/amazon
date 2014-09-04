var EvernoteStrategy = require('passport-evernote').Strategy,
    User             = require('../../models/user'),
    config           = require('../../../config'),
    evernote         = new EvernoteStrategy(
                    {
                      consumerKey:    config.evernote.apiKey,
                      consumerSecret: config.evernote.apiSecret,
                      callbackURL:    config.evernote.callbackUrl
                    },
                    User.evernoteAuthenticate);

module.exports = evernote;

