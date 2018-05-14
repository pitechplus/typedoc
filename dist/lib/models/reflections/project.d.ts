import { SourceFile, SourceDirectory } from '../sources/index';
import { Reflection, ReflectionKind } from './abstract';
import { ContainerReflection } from './container';
import { ReflectionCategory } from '../ReflectionCategory';
import ReadmePackage from '../../converter/utils/readme-package';
export declare class ProjectReflection extends ContainerReflection {
    reflections: {
        [id: number]: Reflection;
    };
    symbolMapping: {
        [symbolId: number]: number;
    };
    directory: SourceDirectory;
    files: SourceFile[];
    categories: ReflectionCategory[];
    name: string;
    readme: string;
    readmePages: ReadmePackage;
    packageInfo: any;
    constructor(name: string);
    isProject(): boolean;
    getReflectionsByKind(kind: ReflectionKind): Reflection[];
    findReflectionByName(name: string): Reflection;
    findReflectionByName(names: string[]): Reflection;
    toObject(): any;
}
