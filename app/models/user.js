'use strict';

var bcrypt = require('bcrypt'),
    Mongo  = require('mongodb'),
    _      = require('underscore-contrib');
function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, function(err,obj){
    var user = Object.create(User.prototype);
    user = _.extend(user, obj);
    cb(err, user);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    o.type = 'local';
    User.collection.save(o, cb);
  });
};

User.localAuthenticate = function(email, password, cb){
  User.collection.findOne({email:email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.prototype.save = function(o, cb){
  var properties = Object.keys(o),
       self      = this;
  properties.forEach(function(property){
    self[property] = o[property];

  });

  User.collection.save(this, cb);
};

User.twitterAuthenticate = function(token, secret, twitter, cb){
  User.collection.findOne({twitterId:twitter.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {twitterId:twitter.id, username:twitter.username, displayName:twitter.displayName, type: 'twitter'};
    User.collection.save(user, cb);
  });
};


User.githubAuthenticate = function(token, secret, github, cb){
  User.collection.findOne({githubId:github.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {githubId:github.id, username:github.username, type: 'github'};
    User.collection.save(user, cb);
  });
};

User.googleAuthenticate = function(token, secret, google, cb){
  User.collection.findOne({googleId:google.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {googleId:google.id, username:google.username, type: 'google'};
    User.collection.save(user, cb);
  });
};

User.trelloAuthenticate = function(token, secret, trello, cb){
  User.collection.findOne({trelloId:trello.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {trelloId:trello.id, username:trello.username, type: 'trello'};
    User.collection.save(user, cb);
  });
};

User.evernoteAuthenticate = function(token, secret, evernote, cb){
  User.collection.findOne({evernoteId:evernote.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {evernoteId:evernote.id, username:evernote.username, type: 'evernote'};
    User.collection.save(user, cb);
  });
};
module.exports = User;

