import Readme from './readme';
export default class ReadmePackage {
    protected definitions: Readme[];
    private constructor();
    static createFromBase(readmePath: string): ReadmePackage;
    protected static loadDefinitions(pages: Readme[], basePath: string, relativePath: string, isRoot?: boolean): void;
    updatePath(readme: Readme, newPath: string): void;
    updatePaths(callback: Function): void;
    getRoot(): Readme;
    getDefinitions(): Readme[];
}
