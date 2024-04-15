import axios from 'axios';

//NOTE: Demo key eventually needs to be replaced with actual key for app to reach full functionality
    
export const getIncomeStatement = async (ticker) => {
    try{
        let incomeStatement;
        if(ticker){
            incomeStatement = await axios.get(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=demo`);
            if(!incomeStatement.data.quarterlyReports){
                return [];
            }
            else{
                return incomeStatement.data.quarterlyReports;
            }
        }
        else{
            incomeStatement = await axios.get("https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo");
            return incomeStatement.data.quarterlyReports;
        }
    }
    catch(e){
        console.log(e);
        throw e;
    }
}

export const getBalanceSheet = async (ticker) => {
    try{
        let balanceSheet;
        if(ticker){
            balanceSheet = await axios.get(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=demo`);
            if(!balanceSheet.data.quarterlyReports){
                return [];
            }
            else{
                return balanceSheet.data.quarterlyReports;
            }
        }
        else{
            balanceSheet = await axios.get("https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo");
            return balanceSheet.data.quarterlyReports;
        }
    }
    catch(e){
        console.log(e);
        throw e;
    }
}

export const searchTicker = async (searchString) => {
    try{
        const tickerResults = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchString}&apikey=demo`)
        return tickerResults.data;
    }
    catch(e){
        console.log(e);
        throw e;
    }
}