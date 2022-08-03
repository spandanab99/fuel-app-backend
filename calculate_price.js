const pricePerGallon = 1.50;

calculatePrice = (requestedGallons,state,quotes)=>{
    
    const locationFactor = state.toLowerCase()=='tx' ? 2 : 4;
    const rateHistoryFactor = quotes>0 ? 1 : 0;
    const gallonsRequestedFactor = requestedGallons >1000 ? 2 : 3;
    const companyProfitFactor = 10;

    const margin = pricePerGallon * (locationFactor - rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor)/100;
    const suggestedPricePerGallon = pricePerGallon + margin;
    const totalDue = requestedGallons * suggestedPricePerGallon ;
    return {suggestedPrice:suggestedPricePerGallon,totalDue:totalDue};
}

module.exports = {
    calculatePrice
}  