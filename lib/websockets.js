(function() {
  toshi = {
    url: 'wss://bitcoin.toshi.io',
    connection: null,
    init: function() {
      this.createwebsocket();
      $('#total-transactions').append('<h2>' + this.totalTransactions + '</h2>');
      // toshi.getStatus();
      // window.setInterval(function(){
      //   // toshi.getStatus();
      // }, 5000);  
    },
    totalTransactions: 0,
    createwebsocket: function() {
      this.connection = new WebSocket(this.url);
      this.connection.onopen = this.onopen;
      this.connection.onclose = this.onclose;
      this.connection.onerror = this.onerror;
      this.connection.onmessage = this.onmessage;
    },
    onopen: function() {
      console.log('websocket connection open!');
      toshi.connection.send(JSON.stringify({ subscribe: 'transactions' }));
    },
    onclose: function(){
      console.log('Websocket connection closed');
      toshi.reconnectwebsocket();
    },
    onerror: function(error){
      console.log('Websocket error detected');
    },
    onmessage: function(e) {
      var obj = JSON.parse(e.data);

      if(obj.subscription === 'transactions') {
        var amount = obj.data.amount > 0 ? (obj.data.amount / 1e8).toFixed(8) : false;
        amount = parseFloat(amount);
        console.log('sum of totalTransactions and amount is ', toshi.totalTransactions + amount);
        toshi.totalTransactions = toshi.totalTransactions + amount;
        // console.log(toshi.totalTransactions);
        $('#total-transactions h2').replaceWith('<h2>' + toshi.totalTransactions + '</h2>');;
        if($('#transaction-container').children().length > 10) {
          $('.transaction').remove();
        }
        $('#transaction-container').append('<div class="transaction">' + amount + '</div>');
      }
    },
  };

  // new WebSocket('wss://bitcoin.toshi.io');
}());