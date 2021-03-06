var path = require('path');
var fs = require('fs-extra');
var replace = require('replace');
var globby = require('globby');
var data = require('./plugin.json');

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
    homepage: "http://example.com/amazing-plugin-uri/",
    author: "Plugin Author",
    author_homepage: "http://mydomain.tld",
    author_email: "my@email.tld"
}, data);

info.package = info.package ? info.package : capitalize(info.slug);
info.instance = info.instance ? info.instance : info.slug.replace(/-/gi, '_');
info.author_full = info.author_full ? info.author_full : `${info.author} <${info.author.email}>`;

fs.renameSync('themes/plugin-name-theme', `themes/${info.slug}-theme`);
fs.renameSync('plugin-name.php', `${info.slug}.php`);
fs.renameSync('languages/plugin-name.pot', `languages/${info.slug}.pot`);

/**
 * Vendor folder have to be in repository for automatic updates.
 */
replace({
    regex: 'vendor/\*',
    replacement: '',
    paths: [ '.gitignore' ],
    silent: true,
});

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
            replacement: info.author_full,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "email@example.com",
            replacement: info.author_email,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "Your Name or Your Company",
            replacement: info.author,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "http://example.com/plugin-name-uri/",
            replacement: info.homepage,
            paths: [ file ],
            silent: true,
        });

        replace({
            regex: "http://example.com",
            replacement: info.author_homepage,
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
            regex: "PLUGIN_NAME",
            replacement: info.instance.toUpperCase(),
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

    fs.unlink('./readme.md');
    fs.unlink(__filename);
});
