import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/services/core/globals.service';
import { ListingsService } from 'src/app/services/features/listings/listings.service';

@Component({
  selector: 'accounts-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  ads: any[] = []
  p: number = 1;
  limit: any = 10
  constructor(
    private _global: GlobalsService,
    public _listingservices: ListingsService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.refreshAds();
  }

  async refreshAds(){
    await this._listingservices.getlistings('', ``).then((resp: any) => {
      this.ads = resp;
      // console.log(resp)
    }).catch((err: any) => {
      this.ads = []
    })
  }

  async onDelete(ads_id: string){
		if(confirm('Are you sure you want to delete this ad?') == true){
			await this._listingservices.deletelisting(ads_id);
      this.toastr.success('Ad deleted successfully.', 'Delete Ad!');
      this.refreshAds();
	  }
	}

  onEdit(ads_id: string){
    this._global.router.navigateByUrl(`accounts/listings/edit/${ads_id}`)
  }

}
