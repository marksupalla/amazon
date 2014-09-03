
var GithubStrategy = require('passport-github').Strategy,
    User            = require('../../models/user'),
    config          = require('../../../config'),
    github         = new GithubStrategy(
                    {
                      clientID:     config.github.clientID,
                      clientSecret: config.github.clientSecret,
                      callbackURL:  config.github.callbackUrl
                    },
                    User.githubAuthenticate);

module.exports = github;

