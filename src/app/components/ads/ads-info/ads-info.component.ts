import { Component, Input, OnInit } from '@angular/core';
declare var document: any

@Component({
  selector: 'ads-info',
  templateUrl: './ads-info.component.html',
  styleUrls: ['./ads-info.component.css']
})
export class AdsInfoComponent implements OnInit {

  @Input() adsInfo: any;
  imgId = 1;
  constructor() { }

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
