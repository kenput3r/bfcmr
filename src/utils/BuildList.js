import TargetQty from './TargetQty';

const BuildList = (list) => {
  //Loop Through TargetQty list
  const tq_keys = Object.keys(TargetQty);
  for(let i = 0; i < tq_keys.length; i++) {
    const sku = tq_keys[i]
    const tq = TargetQty[sku];
    console.log(tq);
  }
}

export default BuildList;