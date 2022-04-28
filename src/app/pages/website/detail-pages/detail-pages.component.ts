import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart } from '@angular/router';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';
import { MessagingService } from 'src/app/services/features/messaging/messaging.service';
import { UsersService } from 'src/app/services/features/users';

@Component({
  selector: 'app-detail-pages',
  templateUrl: './detail-pages.component.html',
  styleUrls: ['./detail-pages.component.css'],
})
export class DetailPagesComponent implements OnInit {
  showContact: boolean = false;
  url: any = this._global.url.split('/');
  constructor(
    private _global: GlobalsService,
    public _listingservices: ListingsService,
    public messagingServices: MessagingService
  ) {}

  async ngOnInit() {
    if (this.url.length === 4)
      await this._listingservices.getlistings(
        '/all',
        `?brands=${this.url[this.url.length - 2]}&limit=1000`
      );
    if (this.url.length === 4)
      await this._listingservices.getlistings(
        `/${this.url[this.url.length - 1]}`,
        ``,
        'single'
      );
    // this.getAds()
  }

  getAds() {
    this._global.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        let url = event.url.split('/');
        if (url.length === 4)
          await this._listingservices.getlistings(
            '/all',
            `?brands=${url[url.length - 2]}&limit=1000`
          );
        if (url.length === 4)
          await this._listingservices.getlistings(
            `/${url[url.length - 1]}`,
            ``,
            'single'
          );
      }
    });
  }

  toogle() {
    console.log(this._listingservices?.listingInfo?.user);
    this.showContact = !this.showContact ? true : false;
  }

  async createChannel() {
    let channel = {
      channel_name: this._listingservices?.listingInfo?.name,
      users: [
        {
          uid: this._listingservices?.listingInfo?.user?.uid,
        },
      ],
      image: this._listingservices?.listingInfo?.images[0],
    };

    const resp: any = await this.messagingServices.postChannels(channel);
    await this._global.router.navigate([
      'accounts/messages/' + resp.channel_id,
    ]);
  }
}
