(function () {
  'use strict';

  function shuffled(items, random) {
    var result = items.slice();
    random = random || Math.random;
    for (var i = result.length - 1; i > 0; i--) {
      var j = Math.floor(random() * (i + 1));
      var temp = result[i]; result[i] = result[j]; result[j] = temp;
    }
    return result;
  }

  function createOrderGame(total) {
    var progress = 0;
    return { choose: function (index) {
      if (index < progress) { return { kind: 'ignored', progress: progress }; }
      if (index !== progress || progress >= total) { return { kind: 'wrong', progress: progress }; }
      progress++;
      return { kind: progress === total ? 'complete' : 'correct', progress: progress };
    } };
  }

  function createMemoryGame(pairs) {
    var matched = new Set();
    var opened = [];
    return {
      flip: function (index) {
        if (index < 0 || index >= pairs.length || matched.has(index) || opened.includes(index) || opened.length === 2) {
          return { kind: 'ignored' };
        }
        opened.push(index);
        if (opened.length === 1) { return { kind: 'first', indices: opened.slice() }; }
        var indices = opened.slice();
        if (pairs[indices[0]] !== pairs[indices[1]]) { return { kind: 'miss', indices: indices }; }
        indices.forEach(function (value) { matched.add(value); });
        opened = [];
        return { kind: matched.size === pairs.length ? 'complete' : 'match', indices: indices, count: matched.size / 2 };
      },
      settle: function () { var indices = opened.slice(); opened = []; return indices; }
    };
  }

  function createPawGame(size, goal, random) {
    random = random || Math.random;
    var target = Math.floor(random() * size);
    var progress = 0;
    return {
      get target() { return target; },
      hit: function (index) {
        if (progress === goal) { return { kind: 'ignored', progress: progress, target: -1 }; }
        if (index !== target) { return { kind: 'wrong', progress: progress, target: target }; }
        progress++;
        if (progress === goal) { target = -1; return { kind: 'complete', progress: progress, target: target }; }
        var next = Math.floor(random() * (size - 1));
        target = next >= target ? next + 1 : next;
        return { kind: 'correct', progress: progress, target: target };
      }
    };
  }

  function createPassport() {
    var stamps = new Set();
    return {
      collect: function (key) {
        if (!['photo', 'order', 'memory', 'paw'].includes(key) || stamps.has(key)) { return false; }
        stamps.add(key); return true;
      },
      get count() { return stamps.size; },
      reset: function () { stamps.clear(); }
    };
  }

  // Pure state machines are shared with the dependency-free Node tests.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { shuffled: shuffled, createOrderGame: createOrderGame, createMemoryGame: createMemoryGame, createPawGame: createPawGame, createPassport: createPassport };
  }
  if (typeof document === 'undefined') { return; }

  var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var animations = new Set();
  var passport = createPassport();
  var passportStatus = document.querySelector('[data-passport-status]');
  var thanks = document.querySelector('[data-passport-thanks]');
  var stampNodes = Array.from(document.querySelectorAll('[data-quest]'));

  function motion(element, frames, duration) {
    if (!element || document.hidden || motionPreference.matches || typeof element.animate !== 'function') { return; }
    var animation = element.animate(frames, { duration: duration || 300, easing: 'cubic-bezier(.16, 1, .3, 1)' });
    animations.add(animation);
    animation.onfinish = animation.oncancel = function () { animations.delete(animation); };
  }
  function stopMotion() { animations.forEach(function (animation) { animation.cancel(); }); animations.clear(); }

  function collect(key) {
    if (!passport.collect(key)) { return; }
    var stamp = stampNodes.find(function (node) { return node.dataset.quest === key; });
    stamp.classList.add('is-collected');
    stamp.setAttribute('aria-label', stamp.dataset.questLabel + ': đã hoàn thành');
    motion(stamp, [{ transform: 'rotate(-22deg) scale(.8)' }, { transform: 'rotate(-8deg) scale(1)' }]);
    passportStatus.textContent = passport.count + ' / 4 dấu.' + (passport.count === 4 ? ' Bạn đã ghé hết album!' : ' Chơi tiếp trong album nhé.');
    if (passport.count === 4) {
      thanks.hidden = false;
      motion(thanks, [{ opacity: .4, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0 0 0)' }], 500);
    }
  }

  var photoButton = document.querySelector('[data-photo-play]');
  var photoStamp = document.querySelector('[data-photo-stamp]');
  var photoStatus = document.querySelector('[data-photo-status]');
  photoButton.addEventListener('click', function () {
    photoStamp.hidden = false;
    motion(photoStamp, [{ opacity: .3, transform: 'rotate(-22deg) scale(1.35)' }, { opacity: 1, transform: 'rotate(-12deg) scale(1)' }], 420);
    photoStatus.textContent = 'Một dấu ghé chơi đã nằm trên tấm ảnh. Đi tiếp nhé!';
    collect('photo');
  });

  var orderButtons = Array.from(document.querySelectorAll('[data-order]'));
  var orderSlots = Array.from(document.querySelectorAll('[data-order-slot]'));
  var orderStatus = document.querySelector('[data-order-status]');
  var orderGame;
  function resetOrder() {
    orderGame = createOrderGame(orderButtons.length);
    orderSlots.forEach(function (slot, index) { slot.replaceChildren(); var number = document.createElement('span'); number.textContent = index + 1; slot.append(number); });
    shuffled(orderButtons).forEach(function (button) { button.setAttribute('aria-pressed', 'false'); button.parentElement.append(button); });
    orderStatus.textContent = 'Bắt đầu từ kỷ niệm đầu tiên.';
  }
  orderButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var result = orderGame.choose(Number(button.dataset.order));
      if (result.kind === 'ignored') { return; }
      if (result.kind === 'wrong') {
        orderStatus.textContent = 'Chưa đúng. Nhìn lại dấu mốc số ' + (result.progress + 1) + ' nhé.';
        return;
      }
      button.setAttribute('aria-pressed', 'true');
      var slot = orderSlots[result.progress - 1];
      slot.append(button.querySelector('svg').cloneNode(true));
      var title = document.createElement('small'); title.textContent = button.textContent.trim(); slot.append(title);
      motion(slot, [{ opacity: .5, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }]);
      orderStatus.textContent = result.kind === 'complete' ? 'Đúng rồi! Những ngày ấy đã về đúng chỗ.' : 'Đã xếp đúng ' + result.progress + ' / 4 dấu mốc.';
      if (result.kind === 'complete') { collect('order'); }
    });
  });
  document.querySelector('[data-order-reset]').addEventListener('click', resetOrder);

  var memoryBoard = document.querySelector('[data-memory-board]');
  var memoryTiles = Array.from(memoryBoard.querySelectorAll('[data-pair]'));
  var memoryStatus = document.querySelector('[data-memory-status]');
  var memoryTimer = null;
  var memoryGame;
  var pairCount = 0;
  var turns = 0;
  function hideMismatch() {
    if (memoryTimer !== null) { window.clearTimeout(memoryTimer); memoryTimer = null; }
    var indices = memoryGame.settle();
    indices.forEach(function (index) {
      var tile = memoryTiles[index]; tile.classList.remove('is-revealed'); tile.setAttribute('aria-pressed', 'false'); tile.setAttribute('aria-label', 'Lật ảnh ' + (index + 1));
    });
    if (indices.length) { memoryStatus.textContent = pairCount + ' / 3 cặp, ' + turns + ' lượt thử. Chọn một ảnh để tiếp tục.'; }
  }
  function resetMemory() {
    if (memoryTimer !== null) { window.clearTimeout(memoryTimer); memoryTimer = null; }
    memoryTiles = shuffled(memoryTiles);
    memoryTiles.forEach(function (tile, index) {
      tile.classList.remove('is-revealed', 'is-matched'); tile.setAttribute('aria-pressed', 'false'); tile.setAttribute('aria-label', 'Lật ảnh ' + (index + 1)); memoryBoard.append(tile);
    });
    memoryGame = createMemoryGame(memoryTiles.map(function (tile) { return tile.dataset.pair; }));
    pairCount = 0; turns = 0; memoryStatus.textContent = 'Tìm đủ 3 cặp ảnh.';
  }
  memoryTiles.forEach(function (tile) {
    tile.addEventListener('click', function () {
      var index = memoryTiles.indexOf(tile);
      var result = memoryGame.flip(index);
      if (result.kind === 'ignored') { return; }
      tile.classList.add('is-revealed'); tile.setAttribute('aria-pressed', 'true'); tile.setAttribute('aria-label', tile.dataset.photoName + ' Ảnh ' + (index + 1));
      motion(tile.querySelector('img'), [{ clipPath: 'inset(0 50% 0 50%)' }, { clipPath: 'inset(0 0 0 0)' }], 220);
      if (result.kind === 'first') { memoryStatus.textContent = 'Ảnh đầu: ' + tile.dataset.photoName + ' Chọn ảnh thứ hai.'; return; }
      turns++;
      if (result.kind === 'miss') {
        memoryStatus.textContent = 'Chưa thành một cặp. Thử nhớ vị trí hai ảnh nhé.';
        memoryTimer = window.setTimeout(function () { hideMismatch(); memoryStatus.textContent = pairCount + ' / 3 cặp, ' + turns + ' lượt thử.'; }, 850);
        return;
      }
      pairCount = result.count;
      result.indices.forEach(function (value) {
        memoryTiles[value].classList.add('is-matched'); memoryTiles[value].setAttribute('aria-label', memoryTiles[value].dataset.photoName + ' Đã ghép cặp.');
      });
      memoryStatus.textContent = result.kind === 'complete' ? 'Đủ 3 cặp trong ' + turns + ' lượt. Bạn nhớ ảnh thật tốt!' : pairCount + ' / 3 cặp, ' + turns + ' lượt thử.';
      if (result.kind === 'complete') { collect('memory'); }
    });
  });
  document.querySelector('[data-memory-reset]').addEventListener('click', resetMemory);
  document.querySelector('[data-memory-panel]').addEventListener('toggle', function (event) {
    if (!event.target.open) { hideMismatch(); }
  });
  // Native toggle events may coalesce on rapid close/reopen. Clear before closing.
  document.querySelector('[data-memory-panel] summary').addEventListener('click', function () {
    if (this.parentElement.open) { hideMismatch(); }
  });

  var pawCells = Array.from(document.querySelectorAll('[data-paw-cell]'));
  var pawStatus = document.querySelector('[data-paw-status]');
  var pawGame;
  function showPaw() {
    pawCells.forEach(function (cell, index) {
      var active = index === pawGame.target;
      cell.setAttribute('aria-pressed', String(active));
      cell.setAttribute('aria-label', 'Dấu chân ' + (index + 1) + (active ? ', đang sáng' : ''));
    });
  }
  function resetPaw() { pawGame = createPawGame(pawCells.length, 6); showPaw(); pawStatus.textContent = 'Đã theo được 0 / 6 bước.'; }
  pawCells.forEach(function (cell, index) {
    cell.addEventListener('click', function (event) {
      var result = pawGame.hit(index);
      if (result.kind === 'ignored') { return; }
      if (result.kind === 'wrong') { pawStatus.textContent = 'Theo dấu chân màu vàng nhé. Đã được ' + result.progress + ' / 6 bước.'; return; }
      showPaw();
      pawStatus.textContent = result.kind === 'complete' ? 'Về đích rồi! Một vòng chơi thật vui.' : 'Đã theo được ' + result.progress + ' / 6 bước.';
      if (result.kind === 'complete') { collect('paw'); }
      else {
        var next = pawCells[result.target];
        motion(next.querySelector('svg'), [{ transform: 'rotate(-20deg) scale(.75)' }, { transform: 'rotate(0) scale(1)' }], 260);
        if (event.detail === 0) { next.focus({ preventScroll: true }); }
      }
    });
  });
  document.querySelector('[data-paw-reset]').addEventListener('click', resetPaw);

  document.querySelector('[data-passport-reset]').addEventListener('click', function () {
    stopMotion(); passport.reset(); thanks.hidden = true; photoStamp.hidden = true;
    photoStatus.textContent = 'Có 4 dấu ghé chơi dọc album. Thử một chút nhé?';
    passportStatus.textContent = '0 / 4 dấu. Những trò nhỏ nằm dọc album.';
    stampNodes.forEach(function (stamp) { stamp.classList.remove('is-collected'); stamp.setAttribute('aria-label', stamp.dataset.questLabel + ': chưa hoàn thành'); });
    resetOrder(); resetMemory(); resetPaw();
  });
  document.querySelectorAll('details[data-play-zone]').forEach(function (panel) {
    panel.addEventListener('toggle', function () { window.dispatchEvent(new Event('resize')); });
  });
  motionPreference.addEventListener('change', function () { if (motionPreference.matches) { stopMotion(); } });
  document.addEventListener('visibilitychange', function () { if (document.hidden) { stopMotion(); hideMismatch(); } });

  resetOrder(); resetMemory(); resetPaw();
  document.querySelectorAll('[data-play-zone]').forEach(function (zone) { zone.hidden = false; });
}());
