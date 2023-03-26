import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCatNext]'
})
export class CatNextDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('click')
  nextFunction(){
    let ele = this.elementRef.nativeElement.parentElement.children[0];
    console.log(ele);
    let item = ele.getElementsByClassName("card");
    console.log(item);
    return ele.append(item[0]);
  }

}
