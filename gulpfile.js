import gulp from "gulp";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import rename from "gulp-rename";
import { buildParams, getParamValue } from "./src/paramProcessor.js";

import postcss from "gulp-postcss";
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const { src, dest, parallel, watch: gulpWatch } = gulp;
const sass = gulpSass(dartSass);

buildParams();

const DEFAULT_BASE_DIR = "./sites/**/";
const site = getParamValue("site");
console.log('site', site);
const BASE_SOURCE_DIR = site ? `./sites/${site}/**/` : DEFAULT_BASE_DIR;
const DEFAULT_BUILD_DIR = "./builds/sites";
const BUILD_DIR = site ?  `${DEFAULT_BUILD_DIR}/${site}` : DEFAULT_BUILD_DIR;
const FILES_FOR_COPY = [`${BASE_SOURCE_DIR}**/*.{html,js,svg,png,jpg,jpeg,gif,ico,webp}`];
const PACKAGE_INSTALL = "yarn add --dev";


console.log('BUILD_DIR', BUILD_DIR);

function transpilePostCSS() {
  return src(`${BASE_SOURCE_DIR}css/**/*.css`)
    .pipe(postcss([
      tailwindcss(),
      autoprefixer()
    ]))
 
    .pipe(dest(BUILD_DIR));
}

function transpileSassToCSS() {
  return src(`${BASE_SOURCE_DIR}/**/*.{scss,sass,css}`)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      tailwindcss(),
      autoprefixer()
    ]))
    .pipe(
      rename((path) => {
        console.log('path.dirname', path.dirname);
        path.dirname = path.dirname.replace(/scss/, "css");
        return path;
      })
    )
    .pipe(dest(BUILD_DIR));
}

function copyHtml() {
  return src(FILES_FOR_COPY).pipe(dest(BUILD_DIR));
}

function watchFiles() {
  gulpWatch(`${BASE_SOURCE_DIR}scss/**/*.{scss, sass, css}`, transpileSassToCSS);
  gulpWatch(FILES_FOR_COPY, parallel(/* transpilePostCSS, */ transpileSassToCSS, copyHtml));
}

function cloneFramework() {
  // kell melyik site-ba
  // $ yarn run gulp clone --site:mainsite --fw:tailwind
  // kell melyik framework

  console.log(getParamValue("site"));
  console.log(getParamValue("fw"));
  console.log(getParamValue("nonexists"));

  // return src(`./frameworks/${getCommandValue('fw')}/**/*`).pipe(
  //   dest(`${BASE_SOURCE_DIR}${getCommandValue('site')}/`)
  // );
}

function runTasks() {
  return parallel(/* transpilePostCSS, */ transpileSassToCSS, copyHtml);
}

export const buildcss = transpileSassToCSS;
export const build = runTasks();
export const watch = watchFiles;
export const clone = cloneFramework;
