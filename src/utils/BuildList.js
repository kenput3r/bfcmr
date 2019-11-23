import TargetQty from './TargetQty';

const BuildList = (list, promise) => {
  //Loop Through TargetQty list
  const tq_keys = Object.keys(TargetQty);
  const List = [];
  for(let i = 0; i < tq_keys.length; i++) {
    const sku = tq_keys[i]
    const tq = TargetQty[sku];
    if(list[sku]) {
      List.push({sku: sku, name: list[sku].Name, target: tq, available: list[sku].Available})
    }else{
      List.push({sku: sku, name: 'SKU NOT FOUND WITH AVAILABILITY', target: tq, available: 0})
    }
  }
  return promise.resolve(List);
}

export default BuildList;