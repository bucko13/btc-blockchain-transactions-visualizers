bitcoinApp.service('exchangeRates' , [ '$http', '$q', function($http, $q) {
  var exchangeRate = function(targetCurrency) {
    var request = $http({
      method: 'GET',
      url: 'https://api.coinbase.com/v2/exchange-rates',
      params: {
        currency: 'BTC'
      }
    });

    return request.then(handleSuccess, handleError);
  }

  //$http sample code borrowed from 
  //http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm
  function handleError( response ) {
      if ( ! angular.isObject( response.data ) ||
          ! response.data.message
          ) {
        return( $q.reject( "An unknown error occurred." ) );
      }
      // Otherwise, use expected error message.
      return( $q.reject( response.data.message ) );
    }
    // I transform the successful response, unwrapping the application data
    // from the API response payload.
  function handleSuccess( response ) {
        return( response.data.data.rates);
  }

  //this is the function we want to be accessible externally
  return exchangeRate;
}]);

//pass this service into the controller
// the controller will use the service in something called 
// like "add remote data", this service will return with a promise
// in controller, we'll pass in a variable for target exchange
// this should take $http and $q

// method returns : request.then(handleSuccess, handleError)
// 