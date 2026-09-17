// const MID_MARKET = 27.85; // MYR→KES. Grab today's from Google.

// const PROVIDERS = [
//   { name: "Wise",         flatFee: 8.50, pctFee: 0,     fxMarginPct: 0.006 },
//   { name: "WorldRemit",   flatFee: 0,    pctFee: 0.015, fxMarginPct: 0.021 },
//   { name: "Revolut",      flatFee: 0,    pctFee: 0,     fxMarginPct: 0.010 },
//   { name: "Instarem",     flatFee: 6.00, pctFee: 0,     fxMarginPct: 0.008 },
//   { name: "Western Union",flatFee: 12.00,pctFee: 0,     fxMarginPct: 0.035 }
// ];



// function totalFee (amount, provider){
//     // loop through every provider to find the one matching by name
//     for (let i=0;i < (PROVIDERS.length);i++){
//         if (PROVIDERS[i].name== provider){ // array. the keys or values 
//           // flat fee + percentage fee on the amount
//           const fee = PROVIDERS[i].flatFee + amount * PROVIDERS[i].pctFee;
//           return fee
//         }}
          
      
//     return null }//nothing found 
        
// console.log(totalFee(1000,"Wise")) // calling function

// function effectiveRate(provider) { 
  
//   // loop through every provider to find the one matching by name
//   for (let i=0;i < (PROVIDERS.length);i++){
//         if (PROVIDERS[i].name== provider){ // array. the keys or values 
//           // mid-market rate minus this provider's fx margin cut
//           const rate = (MID_MARKET-(PROVIDERS[i].fxMarginPct * MID_MARKET)).toFixed(2);
//           return rate
//         }}
//   return null // provider not found
// } 
// console.log(effectiveRate("Wise"))

// function amountReceived(amount, provider) { 
//   // bail out early if provider doesn't exist
//   if (effectiveRate(provider) == null || totalFee(amount,provider) == null){
//     return "Check cridentials"}
//   else{
//   // subtract fee first, then convert the leftover using the effective rate
//   const amountConverted = (effectiveRate(provider) * (amount-totalFee(amount,provider))).toFixed(2)
//   return  amountConverted }
  
// }
// console.log(amountReceived(1000, "Wise"));

// function trueCostPct(amount, provider) { 
//   // (ideal amount - actual received) / ideal amount, as a %
//   const x= ((((amount * MID_MARKET)-(amountReceived(amount, provider)))/ (amount * MID_MARKET))*100).toFixed(2)
//   return x
// }
// console.log(trueCostPct(1000, "Wise")); // ~1.45


const MID_MARKET = 27.85; // MYR→KES. Grab today's from Google.

const PROVIDERS = [
  { name: "Wise",          flatFee: 8.50, pctFee: 0,     fxMarginPct: 0.006 },
  { name: "WorldRemit",    flatFee: 0,    pctFee: 0.015, fxMarginPct: 0.021 },
  { name: "Revolut",       flatFee: 0,    pctFee: 0,     fxMarginPct: 0.010 },
  { name: "Instarem",      flatFee: 6.00, pctFee: 0,     fxMarginPct: 0.008 },
  { name: "Western Union", flatFee: 12.00,pctFee: 0,     fxMarginPct: 0.035 }
];

function totalFee(amount, provider) {
  // flat fee + percentage fee on the amount
  const fee = provider.flatFee + amount * provider.pctFee;
  return fee;
}
console.log(totalFee(1000, PROVIDERS[0])); // calling function

function effectiveRate(provider) {
  // mid-market rate minus this provider's fx margin cut
  const rate = MID_MARKET - (provider.fxMarginPct * MID_MARKET);
  return rate;
}
console.log(effectiveRate(PROVIDERS[0]));

function amountReceived(amount, provider) {
  // subtract fee first, then convert the leftover using the effective rate
  const amountConverted = effectiveRate(provider) * (amount - totalFee(amount, provider));
  return amountConverted;
}
console.log(amountReceived(1000, PROVIDERS[0]));

function trueCostPct(amount, provider) {
  // (ideal amount - actual received) / ideal amount, as a %
  const x = ((amount * MID_MARKET) - amountReceived(amount, provider)) / (amount * MID_MARKET) * 100;
  return x;
}
console.log(trueCostPct(1000, PROVIDERS[0])); // ~1.45


const textArea = document.getElementById("amountInput");
const listss = document.getElementById("results");
const kes = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES"
});

function output() {
  const amount = Number(textArea.value);

  // build one result object per provider, by hand
  const ranked = [];
  for (let i = 0; i < PROVIDERS.length; i++) {
    const provider = PROVIDERS[i];
    ranked.push({
      name: provider.name,
      received: amountReceived(amount, provider),
      cost: trueCostPct(amount, provider)
    });
  }

  // cheapest true cost first
  ranked.sort((a, b) => a.cost - b.cost);

  // wipe old results, then rebuild
  listss.innerHTML = "";

  for (let i = 0; i < ranked.length; i++) {
    const item = ranked[i];
    const childList = document.createElement("li");
    childList.textContent = item.name + " — " + kes.format(item.received) + " — " + item.cost.toFixed(2) + "%";
    listss.appendChild(childList);
  }
}

textArea.addEventListener("input", output);