// HTTP Library
const axios = require('axios')
const apiURL = 'https://api.coinbase.com/v2/prices/spot?currency=USD';

/**
 * currentBtcPrice
 * @returns HTTP response with the current BTC price in USD
 */
const currentBtcPrice = function (){
    return new Promise((resolve) => {
        axios({
            method: 'get',
            url: apiURL
        }).then(function (res){
            resolve(res.data);
        })
    })
}

module.exports = {
    currentBtcPrice
}