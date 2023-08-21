//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

const frameguard = require("frameguard");

// Don't allow me to be in ANY frames:
app.use(frameguard({ action: "deny" }));

app.get('/*', function(req,res) {



    
res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);