let io = require('socket.io-client'); // version 3.0.1
var crypto = require('crypto');
var zlib = require('zlib');
const logger = require("./logger");

let socket;
let apiKey = '82c08b7a9859e057dc822ba9130eeb75';
let apiSecret = '4dbe70e5ef00f9518bb6a289fadb604b751a5cdfbdc989036de05493e940fefc';
let socketUrl = 'https://api.koinknight.com/api';
let arbitrageType = 'direct_arbitrage'; // This value can be direct_arbitrage,
// triangular_arbitrage, loop_arbitrage and intra_exchange_arbitrage
let withVolume = true; // If this flag is true, then volume is considered in arb calculation.
let sortBy = 'profit'; // Default sort is percentage if not passed any value. It only works when withVolume is true
let sortOrder = 'asc'; // Default order is descending if not passed any value. It only works when withVolume is true
let market = 'BTC'; // Market can be BTC, ETH, USDT
let disabledWallets =false;
class apiController {
  static getListenMessageKey() {
    let listenMessageKey = arbitrageType;
    if (arbitrageType === 'direct_arbitrage' && disabledWallets) {
        listenMessageKey =  `disabled_${listenMessageKey}`;
    }
    if (withVolume) {
        listenMessageKey += `_volume`;
        if (sortBy === 'profit') {
            listenMessageKey += `_${sortBy}`;
        }
    }
    listenMessageKey += `_${market}`;
    listenMessageKey += `_${apiKey}`;
    if (withVolume && sortOrder === 'asc') {
        listenMessageKey += `_${sortOrder}`;
    }
    return listenMessageKey;
 }
 
 static getSignature() {
 
    let timestamp = Date.now();
    var hmac = crypto.createHmac('sha256', apiSecret);
    hmac.update(timestamp + apiKey);
    let signature = hmac.digest('hex');
    return {signature: signature, timestamp: timestamp};
 }
 
 static init() {
    console.log(123)
    let signatureData = this.getSignature();
    
    let listenMessageKey = this.getListenMessageKey();
    socket = io(socketUrl, {
        extraHeaders: {
            'x-koinknight-apikey': apiKey,
            'x-koinknight-signature': signatureData.signature,
            'x-koinknight-timestamp': signatureData.timestamp
        }
 
    });
 
 
    socket.on('connect', () => {
        logger.info("Socket Connected");
        // subscribe to api for direct arbitrage. Top 200 arbitrages will be emitted
        socket.emit('kk_api_subscribe', {
            "kk_room":"arbitrages",
            "arbitrage_type": arbitrageType,
            "market": market,
            "with_volume": withVolume,
            "sort_order": sortOrder,
            "sort_by": sortBy
        });
 
        // If you want to unsubscribe to the channel, then pass the event name kk_api_unsubscribe with the same data
        // socket.emit('kk_api_unsubscribe', {
        //     "kk_room":"arbitrages",
        //     "arbitrage_type": arbitrageType,
        //     "market": market,
        //     "with_volume": withVolume,
        //     "sort_order": sortOrder,
        //     "sort_by": sortBy
        // });
    });
 
 
    socket.on('disconnect', () => {
        logger.info("Socket Disconnected");
        socket.io.reconnect();
    });
 
    socket.on(listenMessageKey, (msg) => {
        let data = JSON.parse(zlib.inflateSync(new Buffer(msg.data, 'base64')).toString());
        console.log("data",data)
    })
 
    socket.on('error', (err) => {
        console.log("error",err)
        logger.error("Error in socket :: %s", err);
    })
 
    socket.on('custom_error', (err) => {
        console.log("custom_error",err)
        logger.error("Error in socket :: %s", err);
    })
 
 }
}

module.exports = apiController