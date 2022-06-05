import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'cartService/cart.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DrugsService } from '../service/drugs.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {
  itemList: any;
  photoItems: any;
  image:any;
  k:any;
  @ViewChild("par") par: ElementRef | undefined;
  imageSource: Object | undefined;
  xyz = [];

  constructor(private drugsService: DrugsService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    // this.drugsService.getDrugs().subscribe((result)=>{
    //   console.warn('drugs',result);
    //   this.itemList = result;
    // });

    this.drugsService.getPhotos().subscribe((res)=>{
      console.log('photos',res);
      this.photoItems = res;
      console.log(this.photoItems);
      for (let i of this.photoItems){

        // console.log('photo',i.image.data);
        this.image = i.image.data;
        // console.log('image',this.image);
        this.imageSource = this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.image}`);
        // this.xyz = [this.imageSource]
        console.log(this.imageSource);
      }
      
    });



  }



}
