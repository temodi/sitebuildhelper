Just a Sidebuild Tool (Jast) - (WARNING: Strongly in development stage :)

# What's this ?

This is a simple site build (for multiple sites) tool with gulp and Sass/SCSS. It also can clone a CSS framework to your site directory and build your site with Sass/SCSS. It's easy to use and easy to customize.

**Features:**

- build multiple sites with Sass/SCSS
- PostCSS support
- clone CSS framework to your site directory
- watch your site changes and build it automatically
- build all site with one command


# How to use

## Install

First of all, you need to install nodejs packages. You can do it with the following command

```bash
yarn install
```
Of course you can use npm instead of yarn. But I use yarn.

## Start a new site for build with sass

- Create a directory for your site in `sites` directory (e.g `sites/my-site`)
- Create a directory for your Sass/SCSS files in `scss` directory (e.g `my-site/scss`)
- (optional) Clone css framework to your site directory with the following command

```bash
 yarn run gulp clone --site:my-site --fw:tailwind
```
This will clone the framework to your site directory 

- You can create any sass/scss files in your site directory (e.g `my-site/scss/main.scss`) it will be compiled to `my-site/css/style.css`
- You can add any images to your site directory (e.g `my-site/images/logo.png`) it will be copied to `my-site/images/logo.png`


## Build

### Build your site
- build your site with the following command

```bash
 yarn run gulp build --site:my-site
```
- after build you can find your site in `builds/sites/my-sites` directory

### Build all site
- build all site with the following command

```bash
 yarn run gulp build
```

- after build you can find all sites in `builds/sites/` directory

## Watch

While you are developing your site, you can watch your site changes with the following command

### Watch your site
- watch your site with the following command

```bash
 yarn run gulp watch --site:my-site
```

### Watch all site

- watch all site with the following command

```bash
 yarn run gulp watch
```

# Future features

- create a site skeleton with a simple command
- sass/less/stylus support
- template for tailwindcss
- template for bootstrap
- template for bulma
- cleanup script
- create site from template with gulp script
- some configuration for flexiblity (e.g. sass directory, css directory, images directory, etc.)
- (maybe) build under the site directory (e.g. `my-site/build/css/style.css`)
- some unit tests
- configurable postcss plugins: autoprefixer, cssnano, etc.