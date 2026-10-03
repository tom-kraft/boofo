// Boofo design system site: builds every section from tokens.json and the content/*.md files.
(function () {
  var IMG = 'images/';
  // bump BUILD (and the ?v= on site.js in index.html) after editing, so browsers fetch fresh copies
  var BUILD = '2';
  var V = {}, USAGE = {}, PASSES_HTML = '';
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  function hex(n, d) {
    var v = V[n]; if (!v) return '';
    var m = /^\{(.+)\}$/.exec(v);
    return m && (d || 0) < 8 ? hex(m[1], (d || 0) + 1) : v;
  }
  function img(path, alt, cls) {
    return '<img loading="lazy" decoding="async" src="' + IMG + path + '" alt="' + esc(alt) + '"' + (cls ? ' class="' + cls + '"' : '') +
      ' onerror="this.outerHTML=\'<div class=missing>Image not uploaded yet: ' + esc(path) + '</div>\'">';
  }
  function chip(t) {
    var n = t[0], label = t[1] || '', h = hex(n);
    return '<div class="chip"><button type="button" data-copy="' + h + '" title="' + esc(USAGE[n] || '') + '">' +
      '<div class="sw" style="background:' + h + '"></div><b>' + n + '</b><code>' + h + '</code>' +
      (label ? '<span>' + esc(label) + '</span>' : '') + '</button></div>';
  }
  function grp(title, items) {
    return '<div class="grp"><h3>' + esc(title) + '</h3><div class="chips">' +
      items.map(function (i) { return chip(typeof i === 'string' ? [i] : i); }).join('') + '</div></div>';
  }

  var CAST = [
    { name: 'Santa Claus', img: 'Cast/cast-06-santa-suit.jpg', cap: 'Cover: suit, belt, leather mittens and the sleigh.',
      blurb: 'Red suit with paper-white fur trim outdoors. In the house and workshop, a white shirt, red trousers and suspenders. A big blush and a red nose.',
      groups: [['Suit and sleigh', [['santa-red', 'Suit, hat, sleigh'], ['santa-red-light', 'Lit folds'], ['santa-red-deep', 'Deep folds']]],
        ['Workshop clothes', [['santa-trouser-red', 'Trousers, suspenders'], ['paper-white', 'Shirt, beard, fur'], ['paper-shade', 'Shading on white']]],
        ['Leather and trim', [['santa-leather', 'Mittens, reins, shoes'], ['santa-leather-deep', 'Leather shadow'], ['santa-buckle', 'Buckle, bells'], ['santa-sleigh-green', 'Sleigh seat']]],
        ['Face', [['skin-base', 'Base'], ['skin-shadow', 'Shadow'], ['skin-blush', 'Cheeks, nose']]]] },
    { name: 'Mr. Boom', img: 'Cast/cast-07-mr-boom.jpg', cap: 'Page 27: the full costume.',
      blurb: 'The eldest elf brother and the leader. Black hair and heavy brows, a royal-blue shirt, striped suspenders, mustard trousers and slouchy purple boots.',
      groups: [['Shirt', [['boom-blue', 'Base'], ['boom-blue-light', 'Lit planes'], ['boom-blue-deep', 'Folds']]],
        ['Trousers and boots', [['boom-mustard', 'Trousers'], ['boom-mustard-light', 'Lit planes'], ['boom-boot', 'Boots']]],
        ['Suspenders and face', [['boom-suspender', 'Red stripes'], ['paper-white', 'White stripes'], ['skin-blush', 'Cheeks']]]] },
    { name: 'Mr. Bam', img: 'Cast/cast-08-mr-bam.jpg', cap: 'Page 27: smock, glasses and frown.',
      blurb: 'The middle brother: grumpy, then sorry. Round gold glasses, a purple smock with pencils in the pocket, blue trousers and red boots.',
      groups: [['Smock', [['bam-purple', 'Base'], ['bam-purple-light', 'Lit planes'], ['bam-purple-deep', 'Folds']]],
        ['Trousers, boots, glasses', [['bam-blue', 'Trousers'], ['bam-boot-red', 'Boots'], ['bam-glasses', 'Wire frames']]],
        ['Face', [['skin-base', 'Base'], ['skin-blush', 'Cheeks']]]] },
    { name: 'Mr. Bim', img: 'Cast/cast-09-mr-bim.jpg', cap: 'Page 27: tunic, hat and hair.',
      blurb: "The youngest elf and Boofo's first friend. Orange-red hair, a green laced tunic, and a yellow-orange pointed hat with a green cuff and a gold bell.",
      groups: [['Tunic', [['bim-green', 'Base'], ['bim-green-lime', 'Sleeves, lit planes'], ['bim-green-deep', 'Folds']]],
        ['Hair and hat', [['bim-hair', 'Hair'], ['bim-hat', 'Hat cone'], ['bim-hat-orange', 'Hat shadow'], ['bim-hat-band', 'Hat cuff'], ['santa-buckle', 'Bell']]],
        ['Face', [['skin-base', 'Base'], ['skin-blush', 'Freckled cheeks']]]] },
    { name: 'Reindeer and harness', img: 'Cast/cast-05-reindeer-team.jpg', cap: 'Back cover: the team in flight.',
      blurb: 'A lighter, tanner brown than Boofo, with a red harness, a green saddle-cloth and gold trim and bells.',
      groups: [['Fur', [['reindeer-fur', 'Body'], ['reindeer-fur-light', 'Muzzle, belly'], ['reindeer-fur-deep', 'Shadow, antlers']]],
        ['Harness', [['santa-red', 'Straps'], ['reindeer-saddle', 'Saddle-cloth'], ['reindeer-trim', 'Trim and bells']]]] }
  ];
  var BOOFO = [['Coat (base, shadow, deep, light, glow)', [['boofo-coat', 'Base everywhere brown'], ['boofo-coat-shadow', 'Under jaw, belly, far legs'], ['boofo-coat-deep', 'Tight creases only'], ['boofo-coat-light', 'Crown, cheeks, tops'], ['boofo-coat-glow', 'Warm rim light']]],
    ['White markings', [['paper-white', 'Muzzle, bib, paws, tail tip'], ['boofo-white', 'Where paper needs a tint'], ['boofo-white-shadow', 'Shading on the whites']]],
    ['Ink and pads', [['boofo-ear', 'Ears, tuft, nose, pupils'], ['boofo-pad', 'Paw pads'], ['boofo-pad-light', 'Pad highlight']]],
    ['Mouth', [['boofo-mouth', 'Inside of mouth'], ['boofo-tongue', 'Tongue'], ['boofo-tongue-light', 'Tongue tip']]]];
  var POSES = [['boofo-04-cover-happy-front.jpg', 'Happy, front (cover)'], ['boofo-08-startled-jumping.jpg', 'Startled, jumping back (p. 24)'],
    ['boofo-06-worried-front.jpg', 'Worried (p. 20)'], ['boofo-09-sitting-sad.jpg', 'Sad, sitting (p. 27)'], ['boofo-07-barking-angry.jpg', 'Barking, angry (p. 13)'],
    ['boofo-02-walking-profile.jpg', 'Walking, profile (p. 25)'], ['boofo-03-head-profile-ears-flying.jpg', 'Running, ears flying (p. 25)'],
    ['boofo-11-running-with-list.jpg', 'Running with the list (p. 32)'], ['boofo-10-carrying-letters.jpg', 'Carrying letters (p. 29)'],
    ['boofo-05-tumble-paw-pads.jpg', 'Tumbling, pads up (p. 12)'], ['boofo-01-workbench-three-quarter.jpg', 'Busy helper (p. 28)'],
    ['boofo-12-asleep-basket.jpg', 'Asleep in basket (p. 35)'], ['boofo-13-asleep-quilt-vignette.jpg', 'Asleep, vignette (p. 7)']];
  var SCENES = [['scene-01-cover-day-snow.jpg', 'Snowy day', ['sky-day', 'sky-day-light', 'mountain-lilac', 'snow-shadow', 'snow-shadow-deep', 'snow-lilac', 'pine-green', 'pine-deep', 'house-ochre']],
    ['scene-02-dusk-village.jpg', 'Christmas Eve dusk', ['sky-dusk', 'sky-dusk-glow', 'mountain-lilac-pale', 'snow-shadow', 'snow-shadow-deep', 'fire-yellow']],
    ['scene-03-workshop-interior.jpg', 'Workshop interior', ['wall-butter', 'wall-butter-deep', 'wood-honey', 'wood-amber', 'wood-brown', 'wood-deep']],
    ['scene-05-fireside-interior.jpg', "Santa's house, fireside", ['wall-butter', 'floor-blush', 'wood-amber', 'wood-deep', 'fire-yellow', 'fire-orange']],
    ['scene-06-workshop-fire.jpg', 'Workshop fire', ['fire-yellow', 'fire-orange', 'paper-shade', 'wood-deep', 'boofo-coat-glow']]];
  var PASSES = [['boofo-coat', 'boofo-coat-shadow', 'boofo-coat-deep', 'boofo-coat-light', 'Boofo coat'],
    ['santa-red', 'santa-red-deep', 'santa-red-deep', 'santa-red-light', 'Santa suit'],
    ['boom-blue', 'boom-blue-deep', 'boom-blue-deep', 'boom-blue-light', "Mr. Boom's shirt"],
    ['bam-purple', 'bam-purple-deep', 'bam-purple-deep', 'bam-purple-light', "Mr. Bam's smock"],
    ['bim-green', 'bim-green-deep', 'bim-green-deep', 'bim-green-lime', "Mr. Bim's tunic"],
    ['skin-base', 'skin-shadow', 'skin-blush', 'skin-light', 'Skin (blush as the accent)'],
    ['paper-white', 'snow-shadow', 'snow-shadow-deep', 'paper-white', 'Snow (paper first)']];
  var PALETTE = [['Ink and paper', ['ink-', 'paper-']], ['Boofo', ['boofo-']], ['Skin', ['skin-']], ['Santa and sleigh', ['santa-']], ['Mr. Bim', ['bim-']],
    ['Mr. Bam', ['bam-']], ['Mr. Boom', ['boom-']], ['Reindeer', ['reindeer-']], ['Snow, sky and mountains', ['snow-', 'sky-', 'mountain-', 'pine-']],
    ['Interiors and fire', ['wall-', 'wood-', 'floor-', 'house-', 'fire-']], ['Logo', ['logo-']]];

  function render(tokens) {
    tokens.color.tokens.forEach(function (t) { V[t.name] = t.value; USAGE[t.name] = t.usage || ''; });
    var names = tokens.color.tokens.map(function (t) { return t.name; });

    $('boofo-card').innerHTML = '<div class="char"><div class="figs">' +
      '<figure><div class="frame">' + img('Boofo/boofo-01-workbench-three-quarter.jpg', 'Boofo on the workbench, page 28') + '</div><figcaption>Page 28: three-quarter view, the full coat, bib and paw markings.</figcaption></figure>' +
      '<figure><div class="frame">' + img('Boofo/boofo-04-cover-happy-front.jpg', 'Boofo grinning on the cover') + '</div><figcaption>Cover: front view, open mouth and tongue.</figcaption></figure>' +
      '</div><div>' + BOOFO.map(function (g) { return grp(g[0], g[1]); }).join('') + '</div></div>';

    $('poses-grid').innerHTML = POSES.map(function (p) {
      var m = /^(.*?)\s*\((.+)\)$/.exec(p[1]), title = m ? m[1] : p[1], where = m ? m[2] : '';
      return '<figure class="pose"><a href="' + IMG + 'Boofo/' + p[0] + '" target="_blank" rel="noopener" aria-label="Open full crop: ' + esc(p[1]) + '"><div class="im">' + img('Boofo/' + p[0], 'Boofo: ' + p[1]) + '</div></a>' +
        '<figcaption>' + esc(title) + (where ? '<small>' + esc(where) + '</small>' : '') + '</figcaption></figure>';
    }).join('');

    $('cast-cards').innerHTML = CAST.map(function (c) {
      return '<div class="char"><div class="figs"><figure><div class="frame">' + img(c.img, c.name + ' reference from book one') + '</div><figcaption>' + esc(c.cap) + '</figcaption></figure></div><div>' +
        '<h3 class="name">' + esc(c.name) + '</h3><p class="blurb">' + esc(c.blurb) + '</p>' + c.groups.map(function (g) { return grp(g[0], g[1]); }).join('') + '</div></div>';
    }).join('');

    $('scene-rows').innerHTML = SCENES.map(function (s) {
      return '<div class="scene"><figure><a class="frame" style="display:block" href="' + IMG + 'Scenes/' + s[0] + '" target="_blank" rel="noopener">' + img('Scenes/' + s[0], s[1] + ' reference page') + '</a></figure><div>' + grp(s[1], s[2]) + '</div></div>';
    }).join('');

    var cells = function (b, sh, dp, lt) {
      return [['Flat', [[b, 100]]], ['+ Shadow', [[b, 55], [sh, 45]]], ['+ Deep', [[b, 55], [sh, 37], [dp, 8]]], ['+ Light', [[lt, 22], [b, 33], [sh, 37], [dp, 8]]]];
    };
    PASSES_HTML = '<div class="passes" role="group" aria-label="How each region builds up"><div class="cap">How each region builds up, top of the strip = lit side</div>' + PASSES.map(function (p) {
      return '<div class="srow"><b>' + esc(p[4]) + '</b>' + cells(p[0], p[1], p[2], p[3]).map(function (c) {
        return '<div class="sc"><div class="st">' + c[1].map(function (x) { return '<i style="background:' + hex(x[0]) + ';height:' + x[1] + '%"></i>'; }).join('') + '</div>' + c[0] + '</div>';
      }).join('') + '</div>';
    }).join('') + '</div>';

    var used = {};
    $('palette-groups').innerHTML = PALETTE.map(function (g) {
      var toks = names.filter(function (n) { return !used[n] && g[1].some(function (p) { return n.indexOf(p) === 0; }); });
      toks.forEach(function (n) { used[n] = 1; });
      return grp(g[0], toks.map(function (n) { return [n]; }));
    }).join('');

    var fam = tokens.type.families;
    $('type-rows').innerHTML = tokens.type.groups.map(function (g) {
      return g.styles.map(function (s) {
        var family = fam[s.family || g.family];
        var style = 'font-family:' + family + ';font-size:' + s.fontSize + ';line-height:' + s.lineHeight + ';font-weight:' + s.fontWeight + (s.fontStyle ? ';font-style:' + s.fontStyle : '');
        return '<div class="type-row"><div class="meta"><b>' + esc(s.name) + '</b>' + esc(s.fontSize + ' / ' + s.lineHeight + ' · ' + s.fontWeight) + '<br>' + esc(s.usage || '') + '</div><div class="spec" style="' + esc(style) + '">' + esc(s.sample || s.name) + '</div></div>';
      }).join('');
    }).join('');

    loadMarkdown();
  }

  function decorate(root) {
    // put a color dot before every `token-name` that is a color
    root.querySelectorAll('code').forEach(function (c) {
      var h = hex(c.textContent.trim());
      if (h) { var d = document.createElement('span'); d.className = 'dot'; d.style.background = h; c.parentNode.insertBefore(d, c); c.title = h; }
    });
  }
  function loadMarkdown() {
    document.querySelectorAll('[data-md]').forEach(function (el) {
      fetch(el.getAttribute('data-md') + '?v=' + BUILD).then(function (r) { return r.text(); }).then(function (txt) {
        el.innerHTML = window.marked ? window.marked.parse(txt) : '<pre>' + esc(txt) + '</pre>';
        decorate(el);
        var after = el.getAttribute('data-after');
        if (after && PASSES_HTML) {
          var h = [].filter.call(el.querySelectorAll('h2'), function (x) { return x.textContent.trim() === after; })[0];
          var list = h && h.nextElementSibling;
          while (list && !/^(OL|UL)$/.test(list.tagName) && list.tagName !== 'H2') list = list.nextElementSibling;
          if (list && list.tagName !== 'H2') list.insertAdjacentHTML('afterend', PASSES_HTML); else el.insertAdjacentHTML('afterbegin', PASSES_HTML);
        }
      }).catch(function () { el.textContent = 'Could not load ' + el.getAttribute('data-md'); });
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-copy]');
    if (!b) return;
    var v = b.getAttribute('data-copy'), t = $('toast');
    var done = function () { t.textContent = 'Copied ' + v; t.classList.add('on'); setTimeout(function () { t.classList.remove('on'); }, 1400); };
    if (navigator.clipboard) navigator.clipboard.writeText(v).then(done, done); else done();
  });

  // highlight the nav link for the section in view
  var links = {};
  [].forEach.call(document.querySelectorAll('nav.bar a'), function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); });
        var a = links[e.target.id];
        if (a && a.scrollIntoView && a.parentNode.parentNode.scrollWidth > a.parentNode.parentNode.clientWidth) {
          var ul = a.parentNode.parentNode; ul.scrollLeft = a.offsetLeft - 24;
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    [].forEach.call(document.querySelectorAll('main section'), function (s) { io.observe(s); });
  }

  fetch('tokens.json?v=' + BUILD).then(function (r) { return r.json(); }).then(render).catch(function () {
    document.querySelector('main').insertAdjacentHTML('afterbegin', '<p>Could not load tokens.json.</p>');
  });
})();
