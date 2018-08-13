# Gaia Demo

The re-creation of a sub-category listing for the web application.
-----------------------------------------------------------------

## Setup
Clone this repository
`git clone https://github.com/fairlycasual/gaiaDemo.git`

Install Dependencies
`npm install`

Note that the bundle is prepared in this repo from before it was pushed. If however, you need to alter any static files that are bundled, run 
`npm run build`
from the command line in the project's directory to have Webpack bundle properly for display.

To view the application, from a command line in the relevant directory run: 
`npm run start`
and the page will be available at http://localhost:8080, which will automatically open in your browser.

## Design Decisions
The project is deployed as a React Single Page Application. Async fetch calls are executed on the client-side, as my time ran thin to implement the application in an isomorphic fashion leveraging Node.js after completing UI elements. 

## Comparison Imagery
Provided are images of the provided design comp, Gaia's live site, and my demo product.

design comp:
![designComp]

live page:
![liveSite]

demo product:
![demoProduct]

[designComp]: https://github.com/fairlycasual/gaiaDemo/blob/master/src/photos/designComp.png
[liveSite]: https://github.com/fairlycasual/gaiaDemo/blob/master/src/photos/liveSite.png
[demoProduct]: https://github.com/fairlycasual/gaiaDemo/blob/master/src/photos/demoProduct.png



