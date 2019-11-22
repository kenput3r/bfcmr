import Credentials from '../Credentials';

/**
 * @function GetInventory - Fetches inventory from inventory.dearsystems.com, API V1
 * @param {Number} page - the page number to fetch
 * @param {function} updateProgress - updates the ui with a message
 * @param {Promise} promise - resolves or rejects
 * @param {object} inventory - optional object, used for recursion
 */
const GetInventory = async (page, updateProgress, promise, inventory) => {
  const fetch_url = `https://inventory.dearsystems.com/ExternalApi/v2/ref/productavailability?Page=${page}&Limit=1000`;
  const fetch_headers = new Headers({
    'Content-Type': 'application/json',
    'api-auth-accountid': Credentials.id,
    'api-auth-applicationkey': Credentials.key
  });
  if(page === 1) updateProgress(`Getting inventory page ${page}`, 5);
  try {
    const data = await fetch(fetch_url, {
      method: 'get',
      headers: fetch_headers
    });
    const json = await data.json();
    let new_inventory = inventory || {};
    const total_items = json.Total; //total SKUs with a location and availability
    let page = json.Page; //current page
    const pages = Math.ceil(total_items / 1000); //total number of pages to fetch
    const list = json.ProductAvailabilityList; //the current page of SKUs
    //loop through list and format as object with SKUs as keys
    for(let i = 0; i < list.length; i++) {
      const item = list[i];
      const sku = item.SKU;
      if(item.Location === 'Main Warehouse') {
        //if the item is already in the object
        if(new_inventory[sku]) {
          new_inventory[sku].Available = new_inventory[sku].Available + item.Available;
        }else {
          new_inventory[sku] = item;
        }
      }
    }
    if(page < pages) {
      GetInventory(++page, updateProgress, promise, new_inventory);
      updateProgress(`Getting inventory page ${page} of ${pages}`, page / pages * 100);
    }else{
      return promise.resolve(new_inventory);
    }
  }catch(error) {
    return promise.reject(error);
  }
}

export default GetInventory;