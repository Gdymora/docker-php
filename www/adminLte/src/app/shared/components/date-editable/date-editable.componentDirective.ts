import { Component, ElementRef, HostListener, Output, EventEmitter, Input, Renderer2 } from '@angular/core';

@Component({
  selector: '[date-editable]',
  template: '<ng-content></ng-content>',
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

export class DateEditableComponent {
  viewInput = true;
  input: HTMLInputElement;
  textEscape: string;
  @Output() onnativeElement: EventEmitter<any> = new EventEmitter<any>();
  @Input() contentedItable;

  @HostListener('focusout') callOnTouched(): void {
    this.viewInput = true;
    this.el.nativeElement.textContent = this.input.value;
    this.input.remove();
    this.onnativeElement.emit(this.input.value);
  }

  @HostListener('click') onClick(): void {
    this.textEscape = this.el.nativeElement.textContent;
    this.createInput();
  }

  createInput(): void {
    if (this.viewInput) {
      this.input = this.renderer.createElement('input');
      this.input.type = 'date';
      this.input.setAttribute('min', '2000-07-02');
      this.input.setAttribute('value', this.textEscape.trim());
      this.el.nativeElement.textContent = '';
      this.renderer.appendChild(this.el.nativeElement, this.input);
      this.viewInput = false;
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }
}
