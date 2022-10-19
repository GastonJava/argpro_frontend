export class EducacioncardModel {

    private _id: number;
    private _titulocard: String;
    private _subtitulocard: String;
    private _thumbnailPreviewts: String;
    private _titulodate: String;
    private _dateinicio: String;
    private _datefinal: String;

    public get titulocard(): String {
        return this._titulocard;
    }
    public set titulocard(value: String) {
        this._titulocard = value;
    }

    public get subtitulocard(): String {
        return this._subtitulocard;
    }
    public set subtitulocard(value: String) {
        this._subtitulocard = value;
    }

    public get thumbnailPreviewts(): String {
        return this._thumbnailPreviewts;
    }
    public set thumbnailPreviewts(value: String) {
        this._thumbnailPreviewts = value;
    }

    public get titulodate(): String {
        return this._titulodate;
    }
    public set titulodate(value: String) {
        this._titulodate = value;
    }

    public get dateinicio(): String {
        return this._dateinicio;
    }
    public set dateinicio(value: String) {
        this._dateinicio = value;
    }

    public get datefinal(): String {
        return this._datefinal;
    }
    public set datefinal(value: String) {
        this._datefinal = value;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number){
        this._id = value;
    }



}