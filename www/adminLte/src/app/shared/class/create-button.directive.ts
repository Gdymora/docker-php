import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
     selector: '[createButton]' 
})
/**
 * @example
 * <!-- in Order List page, for example -->
<div createButton><p>Click to add a button!</p></div> 
*/
export class CreateButton {
   constructor(private elRef: ElementRef, private renderer: Renderer2) {}

   @HostListener('click')
   performTask() {
     const button = this.renderer.createElement('button');
     const buttonText = this.renderer.createText('This is a button');
     const comment = this.renderer.createComment('createComment? Comment Created!');
     const parent = this.elRef.nativeElement.parentNode;
     const reference = this.elRef.nativeElement;
     this.renderer.appendChild(button, buttonText);
     this.renderer.insertBefore(parent, comment, reference );
     this.renderer.appendChild(this.elRef.nativeElement, button);

   }
}
