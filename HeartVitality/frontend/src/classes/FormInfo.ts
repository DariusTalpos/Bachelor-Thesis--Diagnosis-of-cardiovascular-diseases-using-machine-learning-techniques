import result from "../pages/typescript/Result";

export class FormInfo {
    private _dateOfBirth: Date;
    private _gender: number;
    private _height: number;
    private _weight: number;
    private _sys: number;
    private _dia: number;
    private _cholesterol: number;
    private _glucose: number;
    private _smoke: number;
    private _alcohol: number;
    private _physical: number;
    private _result: number;

    constructor(dateOfBirth: Date, gender: number, height: number, weight: number, sys: number, dia: number, cholesterol: number, glucose: number, smoke: number, alcohol: number, physical: number, result: number) {
        this._dateOfBirth = dateOfBirth;
        this._gender = gender;
        this._height = height;
        this._weight = weight;
        this._sys = sys;
        this._dia = dia;
        this._cholesterol = cholesterol;
        this._glucose = glucose;
        this._smoke = smoke;
        this._alcohol = alcohol;
        this._physical = physical;
        this._result = result;
    }

    get dateOfBirth(): Date {
        return this._dateOfBirth;
    }

    set dateOfBirth(value: Date) {
        this._dateOfBirth = value;
    }

    get gender(): number {
        return this._gender;
    }

    set gender(value: number) {
        this._gender = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get weight(): number {
        return this._weight;
    }

    set weight(value: number) {
        this._weight = value;
    }

    get sys(): number {
        return this._sys;
    }

    set sys(value: number) {
        this._sys = value;
    }

    get dia(): number {
        return this._dia;
    }

    set dia(value: number) {
        this._dia = value;
    }

    get cholesterol(): number {
        return this._cholesterol;
    }

    set cholesterol(value: number) {
        this._cholesterol = value;
    }

    get glucose(): number {
        return this._glucose;
    }

    set glucose(value: number) {
        this._glucose = value;
    }

    get smoke(): number {
        return this._smoke;
    }

    set smoke(value: number) {
        this._smoke = value;
    }

    get alcohol(): number {
        return this._alcohol;
    }

    set alcohol(value: number) {
        this._alcohol = value;
    }

    get physical(): number {
        return this._physical;
    }

    set physical(value: number) {
        this._physical = value;
    }

    get result(): number {
        return this._result;
    }

    set result(value: number) {
        this._result = value;
    }

}