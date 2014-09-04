'use strict';

var local        = require('./local'),
    twitter      = require('./twitter'),
    github       = require('./github'),
    trello       = require('./trello'),
    evernote     = require('./evernote'),
    google       = require('./google'),
    serialize    = require('./serialize'),
    deserialize  = require('./deserialize');

module.exports = function(passport, app){
  passport.use(local);
  passport.use(twitter);
  passport.use(github);
  passport.use(trello);
  passport.use(google);
  passport.use(evernote);
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);

  app.use(passport.initialize());
  app.use(passport.session());
};

