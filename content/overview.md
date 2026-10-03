The look of *Boofo: The Dog That Goes Where Santa Goes* (2014), illustrated by Dick Dugan, written down so the line art of a second book can be colored to match. Every value here was sampled from the printed first book. Read **Character guide** before you color a figure. Read **Coloring the line art** before you start a page.

## The look in one paragraph

A bold black ink drawing comes first, colored with transparent marker and watercolor, then finished with colored pencil. The characters are bright and saturated, with strong shadows laid in visible marker strokes. Every human face has big rosy cheeks. The backgrounds are pale, loose washes that fade to white at the page edges. White comes from bare paper, never from paint: snow, Santa's fur, Boofo's markings and the glints in eyes are all paper. Snow is never grey. It is white paper with blue shadows and a little lilac pencil. The mood is warm, comic and cosy, in the tradition of mid-century animation.

## Visual foundations

### Line

- Ink every contour in `ink-line`. The outer contour is about `line-contour` wide and swells on the shadow side. Interior detail (toes, fur flicks, freckle dots, fabric folds) is about `line-detail` wide.
- Color never covers the line. Lay the flats under the ink layer.
- Fill solid blacks in `ink-line`, not in a dark color: Boofo's ears, his crown tuft, the elves' hair, pupils, Santa's belt and boots.
- Draw motion lines, speed lines and "wobble" arcs in ink only, with no color behind them.

### Color

- Each costume or coat gets a **base**, a **shadow** and a **light**: `boofo-coat` / `boofo-coat-shadow` / `boofo-coat-light`, `boom-blue` / `boom-blue-deep` / `boom-blue-light`, and so on. Lay the base flat first. Add the shadow in strokes that follow the form, then put the light on the top planes. Never blend the three into a smooth airbrushed gradient. The marker-stroke edges should show.
- Use full-strength color for the characters and pale color for the background. A figure's base color is always more saturated than anything behind it.
- Leave a `halo-gap` of white paper between a figure's contour and the background wash. The wash stops just short of the line, so figures pop off the page.
- Shade anything white with `paper-shade` (cool) or `boofo-white-shadow` (warm, on Boofo only). Never use a neutral grey.
- Paint skin in `skin-base` with `skin-shadow` under the brows, nose and chin. Then add a large round `skin-blush` on both cheeks and the nose tip, fading out through `skin-blush-soft`. The blush is a signature of the book: no face goes without it.
- Keep `logo-yellow` and `logo-red` for the title panel and cover credits. They are the only perfectly flat colors in the book. Don't use them inside the illustrations.

### Texture

- Add colored-pencil hatching on top of the washes: `snow-lilac` in snow shadows, `mountain-lilac` streaks on hills, and a few `boofo-coat-light` flicks on fur. Hatch on a diagonal, loosely.
- Pine trees are loose dabs of `pine-green` with `pine-deep` under ink branch strokes, partly buried in white snow.
- Wood is a flat `wood-honey` or `wood-amber` wash with `wood-brown` grain lines and knots drawn in color, not in ink.

### Composition and page

- Pages are 768 × 1024 units, portrait. Story text sits in a block above or beside the art. The art either bleeds off the edges or floats on white as a spot illustration.
- Behind text, fade the background to white or near-white so the type reads (`ink-text` on `paper-white`, 18:1).
- A spot illustration sits on a pale floor wash: `floor-blush` in Santa's house, `wood-honey` in the workshop, `snow-shadow` outdoors. The wash fades out to white at its edges.

## Typography

- Set story text in `story-body` (Georgia, 22 on 30). Indent each paragraph by `indent-para` and keep a `page-margin` on both sides.
- Set song and poem titles in `poem-title` and verses in `poem`, inside a framed panel. In book one that panel is a candy-cane or garland border, or a wooden board.
- Set the subtitle under the logo in `series-subtitle`: capitals, `ink-line` on `logo-yellow`.
- Set credits in `cover-credit` (cover, `logo-red`) or `title-credit` (title page, `ink-text`). Use `cue` for prompts such as *Sing the Boofo Song* and `folio` for page numbers.

## Logo

- The BOOFO wordmark is hand-lettered: chunky rounded capitals in `logo-red` with a heavy black outline and a ™. It sits in a flat `logo-yellow` rectangle with the subtitle under it. Use the artwork in the **Logo** group as supplied. Never retype it in a font.

## Reference images

- **Boofo**: 13 crops of Boofo from book one. Together they cover every angle, mood and lighting condition in the book.
- **Cast**: Santa, Mr. Boom, Mr. Bam and Mr. Bim, the other elves and the reindeer team.
- **Scenes**: one full page for each lighting condition (snowy day, dusk, workshop, fireside, fire).
- **Logo**: the cover title panel.
