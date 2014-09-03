'use strict';

var config = {};

config.twitter = {
  apiKey      : 'qVn9sxnxkAAqVDNYRHbT7aO5Q',
  apiSecret   : process.env.TWITTER_SECRET,
  callbackUrl : 'http://mark-vm.com:2110/auth/twitter/callback'
};

config.github = {
  clientID       : '85eaf05f17128917aa28',
  clientSecret   : process.env.GITHUB_SECRET,
  callbackURL    : 'http://mark-vm.com:2110/auth/github/callback'
};
config.google = {
  clientID       : '728621919511-qim53tmkudfd7p6llimrsqbvu209ta8g.apps.googleusercontent.com',
  clientSecret   : process.env.GOOGLE_SECRET,
  callbackUrl    : 'http://mark-vm.com:2110/auth/google/callback'
};
module.exports = config;