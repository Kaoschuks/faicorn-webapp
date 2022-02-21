import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'listingsFilter'
})
export class ListingsFilterPipe implements PipeTransform {

    transform(items: any, filter: any): any {
        if (!filter) {
            return items;
        }

        if (!Array.isArray(items)) {
            return items;
        }

        if (filter && Array.isArray(items)) {
            let filteredData: any[] = [];
            items.forEach(item => {
                var array = item.price.split(" ");
                var prices = array.filter((i: any) => { return i !== 'GHS' && i !== 'to'});
            
                if (Number(prices[0]) >= filter && Number(prices[0]) <= 1600) {
                    filteredData.push(item);
                }
            })
            
            return filteredData;
        }
    }
}