import { Component, ElementRef, HostListener, forwardRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: '[text-editable]',
    template: '<ng-content></ng-content>',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextEditableComponent), multi: true
    }],
    styles: [`
  :host {
    padding: 2px 4px;
    width: 60%;
  }
  :host[disabled='true'] {
    pointer-events: none;
    background: #F9F9F9;
  }
  :host:empty::before {
    content: attr(placeholder);
    color: #9D9D9D;
  }
  `]
})
/*  <div (onnativeElement)="nativeElement($event, element)" text-editable [contenteditable]= "contentEdit" placeholder="введите значение" required
          pattern="[a-zA-z]+" #editAttributesNamtvrDiv>
          {{element.attributes.namtvr}}
    </div>
*/
export class TextEditableComponent implements ControlValueAccessor, AfterViewInit {

    textEscape: string;
    @Output() onnativeElement: EventEmitter<any> = new EventEmitter<any>();
    @Input() contentedItable;

    @HostListener('input') callOnChange(): void {
        this.onChange(this.el.nativeElement.textContent);
    }

    @HostListener('blur') callOnTouched(): void {
        if (this.el.nativeElement.textContent !== this.textEscape) {
            this.onnativeElement.emit(this.el.nativeElement.textContent);
        }
        this.onTouched();
    }

    @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent): void {

        if (event.key === 'Enter') {
            this.el.nativeElement.blur();
            this.onTouched();
        }


        if (event.key === 'Escape') {
            if (this.textEscape) {
                (event.target as HTMLInputElement).innerHTML = this.textEscape;
            }
            this.onTouched();
        }
    }

    @HostListener('click') onClick(): void {
        this.textEscape = this.el.nativeElement.textContent;
        this.setFontSize(14);
    }

    @HostListener('mouseenter') onMouseEnter(): void {
        if (this.contentedItable) {
            this.setColor(0.54);
        }
    }

    @HostListener('mouseleave') onMouseLeave(): void {
        this.setColor(0.87);
    }

    setFontSize(size: number | string): void {
        this.el.nativeElement.style.fontSize = `${size}px`;
    }

    setColor(color: number): void {
        this.el.nativeElement.style.color = `rgba(0, 0, 0, ${color})`;
    }

    onChange = (value: any) => { };
    onTouched = () => { };

    constructor(private el: ElementRef) { }

    ngAfterViewInit(): void {
        this.el.nativeElement.setAttribute('contenteditable', this.contentedItable);
    }

    writeValue(value): void {
        this.el.nativeElement.textContent = value || '';
    }

    registerOnChange(fn): void {
        this.onChange = fn;
    }

    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.el.nativeElement.setAttribute('disabled', String(val));
        this.el.nativeElement.setAttribute('contenteditable', String(!val));
    }

}
