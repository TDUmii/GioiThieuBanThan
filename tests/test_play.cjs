const test = require('node:test');
const assert = require('node:assert/strict');
const { shuffled, createOrderGame, createMemoryGame, createPawGame, createPassport } = require('../static/js/play.js');

test('shuffle preserves every item without mutating the source', () => {
  const source = [0, 1, 2, 3, 4, 5];
  const result = shuffled(source, () => 0);
  assert.deepEqual([...result].sort(), source);
  assert.deepEqual(source, [0, 1, 2, 3, 4, 5]);
  assert.notDeepEqual(result, source);
});
test('order game rejects wrong/repeated answers and finishes in narrative order', () => {
  const game = createOrderGame(4);
  assert.equal(game.choose(2).kind, 'wrong');
  assert.equal(game.choose(0).progress, 1);
  assert.equal(game.choose(0).kind, 'ignored');
  assert.equal(game.choose(2).progress, 1);
  game.choose(1); game.choose(2);
  assert.equal(game.choose(3).kind, 'complete');
  assert.equal(game.choose(3).kind, 'ignored');
});
test('memory ignores repeated tiles and locks input until a mismatch settles', () => {
  const game = createMemoryGame(['a', 'b', 'a', 'b', 'c', 'c']);
  assert.equal(game.flip(-1).kind, 'ignored');
  assert.equal(game.flip(0).kind, 'first');
  assert.equal(game.flip(0).kind, 'ignored');
  assert.equal(game.flip(1).kind, 'miss');
  assert.equal(game.flip(2).kind, 'ignored');
  assert.deepEqual(game.settle(), [0, 1]);
  game.flip(0);
  assert.equal(game.flip(2).count, 1);
  assert.equal(game.flip(0).kind, 'ignored');
  game.flip(1); game.flip(3); game.flip(4);
  assert.equal(game.flip(5).kind, 'complete');
  assert.deepEqual(game.settle(), []);
});
test('memory reset/closure can clear a single open tile safely', () => {
  const game = createMemoryGame([0, 0]);
  game.flip(0); assert.deepEqual(game.settle(), [0]);
  assert.equal(game.flip(0).kind, 'first');
  assert.equal(game.flip(1).kind, 'complete');
});
test('paw target moves to a different cell and completes exactly six hits', () => {
  const game = createPawGame(9, 6, () => .4);
  const first = game.target;
  assert.equal(game.hit((first + 1) % 9).progress, 0);
  for (let i = 1; i <= 6; i++) {
    const previous = game.target;
    const result = game.hit(previous);
    assert.equal(result.progress, i);
    assert.notEqual(game.target, previous);
    assert.equal(result.kind, i === 6 ? 'complete' : 'correct');
  }
  assert.equal(game.hit(0).kind, 'ignored');
});
test('passport counts each valid activity once and fully resets', () => {
  const passport = createPassport();
  assert.equal(passport.collect('outside'), false);
  ['photo', 'order', 'memory', 'paw'].forEach(key => {
    assert.equal(passport.collect(key), true); assert.equal(passport.collect(key), false);
  });
  assert.equal(passport.count, 4); passport.reset();
  assert.equal(passport.count, 0); assert.equal(passport.collect('photo'), true);
});
