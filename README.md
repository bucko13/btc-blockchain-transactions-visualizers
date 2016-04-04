
# Bitcoin Blockchain Transactions Visualizer #

<!-- 
> This material was originally posted [here](http://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management). It is reproduced here for posterities sake.

There is an approach called "working backwards" that is widely used at Amazon. They work backwards from the customer, rather than starting with an idea for a product and trying to bolt customers onto it. While working backwards can be applied to any specific product decision, using this approach is especially important when developing new products or features.

For new initiatives a product manager typically starts by writing an internal press release announcing the finished product. The target audience for the press release is the new/updated product's customers, which can be retail customers or internal users of a tool or technology. Internal press releases are centered around the customer problem, how current solutions (internal or external) fail, and how the new product will blow away existing solutions.

If the benefits listed don't sound very interesting or exciting to customers, then perhaps they're not (and shouldn't be built). Instead, the product manager should keep iterating on the press release until they've come up with benefits that actually sound like benefits. Iterating on a press release is a lot less expensive than iterating on the product itself (and quicker!).

If the press release is more than a page and a half, it is probably too long. Keep it simple. 3-4 sentences for most paragraphs. Cut out the fat. Don't make it into a spec. You can accompany the press release with a FAQ that answers all of the other business or execution questions so the press release can stay focused on what the customer gets. My rule of thumb is that if the press release is hard to write, then the product is probably going to suck. Keep working at it until the outline for each paragraph flows. 

Oh, and I also like to write press-releases in what I call "Oprah-speak" for mainstream consumer products. Imagine you're sitting on Oprah's couch and have just explained the product to her, and then you listen as she explains it to her audience. That's "Oprah-speak", not "Geek-speak".

Once the project moves into development, the press release can be used as a touchstone; a guiding light. The product team can ask themselves, "Are we building what is in the press release?" If they find they're spending time building things that aren't in the press release (overbuilding), they need to ask themselves why. This keeps product development focused on achieving the customer benefits and not building extraneous stuff that takes longer to build, takes resources to maintain, and doesn't provide real customer benefit (at least not enough to warrant inclusion in the press release).
 -->
 
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

