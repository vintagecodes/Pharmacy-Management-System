import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private elementRef: ElementRef) {
    
   }

   @HostListener('click')
   nextFunction() {
    let ele = this.elementRef.nativeElement.parentElement.parentElement.children[0];
    // console.log(ele);
    let item = ele.getElementsByClassName("items");
    console.log(item);
    ele.append(item[0]);
    console.log(ele)
   }

}
