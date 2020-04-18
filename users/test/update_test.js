const assert = require('assert');
const User = require('../src/user');
describe('Updating records', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => done());
  });
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }
  // instance update
  it('instance type using set and save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  // Class based update
  it('A modal class can update', (done) => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done);
  });
  it('A modal class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });
  it('A modal class can find a record with an Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });
  // it('A user can have their postCount increment by 1', () => {
  //   // Mongo update modifiers
  //   User.updateMany({ name: 'Joe' }, { $inc: { likes: 1 } })
  //     .then(() => User.findOne({ name: 'Joe' }))
  //     .then((user) => {
  //       console.log('user console', user);
  //       assert(user.postCount === 1);
  //     });
  // });
});
