import { Component, Output, forwardRef, EventEmitter, ViewChild, Renderer, Input, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InlineEditComponent),
    multi: true
};

export enum InputType {
    text,
    textarea
}

@Component({
    selector: 'app-inline-edit',
    providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
    styleUrls: ['./inline-edit.component.css'],
    templateUrl: './inline-edit.component.html'
})
export class InlineEditComponent implements ControlValueAccessor {
    private _disable = false;
    private _min = 0;
    private _max = Infinity;
    private _value = '';
    private _editing = false;
    private _preValue = '';
    private _type = InputType.text;
    private _rows = 4;
    private _columns = 20;
    private _size = 20;

    @Output() save: EventEmitter<any> = new EventEmitter();
    @ViewChild('inlineEditControl') inlineEditControl: HTMLFormElement;
    @ViewChild('inlineEditForm') inlineEditForm: NgForm;

    constructor(private _elementRef: ElementRef,
        private _renderer: Renderer) {
    }

    @Input()
    set min(value: number) {
        this._min = value;
    }
    get min(): number {
        return this._min;
    }

    @Input()
    get max(): number {
        return this._max;
    }
    set max(value: number) {
        this._max = value;
    }

    @Input()
    get disable(): boolean {
        return this._disable;
    }
    set disable(value: boolean) {
        this._disable = value;
    }

    get value(): string {
        return this._value;
    }
    set value(value: string) {
        value = value.trim();
        if (value !== this._value) {
            this._value = value;
            this.onChange(value);
        }

        this.validate();
    }

    public get editing() {
        return this._editing;
    }
    public set editing(value) {
        this._editing = value;
    }

    @Input()
    set type(value: string) {
        this._type = InputType[value];
    }
    get type(): string {
        return InputType[this._type];
    }

    @Input()
    set rows(value: number) {
        this._rows = value;
    }
    get rows(): number {
        return this._rows;
    }

    @Input()
    set columns(value: number) {
        this._columns = value;
    }
    get columns(): number {
        return this._columns;
    }

    @Input()
    set size(value: number) {
        this._size = value;
    }
    get size(): number {
        return this._size;
    }

    onChange: Function = Function.prototype;
    onTouched: Function = Function.prototype;

    writeValue(value: string) {
        this._value = value;
    }

    registerOnChange(fn: (x: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    get isValid(): boolean {
        return this._value.length >= this.min;
    }
    get isTextbox(): boolean {
        return this._type === InputType.text;
    }

    get isTextarea(): boolean {
        return this._type === InputType.textarea;
    }

    edit(value) {
        if (this.disable) {
            return;
        }

        this._preValue = value;
        this.editing = true;

        setTimeout(() => {
            this._renderer.invokeElementMethod(this.inlineEditControl.nativeElement, 'focus', []);
        });
    }

    onSubmit(value) {
        this.save.emit(value);
        this.editing = false;
        this.validate();
    }

    cancel() {
        this._value = this._preValue;
        this.editing = false;
        this.validate();
    }

    validate(): void {
        if (!this.isValid) {
            this.inlineEditForm.form.get('value').setErrors({ 'invalid': true });
        }
    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this._editing) {
            return;
        }

        if (this._elementRef.nativeElement.contains(event.target)) {
            return;
        }

        this.cancel();
    }
}
