# Kalamuna wireframe starter theme

This is a starter theme that uses Kalamuna's standard wireframe styles, which allows general site building to commence before the final visual designs have been completed.

This theme has also been created with accessibility in mind, with the goal of ensuring that some best practices are followed by default.

## Using this theme

Copy the contents of this repository in your local web/themes/custom/ directory.

Rename the `themename` directory and project files to be the name of your new theme. Grep the codebase for `themename` and change all instances to the name of your theme.

## Compiling the source files

This project is using node-sass to compile scss files to css. Run `npm install` and then `npm run build` or `npm run watch`.

The CSS can also be built using `scssphp` by composer in the website root, in cases where node is not available in the site building step (such as Pantheon's integrated composer).

## Technical decisions and philosophy

The base theme is Stable, since the advantages gained by using Classy add more overhead than it helps. Many of the class names Classy uses are not in proper BEM formatting. Many of the templates contain excess elements and roles that get flagged as redundant by accessibility tools.

## Features

The following features have been added to this starter theme, in anticipation of being used on a majority of sites.

### Route class added to body tag

A `route--` class is added to the body element based on the Drupal route. This allows non-node pages to be targeted by css, so you can do things like add containers around the content of 404 pages.

### Hide heading paragraph field/class

If you add a boolean field with the id `field_hide_heading` to a paragraph, a `paragraph--hidden-heading` class will be added when that option is checked that can visually hide the heading field.

This approach is preferable to making a title optional, since people using screen readers often need explicit context that might be otherwise indicated with visual cues, such as sections for "featured items". It also prevents cases where heading levels are missed, and there are jumps from the h1 page title to h3 items.

### Alternate style paragraph field/class

Similarly, if you add a boolean field with the id `field_alternate_style` to a paragraph, a `paragraph--alternate-style` class will be added to the paragraph. This behavior will very depending on the particular designs, but there is usually at least one component that has an alternate style, such as a flipped layout or alternate background color.

If the designs are too complicated for a single alternate style field, that means that they probably need to be simplified, or there needs to be multiple different paragraph types created for the different options.

### View class based on display mode

If a view is showing rendered entities, a preprocess function will pass the display mode to the view template so that a class can be added. That will allow views to be themed based on the type of content that it will be displaying (such as cards or teasers), without having to target each view independently.

### SVG symbol definitions

The specifications for any icons being used can be added as a symbol in the `assets/symbols.svg` file. These are appended to the bottom of the document so they can be used anywhere on the site without requiring additional page requests. Default definitions have been included for wireframe placeholders, navigation elements, social media icons, and other common icons used on most sites.

Placing icons as SVG elements is preferable for accessibility, since they load reliably and exist in a way that can be interacted with by screen readers that can't see background images. SVG elements can also be styled using CSS, unlike those included as the src in an image tag.

### SVG default sizes and styles

By default, SVGs are set to 1em wide and 1em tall, and inherit their color from the parent element. This allows svgs to quickly be sized along with surrounding text, and inherits colors from thing such as links that might contain them.

### TO-DO items

- Region header menu does not match main menu id
- Remove header search region. Should just be a link to the search page for most sites.
- Do we need separate region for mobile menu? Why not print another copy of the main and utility menus?
