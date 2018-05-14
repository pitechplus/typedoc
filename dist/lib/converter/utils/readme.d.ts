export default class Readme {
    private _path;
    private _content;
    readonly _isRoot: boolean;
    constructor(content: string, path: string, isRoot?: boolean);
    path: string;
    content: string;
    readonly isRoot: boolean;
}
