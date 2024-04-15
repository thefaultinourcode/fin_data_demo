import React, { useEffect } from "react";
import { getIncomeStatement, getBalanceSheet, searchTicker } from "../data/apiCalls";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import 'semantic-ui-css/semantic.min.css';
import { Dropdown } from 'semantic-ui-react';

function LineChart(){
    const [is, setIS] = React.useState(null);
    const [bs, setBS] = React.useState(null); 
    const [selectedTicker, setSelectedTicker] = React.useState(null);
    const [options, setOptions] = React.useState(null);
    const [title, setTitle] = React.useState('IBM');

    //get options for companies based on user input
    async function getOptions(e){
        let data = await searchTicker(e.target.value);
        let newOptions = [];
        if(data.bestMatches){
            for(let i = 0; i < data.bestMatches.length; i++){
                newOptions.push({
                    key: data.bestMatches[i]['1. symbol'],
                    text: data.bestMatches[i]['2. name'] + " (" + data.bestMatches[i]['1. symbol'] + ")" ,
                    value: data.bestMatches[i]['1. symbol']
                })
            }
            setOptions(newOptions);
        }
    }

    async function tickerSubmit(e) {
        e.preventDefault();  
        try{
          const incomeStatement = await getIncomeStatement(selectedTicker);
          setIS(incomeStatement);
          const balanceSheet = await getBalanceSheet(selectedTicker);
          setBS(balanceSheet);
          setTitle(selectedTicker);
          alert("Due to API limits, this web app can't reliably pull data from the API. See the code for the logic of pulling this data from the API. The data won't show on this page, but the logic that could pull the correct data and display it is there.");
        }
        catch(err){
          console.log(err);
        }
    }

    async function fetchData(query){
        try{
            const incomeStatement = await getIncomeStatement();
            setIS(incomeStatement);
            const balanceSheet = await getBalanceSheet();
            setBS(balanceSheet);         
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const chartData = [];
    if(is !== null && bs !== null){    
      if(is.length == bs.length && is.length !== 0){
  
        for(let i = 0; i < is.length; i++){
          if(is[i].fiscalDateEnding === bs[i].fiscalDateEnding){
              chartData.push({label: is[i].fiscalDateEnding, netIncome: is[i].netIncome, totalRevenue:is[i].totalRevenue, totalShareholderEquity: bs[i].totalShareholderEquity})
          } 
        }
        //data starts with most recent quarter, so need to reverse it to make chart more readable
        chartData.reverse();
      }
      else if(is.length ===0 || bs.length === 0){
        chartData.push({label: "", netIncome: "", totalRevenue:"", totalShareholderEquity:""});
      }
      //cover the rare edge case that income statement and balance sheet are out of sync on number of quarters
      else{
        let longerArray;
        if(is.length > bs.length){
          longerArray = is;
        }
        else if(bs.length < is.length){
          longerArray = bs;
        }
        //refactor into function?
        for(let i = 0; i < longerArray.length; i++){
          if(is[i].fiscalDateEnding === bs[i].fiscalDateEnding){
              chartData.push({label: is[i].fiscalDateEnding, netIncome: is[i].netIncome, totalRevenue:is[i].totalRevenue, totalShareholderEquity: bs[i].totalShareholderEquity})
          } 
        }
        chartData.reverse();
      }
    }



    return(
            <div>
              <div className="ticker">
                  <form>
                  <Dropdown id="tickerDD" 
                              placeholder='Example of Ticker Search (Search "BA")' 
                              search 
                              selection 
                              options={options}
                              onKeyUp={getOptions}
                              onChange={(e, data) => setSelectedTicker(data.value)}/>
                  <button className="ui button" onClick={tickerSubmit}>Show Data</button>
                  </form>
              </div>
              <h1>{title} Quarterly Financial Data</h1>
              <Line data={{
                  labels: chartData.map((data) => data.label),
                  datasets: [
                  {
                      label:"Net Income",
                      data: chartData.map((data) => data.netIncome),
                      pointStyle: "rectRot",
                      pointRadius: 7
                  },
                  {
                      label:"Total Revenue",
                      data: chartData.map((data) => data.totalRevenue),
                      pointStyle: "rectRot",
                      pointRadius: 7
                  },
                  {
                      label:"Total Shareholder Equity",
                      data: chartData.map((data) => data.totalShareholderEquity),
                      pointStyle: "rectRot",
                      pointRadius: 7
                  }  
                    ],
                  }
                } 
                options={ 
                {
                  scales: {
                    y: {
                        ticks: {
                          callback: function(value, index, ticks) {
                            let label = new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              maximumFractionDigits: 0, 
                              minimumFractionDigits: 0
                            }).format(value);
                            return label;
                          }
                      } 
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'End of Quarter',
                        font: {
                          size: 16
                        }
                      }
                    }
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function(context){
                          let label = context.dataset.label || '';
                          if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              maximumFractionDigits: 0, 
                              minimumFractionDigits: 0
                            }).format(context.parsed.y);
                          }
                          return label;
                        }
                      }
                    }
                  }
                }}>
              </Line>
            
        </div>

    );
}

export default LineChart;