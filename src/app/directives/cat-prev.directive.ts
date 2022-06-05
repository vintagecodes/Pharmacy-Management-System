import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCatPrev]'
})
export class CatPrevDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('click')
  prevFunction(){
    let ele = this.elementRef.nativeElement.parentElement.parentElement.children[0];
    console.log(ele);
    let item = ele.getElementsByClassName("card");
    console.log(ele.append(item[0]));
  }

}
