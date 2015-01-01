# Berserker

This is what I use to start a new front-end web dev project. It creates a basic directory structure and uses the power of [Gulp](http://gulpjs.com) (with a small army of Gulp plugins), [Less](http://lesscss.org), and [Browserify](http://browserify.org) to start with a solid foundation for any project, all with two Terminal commands. This likely isn't perfect for anyone that isn't me, but you can always fork it and make changes to suit your needs.

### Getting Started

Make a directory for your new project, navigate to it in Terminal, and run the following command:

    curl -L https://github.com/stevecochrane/berserker/tarball/master/ | tar zx; cp -R stevecochrane*/* .; rm -R stevecochrane*; rm README*; rm LICENSE*; rm src/**/placeholder*; npm install

I'll likely make a script for this mess at some point. This does the following:

1. Downloads this repo's tarball to the current directory and unpacks its files.
2. That puts all of the files inside an unnecessary folder (`stevecochrane-berserker-[build]`) so I copy the contents of that folder to the current directory and then delete the folder to get rid of it.
3. Then I delete the README and LICENSE files since they're repo-specific and likely unnecessary for the new project.
4. Then, since Git requires directories to have at least one file inside in order to be recognized, some of the directories in `src/` have `placeholder.txt` files so I delete those here as well.
4. Finally, `npm install` installs all the necessary Node modules listed in `package.json`. If you don't have [Node](http://nodejs.org) yet you'll need to install it to run Gulp.

Once that's all set, you can add your site/app name and description to `package.json` and then build sites as normal in the `src/` folder. I've primed `src/less/` with [Normalize.css](http://necolas.github.io/normalize.css/) and a `base.less` file for variables and helper functions. Less compilation is built into Gulp here: run `gulp watch` in Terminal to watch files in the `src/gulp/` directory and they'll output to `dist/css/` every time the src file is saved.

### Ship It

Run `gulp` in Terminal from your project's base directory and all of the following goodness happens automagically:

1. The latest normalize.css is copied from the `node_modules` directory to `src/css/`.
2. Any HTML or PHP files in `src/` are copied to `dist/` and minified. Directory structure is preserved, e.g. `src/subdirectory/index.html` becomes `dist/subdirectory/index.html`.
2. Any images in `src/` are copied to `dist/` and minified. Directory structure is also preserved here.
3. Less compiles again as in watch mode to `dist/css/`. There are other CSS optimizations as well: Autoprefixer is there to fill in vendor prefixes so that we don't have to, Pixrem is there to provide px fallback values to rem units for earlier versions of IE, a Combine Media Queries plugin is there to combine media query selectors (helpful if you like to use nested media queries) and finally the results are minified.
4. The main Javascript file, `src/js/main.js`, is linted with [JSHint](http://jshint.com). If any errors happen, Gulp stops here.
5. If that worked, Browserify is used to bundle in any required Node modules. `src/js/main.js` already includes jQuery this way.
6. Finally, `src/js/main.js` is then minified with [UglifyJS](http://lisperator.net/uglifyjs/) and output to `dist/js/main.js`.

It's also fairly common to put JavaScript unit testing in the workflow as well with [QUnit](http://qunitjs.com) and/or [Jasmine](http://pivotal.github.io/jasmine/) so those can easily be added as well.

### Version History

- Version 2.0, January 2015 - Uses Gulp, Less, and Browserify. I still slightly prefer Sass over Less, but my team uses Less at work so I'll be consistent.
- Version 1.0, October 2013 - Uses Grunt and Sass.

### Thanks

A long list of the awesome and free tools that made this possible:

- [Autoprefixer](https://github.com/postcss/autoprefixer) and [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [Browserify](http://browserify.org)
- [gulp-combine-media-queries](https://www.npmjs.com/package/gulp-combine-media-queries)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)
- [gulp-minify-html](https://www.npmjs.com/package/gulp-minify-html)
- [gulp-pixrem](https://www.npmjs.com/package/gulp-pixrem)
- [gulp-watch](https://www.npmjs.com/package/gulp-watch)
- [JSHint](http://jshint.com) and [gulp-jshint](https://www.npmjs.com/package/gulp-jshint)
- [Less](http://lesscss.org) and [gulp-less](https://www.npmjs.com/package/gulp-less)
- [Node](http://nodejs.org)
- [Normalize.css](http://necolas.github.io/normalize.css/)
- [UglifyJS](http://lisperator.net/uglifyjs/) and [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [vinyl-buffer](https://www.npmjs.com/package/vinyl-buffer) and [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)

The name 'Berserker' is a [WarCraft II](http://en.wikipedia.org/wiki/Warcraft_ii)/[WarCraft III](http://en.wikipedia.org/wiki/Warcraft_iii) reference. 'Grunt' is the first available Orc combat unit in those games so I named this after the second, the Berserker. (Well, Berserker is the upgraded form, but it just sounds cooler than Headhunter or Axe Thrower.)