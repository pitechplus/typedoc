import * as Path from 'path';
import { Application } from './lib/application';
import { ProjectReflection } from './lib/models/reflections';

export { Application } from './lib/application';
export { CliApplication } from './lib/cli';

export { EventDispatcher, Event } from './lib/utils/events';
export { resetReflectionID } from './lib/models/reflections/abstract';
export { normalizePath } from './lib/utils/fs';
export * from './lib/models/reflections';
export * from './lib/output/plugins';
export { Renderer } from './lib/output/renderer';
export { DefaultTheme } from './lib/output/themes/DefaultTheme';
export { NavigationItem } from './lib/output/models/NavigationItem';
export { UrlMapping } from './lib/output/models/UrlMapping';

const src = Path.join(__dirname, '..', 'examples', 'basic', 'src');
const out = Path.join(__dirname, '..', 'tmp', 'test');
let app: Application = new Application({
        mode:   'Modules',
        logger: 'console',
        target: 'ES5',
        module: 'CommonJS',
        gaSite: 'foo.com' // verify theme option without modifying output
    }),
    project: ProjectReflection = new ProjectReflection('test');

const input = app.expandInputFiles([src]);
project = app.convert(input);

app.generateDocs(project, out);
