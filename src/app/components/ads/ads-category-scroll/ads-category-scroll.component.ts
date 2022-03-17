import { AfterViewInit, Component, Input } from '@angular/core';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
declare var $: any;

@Component({
  selector: 'ads-category-scroll',
  templateUrl: './ads-category-scroll.component.html',
  styleUrls: ['./ads-category-scroll.component.css']
})
export class AdsCategoryScrollComponent implements AfterViewInit {

  @Input() categories: any[] = []
  constructor(
    public _listingservices: ListingsService,
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if(this.categories.length > 0) {
        const owl = $('.owl-carousel');
        owl.owlCarousel({
          items: 4,
          margin: 10,
          loop: true,
          autoplay: true,
          autoplayTimeout: 1000,
          autoplayHoverPause: true,
          responsive: {
            0: {
              items: 3,
              nav: false,
              loop: true,
            },
            600: {
              items: 3,
              nav: false,
              loop: true,
            },
            1000: {
              items: 7,
              nav: false,
              loop: true
            }
          }
        });
      }
    }, 1000)
  }

}
