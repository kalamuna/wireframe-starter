# Kalamuna wireframe starter theme

This is a starter theme that uses Kalamuna's standard wireframe styles.

## Using this theme

Copy the contents of this repository in your local web/themes/custom/ directory.

Rename the directory and project files to be the name of your new theme.

## Compiling the source files

This project is using node-sass to compile scss files to css.

Run `npm install` and then `npm run build`.

## Architecture decisions and philosophy

We decided to use node-sass to compile the scss files, since almost all of the tasks we used gulp for can now be done without it.

The base theme is stable, since the advantages gained by using classy add more overhead than it helps. Many of the class names classy uses are not in proper BEM formatting. Many of the templates contain excess elements and roles that get flagged as redundant by accessibility tools.

## Features

The following features have been added to this starter theme, in anticipation of being used on a majority of sites.

### Hide heading paragraph field

If you add a boolean field with the id `field_hide_heading` to a paragraph, a `paragraph--hidden-heading` class will be added when that option is checked that can visually hide the heading field.

This approach is preferable to making a title optional, since people using screen readers often need explicit context that might be otherwise indicated with visual cues, such as sections for "featured items". It also prevents cases where heading levels are missed, and there are jumps from the h1 page title to h3 items.

### Alternate style paragraph field

Similarly, if you add a boolean field with the id `field_alternate_style` to a paragraph, a `paragraph--alternate-style` class will be added to the paragraph. This behavior will very depending on the particular designs, but there is usually at least one component that has an alternate style, such as a flipped layout or alternate background color.

If the designs are too complicated for a single alternate style field, that means that they probably need to be simplified, or there needs to be multiple different paragraph types created for the different options.
