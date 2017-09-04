
// Function used to generate the dropdown selectlist of currencies
function Gen_CurrSelectOption(listCurrencies) {
    var initialDropDownCurrencies = "";
    for (var i = 0; i < listCurrencies.length; i++) {
        initialDropDownCurrencies = initialDropDownCurrencies + Utilities_GenerateSelectOpt(listCurrencies[i].CurrencyID, listCurrencies[i].Value + " ( " + listCurrencies[i].Symbol + " )");
    }
    return initialDropDownCurrencies;
}

// Function used to generate an array of corresponding currencies
function Gen_CurrSelectOption_Arr(listCurrencies) {
    var currSelectOptionNum = new Array();
    for (var i = 0; i < listCurrencies.length; i++) {
        currSelectOptionNum[listCurrencies[i].CurrencyID] = i;
    }
    return currSelectOptionNum;
}

// Function generates the currencies for the specified country
function CurrencyDropDown_CountryChanged(selectedCountry, countriesCurrencies, listCurrencies, currSelectOptionNum) {
    var selectedCountryCurrOptions = "";
    var currencyID;
    var Internal_currSelectOptionNum;
    var currencyOptions;

    //debugger;

    if (selectedCountry !== undefined && selectedCountry !== null && selectedCountry !== "0") {
        for (var i = selectedCountry - 1; i < countriesCurrencies.length; i++) {
            if (selectedCountry == countriesCurrencies[i].CountryID) {
                currencyID = countriesCurrencies[i].CurrencyID;
                Internal_currSelectOptionNum = currSelectOptionNum[currencyID];
                currencyOptions = listCurrencies[Internal_currSelectOptionNum];
                selectedCountryCurrOptions = selectedCountryCurrOptions + Utilities_GenerateSelectOpt(currencyOptions.CurrencyID, currencyOptions.Value + " ( " + currencyOptions.Symbol + " )");
            }
            else if (selectedCountry <= countriesCurrencies[i].CountryID) {
                break;
            }
        }
    }
    else {
        currencyID = 1;
        Internal_currSelectOptionNum = currSelectOptionNum[currencyID];
        currencyOptions = listCurrencies[Internal_currSelectOptionNum];
        selectedCountryCurrOptions = selectedCountryCurrOptions + Utilities_GenerateSelectOpt(currencyOptions.CurrencyID, currencyOptions.Value + " ( " + currencyOptions.Symbol + " )");
    }
    return selectedCountryCurrOptions + Utilities_GenerateSelectOpt("0", "------------------------------------"); 
}

// Function used to compute the specified price to USD
function ComputePriceToUSD(jqElement, userEnteredAmount, currencyID) {
    if (currencyID !== "0" && ValidateLowerBoundedNumerics(userEnteredAmount, 0)) {
        jqElement.html(Math.round((parseFloat(userEnteredAmount) / ListCurrencies[CurrSelectOptionNum[currencyID]].CurrUsedStdExchangeRate) * 100) / 100);
        jqElement.formatCurrency($.formatCurrency.regions['DLR']);
    }
    else {
        jqElement.html("");
    }
}
