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

fs.renameSync('themes/plugin-name-theme', `themes/${info.slug}-theme`);
fs.renameSync('plugin-name.php', `${info.slug}.php`);
fs.renameSync('languages/plugin-name.pot', `languages/${info.slug}.pot`);

globby([
    '**/*',
    '!.git/',
    '!node_modules/**',
    '!plugin-info.json',
    '!vendor/**',
    '!whitelabel.js',
    '!**/*.log',
], { nodir: true }).then(function (files) {
    files.forEach(function (file) {

        replace({
            regex: "WordPress Plugin Boilerplate",
            replacement: info.name,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "Your Name <email@example.com>",
            replacement: info.author.full,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "email@example.com",
            replacement: info.author.email,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "Your Name or Your Company",
            replacement: info.author.name,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "http://example.com/plugin-name-uri/",
            replacement: info.uri,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "http://example.com",
            replacement: info.author.uri,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "plugin-name",
            replacement: info.slug,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "Plugin_Name",
            replacement: info.package,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "plugin_name",
            replacement: info.instance,
            paths: [ file ],
            silent: true,
        });
    });

    fs.unlink('./plugin-info.json');
    fs.unlink('./readme.md');
    fs.unlink(__filename);
});
