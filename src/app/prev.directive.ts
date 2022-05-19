import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('click')
   prevFunction() {
    let ele = this.elementRef.nativeElement.parentElement.parentElement.children[0];
    let item = ele.getElementsByClassName('items');
    ele.append(item[0]);
    console.log(ele);
   }

}
