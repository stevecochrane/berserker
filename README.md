# Berserker

This is what I use to start a new front-end dev project. It creates a nice directory structure and uses the power of [Grunt](http://gruntjs.com) to automate [Compass](http://compass-style.org) compilation, HTML and image minification, and JavaScript linting, concatenation, and minification, all with two very simple Terminal commands. This likely isn't perfect for anyone that isn't me, but you can always fork it and make changes to suit your needs.

### Getting Started

Make a directory for your new project, navigate to it in Terminal, and run the following command:

    curl -L https://github.com/stevecochrane/berserker/tarball/master/ | tar zx; cp -R stevecochrane*/* .; rm -R stevecochrane*; rm README*; rm LICENSE*; rm src/**/placeholder*; npm install

I'll likely make a script for this mess at some point. This does the following:

1. Downloads this repo's tarball to the current directory and unpacks its files.
2. That puts all of the files inside an unnecessary folder (stevecochrane-berserker-[build]) so I copy the contents of that folder to the current directory and then delete the folder to get rid of it.
3. Then I delete the README and LICENSE files since they're repo-specific and likely unnecessary for the new project.
4. Then, since Git requires directories to have at least one file inside in order to be recognized, some of the directories in `src` have `placeholder.txt` files so I delete those here as well.
4. Finally, 'npm install' installs all the necessary Node modules that are listed in package.json. If you don't have [Node](http://nodejs.org) yet you'll need to install it to run Grunt.

Once that's all set, you can add your site/app name and description to `package.json` and then build sites as normal in the `src` folder. I've primed `src/sass` with [Normalize.css](http://necolas.github.io/normalize.css/) and a `_base.scss` file for variables and helper functions. Compass compilation is built into Grunt here: run `grunt watch` in Terminal to watch files in `src/sass` directory and they'll output to `src/css`. While in watch mode, CSS is compiled in expanded mode so it's still easy to read for dev purposes.

### Ship It

When it's time to ship, run `grunt` in Terminal from your project's base directory and all of the following goodness happens automagically:

1. Any HTML files in `src` are copied to `dist` and minified.
2. Any images in `src` are copied to `dist` and minified. Directory structure is preserved here so images in `src/img` go to `dist/img` for example.
3. Compass compiles the Sass again as in watch mode and also outputs a second time, compressed, to `dist/css`.
4. `gruntfile.js` and any Javascript in `src/js` are linted with JSHint. Note that any subdirectories in `src/js` are not tested to prevent testing any third-party scripts like jQuery (I usually put those in a new `src/js/libs` directory). If any errors happen, Grunt stops here.
5. If that worked, then any JavaScript in `src/js` is concatenated into a single file. This will likely put the files in the wrong order and that might cause errors, so to customize it, edit `concat.dist.src` in `gruntfile.js` to list the individual files in the intended order. The concatenated file is output to `dist/js/project-name.js`.
6. Finally, that concatenated JavaScript file is then minified with [UglifyJS](http://lisperator.net/uglifyjs/) and output to `dist/js/project-name.min.js`.

It's also fairly common to put JavaScript unit testing in the workflow as well with QUnit and/or Jasmine so those can easily be added as well.

### Thanks

A long list of the awesome tools that made this possible:

- [Compass](http://compass-style.org) and [grunt-contrib-compass](https://npmjs.org/package/grunt-contrib-compass)
- [Grunt](http://gruntjs.org)
- [grunt-contrib-htmlmin](https://npmjs.org/package/grunt-contrib-htmlmin)
- [grunt-contrib-imagemin](https://npmjs.org/package/grunt-contrib-imagemin)
- [grunt-contrib-concat](https://npmjs.org/package/grunt-contrib-concat)
- [grunt-contrib-watch](https://npmjs.org/package/grunt-contrib-watch)
- [JSHint](http://jshint.com) and [grunt-contrib-jshint](https://npmjs.org/package/grunt-contrib-jshint)
- [Node](http://nodejs.org)
- [Normalize.css](http://necolas.github.io/normalize.css/)
- [Sass](http://sass-lang.com)
- [UglifyJS](http://lisperator.net/uglifyjs/) and [grunt-contrib-uglify](https://npmjs.org/package/grunt-contrib-uglify)

The name 'Berserker' is a [WarCraft](http://en.wikipedia.org/wiki/Warcraft) reference. 'Grunt' is the first available Orc combat unit in WarCraft so I named this after the second, the Berserker. Well, Berserker is the upgraded form, but it just sounds cooler than Headhunter or Axe Thrower.