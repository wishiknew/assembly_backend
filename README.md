I am writing the solution in just node. That is right. With no frameworks like express. Becuase for this project that might not be necessary.


A simple test ui is laid out in the home page. You will see a form where you can make requests directly.

this will make requests to the api.

install all the dependencies with ```npm i```

do ```node server.js``` to run the server

the go to localhost:3000 for the http server

if you want to serve the https server go to localhost:3001
But before that got to the https folder and do ```./keyGeneration.sh``` using the git-bash shell
and uncomment the lines for the https server(lines 26-38 in server.js)

the api endpoint matches that in the documentation

/api/visitors?date=YOUR-DATE-IN-MILLIS&ignore=THE-MUSEUM-TO-BE-IGNORED

I have hosted the server on heroku:
https://assembly-simple-node-server.herokuapp.com/

these are the endpoints
1. /api/visitors
2. /museum
3. /ping
4. / => the default page to use the ui

I have stored the data to be fetched in .data/museum/data.csv instead of making the calls directly to the website https://data.lacity.org/Arts-Culture/Museum-Visitors/trxm-jn3c
