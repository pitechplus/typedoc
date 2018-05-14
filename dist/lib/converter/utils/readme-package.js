"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path = require("path");
var FS = require("fs");
var markdownLinkExtractor = require("markdown-link-extractor");
var escapeStringRegexp = require("escape-string-regexp");
var readme_1 = require("./readme");
var ReadmePackage = (function () {
    function ReadmePackage(definitions) {
        this.definitions = definitions;
    }
    ReadmePackage.createFromBase = function (readmePath) {
        var mdPages = [];
        this.loadDefinitions(mdPages, Path.dirname(readmePath), Path.basename(readmePath));
        return new this(mdPages);
    };
    ReadmePackage.loadDefinitions = function (pages, currentDirectory, fileName, basePath, isRoot) {
        var _this = this;
        if (basePath === void 0) { basePath = ''; }
        if (isRoot === void 0) { isRoot = true; }
        var fullPath = Path.join(currentDirectory, fileName);
        var readmeContents = FS.readFileSync(fullPath, 'utf-8');
        var mdFiles = markdownLinkExtractor(readmeContents).filter(function (link) {
            return !link.match(/^(ftp|https?):\/\/.*/) &&
                link.match(/.*\.md$/);
        });
        pages.push(new readme_1.default(readmeContents, Path.join(basePath, fileName), isRoot));
        mdFiles.forEach(function (filePath) {
            var fileFullPath = Path.join(currentDirectory, filePath);
            var normalizedPath = Path.normalize(filePath);
            var normalizedBasePath = Path.join(basePath, filePath);
            var newBasePath = Path.join(basePath, Path.dirname(filePath));
            if (!FS.existsSync(fileFullPath)) {
                return;
            }
            if (normalizedPath === Path.normalize(fileName)) {
                return;
            }
            if (!pages.find(function (readme) { return readme.path === normalizedBasePath; })) {
                _this.loadDefinitions(pages, Path.dirname(fileFullPath), Path.basename(fileFullPath), newBasePath, false);
            }
        });
    };
    ReadmePackage.prototype.updatePath = function (readme, newPath) {
        if (!this.definitions.find(function (r) { return readme === r; })) {
            return;
        }
        this.definitions.forEach(function (otherReadme) {
            var relativePath = Path.join(Path.relative(Path.dirname(otherReadme.path), Path.dirname(readme.path)), Path.basename(readme.path));
            var matchUrl = '(?:./)?' + escapeStringRegexp(relativePath) + '(?:#[^\\)\\>]*)?';
            var matchLinks = new RegExp(" {0,3}\\[(?:\\\\[\\[\\]]|[^\\[\\]])+\\]:?" +
                (" *\\n? *<?(?:" + matchUrl + ")?>?(?:(?: *\\n? *| *\\n *)((?:\"(?:\\\\\"|[^\"]|\"[^\"\\n]*\")*\"|'\\n?") +
                ("(?:[^'\\n]+\\n?)*'|\\(" + matchUrl + "\\))))? *(?:\\n+|$)"), 'g');
            var content = otherReadme.content;
            var matches = content.match(matchLinks);
            if (!matches) {
                return;
            }
            var newRelativePath = Path.join(Path.relative(Path.dirname(otherReadme.path), Path.dirname(newPath)), Path.basename(newPath));
            Array.from(new Set(matches)).forEach(function (match) {
                var replacement = match.replace(relativePath, newRelativePath);
                content = content.replace(match, replacement);
            });
            otherReadme.content = content;
        });
        readme.path = newPath;
    };
    ReadmePackage.prototype.updatePaths = function (callback) {
        var _this = this;
        this.definitions.forEach(function (readme) {
            return _this.updatePath(readme, callback(readme));
        });
    };
    ReadmePackage.prototype.getRoot = function () {
        return this.definitions.find(function (readme) { return readme.isRoot; });
    };
    ReadmePackage.prototype.getDefinitions = function () {
        return this.definitions;
    };
    return ReadmePackage;
}());
exports.default = ReadmePackage;
//# sourceMappingURL=readme-package.js.map