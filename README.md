Brew It Yourself V2
----------

##Prerequisite
- Install NodeJs [https://nodejs.org/]
- Install Bower ``` npm install -g bower ```
- Install Grunt ```npm install -g grunt-cli```

## Installation the font generator

the project use a plugin that requires Grunt 0.4. Note that `ttfautohint` is optional, but your generated font will not be properly hinted if it’s not installed. And make sure you don’t use `ttfautohint` 0.97 because that version won’t work.

### OS X

```
brew install ttfautohint fontforge --with-python
npm install grunt-webfont --save-dev
```

*You may need to use `sudo` for `brew`, depending on your setup.*

*`fontforge` isn’t required for `node` engine (see below).*

### Linux

```
sudo apt-get install fontforge ttfautohint
npm install grunt-webfont --save-dev
```

*`fontforge` isn’t required for the `node` engine (see [below](#available-engines)).*

### Windows

```
npm install grunt-webfont --save-dev
```

Then [install `ttfautohint`](http://www.freetype.org/ttfautohint/#download) (optional).

Then install `fontforge`.
* Download and install [fontforge](http://fontforge.github.io/en-US/downloads/windows/).
* Add `C:\Program Files (x86)\FontForgeBuilds\bin` to your `PATH` environment variable.

*`fontforge` isn’t required for the `node` engine (see [below](#available-engines)).*

## Dependencies
Get the dependencies by launching those commands:

-  ```npm install```
-  ```bower install```

## debug the client
Launch *serve* task of grunt:

-  ```grunt serve```

## Build the production
Launch grunt:

-  ```grunt```

## Development

Launch *client*

``` grunt serve ```
