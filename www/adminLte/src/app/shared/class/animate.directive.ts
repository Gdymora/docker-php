import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
@Directive({
    selector: '[appAnimate]'
})
export class AnimateDirective {
    constructor(private renderer: Renderer2, private el: ElementRef) { }
/**
 * @example
 * <!-- in Order List page, for example -->
 *  <h2  appAnimate>Hover here to give me a random color and black bg</h2> 
 * */
    @HostListener('mouseover')
    performTask(): void {
        const randomColor = '#' + ((1 << 24) * Math.random() | 0).toString(16);
        this.renderer.setStyle(this.el.nativeElement, 'color', randomColor);
        this.renderer.setStyle(this.el.nativeElement, 'background-color', 'black');
    }
}
