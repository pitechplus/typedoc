"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Path = require("path");
var application_1 = require("./lib/application");
var reflections_1 = require("./lib/models/reflections");
var application_2 = require("./lib/application");
exports.Application = application_2.Application;
var cli_1 = require("./lib/cli");
exports.CliApplication = cli_1.CliApplication;
var events_1 = require("./lib/utils/events");
exports.EventDispatcher = events_1.EventDispatcher;
exports.Event = events_1.Event;
var abstract_1 = require("./lib/models/reflections/abstract");
exports.resetReflectionID = abstract_1.resetReflectionID;
var fs_1 = require("./lib/utils/fs");
exports.normalizePath = fs_1.normalizePath;
__export(require("./lib/models/reflections"));
__export(require("./lib/output/plugins"));
var renderer_1 = require("./lib/output/renderer");
exports.Renderer = renderer_1.Renderer;
var DefaultTheme_1 = require("./lib/output/themes/DefaultTheme");
exports.DefaultTheme = DefaultTheme_1.DefaultTheme;
var NavigationItem_1 = require("./lib/output/models/NavigationItem");
exports.NavigationItem = NavigationItem_1.NavigationItem;
var UrlMapping_1 = require("./lib/output/models/UrlMapping");
exports.UrlMapping = UrlMapping_1.UrlMapping;
var src = Path.join(__dirname, '..', 'examples', 'basic', 'src');
var out = Path.join(__dirname, '..', 'tmp', 'test');
var app = new application_1.Application({
    mode: 'Modules',
    logger: 'console',
    target: 'ES5',
    module: 'CommonJS',
    gaSite: 'foo.com'
}), project = new reflections_1.ProjectReflection('test');
var input = app.expandInputFiles([src]);
project = app.convert(input);
app.generateDocs(project, out);
//# sourceMappingURL=index.js.map