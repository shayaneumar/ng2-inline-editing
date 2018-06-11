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
    private _value = '';
    private _editing = false;
    private _preValue = '';
    private _type = InputType.text;

    @Input() disable = false;
    @Input() min = 0;
    @Input() max = Infinity;
    @Input() rows = 4;
    @Input() columns = 20;
    @Input() size = 20;
    @Input() limit = Infinity;

    @Output() save: EventEmitter<any> = new EventEmitter();
    @ViewChild('inlineEditControl') inlineEditControl: HTMLFormElement;
    @ViewChild('inlineEditForm') inlineEditForm: NgForm;

    constructor(private _elementRef: ElementRef,
        private _renderer: Renderer) {
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

        this.reValidate();
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
        return this._value.length >= this.min
            && this._value.length <= this.max;
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
        this.reValidate();
    }

    cancel() {
        this._value = this._preValue;
        this.editing = false;
        this.reValidate();
    }

    reValidate(): void {
        const valueControl = this.inlineEditForm.form.get('value');
        if (this.isValid) {
            valueControl.setErrors(null);
        } else {
            valueControl.setErrors({ 'invalid': true });
        }
    }

    markPristine(): void {
        this.inlineEditForm.form.markAsPristine();
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
