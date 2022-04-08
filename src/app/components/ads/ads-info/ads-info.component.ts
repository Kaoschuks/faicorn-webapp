import { Component, Input, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
declare var document: any

@Component({
  selector: 'ads-info',
  templateUrl: './ads-info.component.html',
  styleUrls: ['./ads-info.component.css']
})
export class AdsInfoComponent implements OnInit {

  @Input() adsInfo: any;
  imgId = 1;
  imgCount: Array<any> = Array.from(Array(5).keys())
  constructor(
    public _global: GlobalsService,
    public _listingservices: ListingsService
  ) { }

  ngOnInit(): void {
    const imgs: any = document.querySelectorAll('.img-select a');
    const imgBtns: any = [...imgs];
    

    imgBtns.forEach((imgItem: any) => {
      imgItem.addEventListener('click', (event: any) => {
        event.preventDefault();
        this.imgId = imgItem.dataset.id;
        this.slideImage();
      });
    });

    window.addEventListener('resize', this.slideImage);
  }


  slideImage() {
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (this.imgId - 1) * displayWidth}px)`;
  }


}
