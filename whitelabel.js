var path = require('path');
var fs = require('fs-extra');
var replace = require('replace');
var globby = require('globby');
var data = require('./plugin-info.json');

var capitalize = function (name) {
    return name
        .replace(/-/gi, ' ')
        .split(' ')
        .map(function (s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        })
        .join(' ')
        .replace(/ /gi, '_');
};

var info = Object.assign({
    slug: "amazing-plugin",
    name: "Amazing Plugin",
    uri: "http://example.com/amazing-plugin-uri/",
    author: {
        name: "Plugin Author",
        uri: "http://mydomain.tld",
        email: "my@email.tld"
    }
}, data);

info.package = info.package ? info.package : capitalize(info.slug);
info.instance = info.instance ? info.instance : info.slug.replace(/-/gi, '_');
info.author.full = info.author.full ? info.author.full : `${info.author.name} <${info.author.email}>`;

var origin = path.resolve(process.cwd());
var destination = path.resolve(process.cwd(), "..", info.slug);

globby([
    '**/*',
    '!.git/',
    '!node_modules/**',
    '!plugin-info.json',
    '!vendor/**',
    '!whitelabel.js',
    '!**/*.log',
]).then(function (files) {
    files.forEach(function (file) {

        var originFile = path.resolve('.', file);

        if(file.match(/plugin-name/gi)) {
            var destFile = path.resolve(destination, file.replace(/plugin-name/gi, info.slug));
        } else {
            var destFile = path.resolve(destination, file);
        }

        fs.copySync(originFile, destFile);

        replace({
            regex: "WordPress Plugin Boilerplate",
            replacement: info.name,
            paths: [ destFile ],
            silent: true,
        });

        replace({
            regex: "Your Name <email@example.com>",
            replacement: info.author.full,
            paths: [ destFile ],
            silent: true,
        });

        replace({
            regex: "email@example.com",
            replacement: info.author.email,
            paths: [ destFile ],
            silent: true,
        });

        replace({
            regex: "Your Name or Your Company",
            replacement: info.author.name,
            paths: [ destFile ],
            silent: true,
        });

        replace({
            regex: "http://example.com/plugin-name-uri/",
            replacement: info.uri,
            paths: [ destFile ],
            silent: true,
        });

        replace({
            regex: "http://example.com",
            replacement: info.author.uri,
            paths: [ destFile ],
            silent: true,
        });

        replace({
            regex: "Plugin Name",
            replacement: info.name,
            paths: [ destFile ],
            silent: true,
        });

        replace({
            regex: "plugin-name",
            replacement: info.slug,
            paths: [ destFile ],
            silent: true,
        });

        replace({
            regex: "Plugin_Name",
            replacement: info.package,
            paths: [ destFile ],
            silent: true,
        });

        replace({
            regex: "plugin_name",
            replacement: info.instance,
            paths: [ destFile ],
            silent: true,
        });
    });
});
