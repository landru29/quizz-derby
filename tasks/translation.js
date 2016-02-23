module.exports = function(grunt) {
    'use strict';

    var xmlParser = require('node-xml-lite');

    var Xml2json = function(options) {
        this.gruntInstance = options.gruntInstance;
        this.keepEntities = 'undefined' === typeof options.keepEntities ? true: options.keepEntities;
    };

    Xml2json.prototype.parsedDataToString = function(parsedData) {
        var str='';
        for (var i=0; i<parsedData.length; i++) {
            if (parsedData[i].name) {
                // get attributes
                var attrs = [];
                for (var key in parsedData[i].attrib) {
                    if (parsedData[i].attrib.hasOwnProperty(key)) {
                        attrs.push(key + '="' + parsedData[i].attrib[key] + '"');
                    }
                }
                // get child nodes
                if (parsedData[i].childs) {
                    str += '<' + parsedData[i].name + ' ' + attrs.join(' ') + '>' + this.parsedDataToString(parsedData[i].childs) + '</' + parsedData[i].name + '>';
                } else {
                    str += '<' + parsedData[i].name + ' ' + attrs.join(' ') + '/>';
                }
            } else {
                // the node was a string
                str += parsedData[i];
            }
        }
        return str;
    };

    Xml2json.prototype.toObject = function(xmlData) {
        var obj = {};
        try {
            var parsedData = xmlParser.parseString(this.keepEntities ? xmlData.replace(/&/g, '&amp;') : xmlData);
            // first node must by 'translations'
            if ((parsedData) && (parsedData.name === 'translations')) {
                for (var i=0; i<parsedData.childs.length; i++) {
                    var entry = parsedData.childs[i];
                    // the child nodes must be 'translation' and must have an attribute 'id'
                    if ((entry.name === 'translation') && (entry.attrib) && (entry.attrib.id) && (entry.childs)) {
                        obj[entry.attrib.id] = this.parsedDataToString(entry.childs);
                    }
                }
            }
        } catch (e) {
            this.gruntInstance.log.error(e);
            throw e;
        }
        return obj;
    };

    Xml2json.prototype.xmlFileToJson = function(filePath) {
        var data = this.gruntInstance.file.read(filePath);
        var obj = this.toObject(data);
        return JSON.stringify(obj);
    };

    Xml2json.prototype.changeExtension = function(Filename, extension) {
        return Filename.replace(/\.xml$/, '.' + extension);
    };

    grunt.registerMultiTask('translation', 'Transform XML to JSON', function() {

        var self = this;
        var path = require('path');
        var translationParser = new Xml2json({
            gruntInstance:grunt,
            keepEntities: true
        });

        /**
         * Extend destFilename json with the content of srcFilename json
         * @param destFilename
         * @param srcFilename
         * @return {boolean} true if changes on destination
         */
        var extendJson = function(destFilename, srcFilename) {
            var changes = false;
            var dest = grunt.file.readJSON(destFilename);
            var src = grunt.file.readJSON(srcFilename);
            for (var key in src) {
                if ((src.hasOwnProperty(key)) && (!dest.hasOwnProperty(key))) {
                    dest[key] = src[key];
                    changes = true;
                }
            }
            if (changes) {
                grunt.log.ok('Extending translation ' + destFilename + ' with ' + path.basename(srcFilename));
                grunt.file.write(destFilename, JSON.stringify(dest));
            }
            return changes;
        };

        /**
         * Generate JSON translation files from XML
         */
        var task_generateTranslation = function() {
            grunt.log.subhead('Writing translations => ' + self.target);
            self.files.forEach(function (d) {

                var jsonFile = translationParser.changeExtension(d.dest, 'json');
                var xmlFiles = d.src;

                grunt.log.ok('Writing translation ' + jsonFile);

                var str = '';
                for (var i=0; i<xmlFiles.length; i++) {
                    str += translationParser.xmlFileToJson(xmlFiles[i]);
                }

                grunt.file.write(jsonFile, str);
            });
        };

        /**
         * Extend the translations
         * field extendFrom must by an array of languages (ie. ['en_GB', 'fr_FR'])
         */
        var task_extendTranslation = function() {
            grunt.log.subhead('Extending translations => ' + self.target);
            self.files.forEach(function (d) {
                var jsonFile = translationParser.changeExtension(d.dest, 'json');
                if (d.extendFrom) {
                    d.extendFrom.forEach(function(lang) {
                        var sourceFile= jsonFile.replace(/_[a-z]{2}_[A-Z]{2}/, '_' + lang);
                        if (grunt.file.exists(sourceFile)) {
                            extendJson(jsonFile, sourceFile);
                        } else {
                            grunt.log.error(lang + ' could not be found in ' + sourceFile);
                        }
                    });
                }
            });
        };

        /******************************************************/
        /**  Performing actions on files                      */
        /******************************************************/

        // translate xml to json
        task_generateTranslation();


        // extending translations
        task_extendTranslation();


    });
};
