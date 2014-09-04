var TrelloStrategy = require('passport-trello').Strategy,
    User            = require('../../models/user'),
    config          = require('../../../config'),
    trello          = new TrelloStrategy(
                    {
                      consumerKey:    config.trello.apiKey,
                      consumerSecret: config.trello.apiSecret,
                      callbackURL:    config.trello.callbackUrl
                    },
                    User.trelloAuthenticate);

module.exports = trello;

