(function() {
  toshi = {
    url: 'wss://bitcoin.toshi.io',
    connection: null,
    init: function() {
      this.createwebsocket();

      // toshi.getStatus();
      // window.setInterval(function(){
      //   // toshi.getStatus();
      // }, 5000);  
    },
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
        // toshi.ontransaction(obj.data);
        var amount = obj.data.amount > 0 ? (obj.data.amount / 1e8).toFixed(8) : false;
        if($('#transaction-container').children().length > 10) {
          $('.transaction').remove();
        }
        $('#transaction-container').append('<div class="transaction">' + amount + '</div>');
        console.log(amount);
      }
    },
  };

  // new WebSocket('wss://bitcoin.toshi.io');
}());