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
