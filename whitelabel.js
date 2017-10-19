/**
 *	WPPB GENERATOR SITE
 *	Author: Enrique Chavez
 *	Author URI: http://enriquechavez.co
 */

var path = require('path');
var rimraf = require('rimraf');
var fs = require('fs-extra');
var mime = require('mime');
var replace = require('replace');
var data = require('plugin-info.json');

var origin = process.cwd();
var pluginSlug = "";
var pluginName = "";
var pluginURI = "";
var pluginAuthor = "";
var pluginAuthorURI = "";
var pluginDescription = "";
var pluginNamePackage = "";
var pluginNameInstance = "";
var pluginAuthorEmail = "";
var pluginAuthorFull = "";
var destination = "";

//Track Event
visitor.event('build', 'click', 'download', 1).send();

// ALL FIELDS REQUIRED IF EMPTY SET DEFAULT VALUES
pluginSlug = String(data.slug).length ? String(data.slug).toLowerCase() : 'amazing-plugin';
pluginName = String(data.name).length ? data.name : 'Amazing Plugin';
pluginURI = String(data.uri).length ? data.uri : 'http://example.com/amazing-plugin-uri/' ;
pluginAuthor = String(data.author.name).length ? data.author.name : 'Plugin Author' ;
pluginAuthorURI = String(data.author.uri).length ? data.author.uri : 'http://mydomain.tld';
pluginAuthorEmail = String(data.author.email).length ? data.author.email : 'my@email.tld';
pluginNamePackage = capitalize( pluginSlug );
pluginNameInstance = pluginSlug.replace(/-/gi, '_');
pluginAuthorFull = pluginAuthor +' <'+ pluginAuthorEmail + '>';

destination = process.cwd() + "/../" + pluginSlug;

var run = function() {
    fs.copy( origin, destination, function(err){

        if (err){

            console.error(err);

            return;

        }

        //FIND AND REPLACE FILES NAMES
        walker(destination, function(err, files) {

            if (err){

                console.error(err);

                return;

            }

            files.forEach(function(file){

                var newName;

                var re = /plugin-name/gi;

                newName = file.replace(re, pluginSlug);

                fs.renameSync( file, newName);

            });

            // Plugin URI
            replace({

                regex: "http://example.com/plugin-name-uri/",

                replacement: pluginURI,

                paths:[destination + '/' + pluginSlug +'.php'],

                recursive: false,

                silent: true

            });

            // Plugin Name
            replace({

                regex: "WordPress Plugin Boilerplate",

                replacement: pluginName,

                paths:[destination + '/' + pluginSlug +'.php'],

                recursive: true,

                silent: true

            });

            //Plugin URI
            replace({

                regex: "http://example.com/plugin-name-uri/",

                replacement: pluginURI,

                paths:[destination + '/' + pluginSlug +'.php'],

                recursive: true,

                silent: true

            });

            //find Plugin Author
            replace({

                regex: "Your Name or Your Company",

                replacement: pluginAuthor,

                paths:[destination + '/' + pluginSlug +'.php'],

                recursive: true,

                silent: true

            });

            //find Plugin Author Full
            replace({

                regex: "Your Name <email@example.com>",

                replacement: pluginAuthorFull,

                paths:[destination],

                recursive: true,

                silent: true

            });

            //find Plugin_Name
            replace({

                regex: "Plugin_Name",

                replacement: pluginNamePackage,

                paths:[destination],

                recursive: true,

                silent: true

            });

            //find Plugin slug
            replace({

                regex: "plugin-name",

                replacement: pluginSlug,

                paths:[destination],

                recursive: true,

                silent: true

            });

            //find Author URI
            replace({

                regex: "http://example.com/?",

                replacement: pluginAuthorURI,

                paths:[destination],

                recursive: true,

                silent: true

            });

            //find Author URI
            replace({

                regex: "plugin_name",

                replacement: pluginNameInstance,

                paths:[destination + '/' + pluginSlug +'.php'],

                recursive: true,

                silent: true

            });
        });

    });
};

/**
 * RECURSIVE WALKER TO GET ALL THE FILES IN DIRECTORY
 */
var walker = function(dir, done) {

	var results = [];

	fs.readdir(dir, function(err, list) {

		if (err) return done(err);

		var i = 0;

		(function next() {

			var file = list[i++];

			if (!file) return done(null, results);

			file = dir + '/' + file;

			fs.stat(file, function(err, stat) {

				if (stat && stat.isDirectory()) {

					walker(file, function(err, res) {

						results = results.concat(res);

						next();

					});

				} else {

          			results.push(file);

          			next();

        		}

      		});

    	})();

  	});

};


var capitalize = function(name){

	var newName = "";

	name = name.replace(/-/gi, ' ');

	pieces = name.split(' ');

	pieces.forEach(function(word){

		newName += word.charAt(0).toUpperCase() + word.slice(1) + ' ';

	});

	return newName.trim().replace(/ /gi, '_');

};

run();