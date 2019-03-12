#Guide

This script will host a simple web server on the machine that this is executed on.
You can optionally provide a browser (chrome/safari/firefox configured by default)

`npm install` alternatively examine index.js

##To execute the test run with defaults (chrome)

`npm start`

##To execute the test run example (local safari)

`PORT=3333 HOST=localhost BROWSER=safari node index.js`


##To execute the test run example (local firefox)

`PORT=3333 HOST=localhost BROWSER=firefox node index.js`

##Run test remotely

`PORT=3333 HOST=mysitename BROWSER=safari REMOTE_SERVER=http://remotseleniumserver:4444/wd/hub node index.js`
## Set custom port/host
`HOST=localhost PORT=3333 node index.js`
