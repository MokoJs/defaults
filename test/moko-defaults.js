require('co-mocha');

var moko = require('moko'),
    expect = require('expect.js');

var defaults = require('../');

describe('moko-defaults', function() {
  var User = moko('user');
  User.use(defaults);

  User.attr('username', { default: 'Bob' });

  it('supports simple attributes', function*() {
    User.attr('gender', { default: 'female' });
    var user = yield new User();
    expect(user.gender).to.be('female');
  });

  it('supports functions', function*() {
    User.attr('age', { default: function(u) {
      expect(u).to.be.a(User);
      return Math.floor( 5 * Math.random() );
    }});
    var user = yield new User();
    expect(user.age).to.be.greaterThan(0);
    expect(user.age).to.be.lessThan(5);
  });

  it('supports generators', function*() {
    User.attr('another', {default: function*(u) {
      expect(u).to.be.a(User);
      return 3;
    }});
    var u = yield new User();
    expect(u.another).to.be(3);
  });

  it('doesnt overwrite attributes that already exist', function*() {
    var user = yield new User({username: 'Tom'});
    expect(user.username).to.be('Tom');
  });
});
