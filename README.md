
# Bitcoin Blockchain Transactions Visualizer #
 
## A Visualizer for Live Transactions on the Bitcoin Blockchain ##

### A way to track the volume and size of transactions in real time as they occur on the blockchain ###

## Summary ##
  > Utilizing the Coinbase Network API, Toshi, the visualizer subscribes to a live feed of current transactions 
   being made on the Bitcoin blockchain, presenting them to users as droplet like images reflecting the proportional 
   size of the transaction. The app will contain *timer* and *total transactions* fields to display the total number of
   transactions made within a certain time. These fields can be reset by the user. 


## Problem ##
  > While transactions on the Bitcoin Blockchain are pseudonymous, the blockchain remains completely transparent
  allowing anyone to view every transaction every made on the blockchain. Seeing real transactions as they are made
  provides a window into how Bitcoin is being used today. The size of the transactions, from tiny micro-transactions, to huge sums of tens of thousands of dollars shows the real life applications of what a system like Bitcoin can provide.

## Solution ##
  > To easily access the blockchain data, we make use of the freely available Coinbase Network API, Toshi, subscribing to its websocket service to receive live transaction updates. AngularJS is used to render the front end interface, and the d3js library is used to bind the data to elements on the screen in order to render the visualization.

## Quote from You ##
  > "This tool will help Bitcoin make yet another step towards the mainstream as it brings the real world implications of this amazing new technology to life, in a way that is not possible with any other mainstream currency."

## How to Get Started ##
  > Just head on over to the main page and watch the transactions start to roll in!

## Customer Quote ##
  > "I thought Bitcoin was just play money for Internet geeks, when I started to see how much money was actually being transacted, in real time, I was blown away!"

## Closing and Call to Action ##
  > Head on over to the app and start tracking transaction data. If you have any ideas for what else you'd like to see represented in the visualization, we accept pull requests!  

