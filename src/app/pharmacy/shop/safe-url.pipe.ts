import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value: any, ...args: any[]): any {

    let objectUrl = 'data:image/jpeg;base64,'+value;

    return this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
  }

}
