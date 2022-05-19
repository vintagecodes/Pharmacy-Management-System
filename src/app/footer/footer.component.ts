import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // public sendEmail(e: Event) {
  //   e.preventDefault();
  //   emailjs.sendForm('ritik_raj', 'ritik_raj', e.target as HTMLFormElement, '')
  //     .then((result: EmailJSResponseStatus) => {
  //       console.log(result.text);
  //     }, (error: { text: any; }) => {
  //       console.log(error.text);
  //     });
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
