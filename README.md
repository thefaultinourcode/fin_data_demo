# Finacial Data Demo

## How to run the project locally

1. Download project from GitHub, extract the files to the location you prefer.

2. Open terminal and navigate to the directory downloaded from github

3. Install dependencies in directory with this command
```npm i```

4. After dependencies have been installed, start the server with this command
```npm start```

5. Go to localhost:3000 in your web browser to view the application

## About the Project

### Requirements
1. Use React to build the application.

2. Fetch historical quarterly financial data from the Alpha Vantage API for a specified stock symbol.

3. Plot the following data points on a chart:
    * Quarterly net income from the Income Statement.
    * Quarterly total revenue from the Income Statement.
    * Quarterly total shareholder equity from the Balance Sheet.

4. Display the chart in a visually appealing way on the page.

5. [Optional] Include an input field or any other suitable UI element to allow users to search for different stock symbols or companies.

6. Implement error handling for failed API requests.

7. Add any additional features or improvements you think would enhance the application.

### Notes

The application is designed to display a chart of net income, total revenue, and shareholder equity for IBM across quarters from the [Alpha Vantage Stock API](https://www.alphavantage.co/documentation/). 

Due to constraints on free API keys, this application only uses the demo API key. The logic underlying the application can accomdate searching different companies and displaying their data, but without adequate ability to query the API while developing, I was limited to the demo API calls available (data from IBM, specific search strings). 

Therefore only data from IBM will be displayed on the chart, and while the strings available from the demo API ("BA", "SAIC", "tesco", and "tencent") can be queried in the search and companies that match those strings will be displayed in the dropdown, selecting any of them won't return any data, since the financial data for those companies is not available with the demo key. The underlying logic of the code is able to accomodate changes to make API calls for data on other companies, I would just need an API key that didn't so quickly run out of calls. (The current free API key is limited to 25 calls per day.)

I also started to incorporate light mode and dark mode logic into this application, but it is currently a work in progress. I've left the button in to show how it might work, and the foundational logic has been implemented in the code. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
