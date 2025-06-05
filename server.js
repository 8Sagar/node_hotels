        const express = require('express');
        const app = express();
        const db = require('./db');

        const bodyParser = require('body-parser');
        app.use(bodyParser.json());

        
        const port = 3000;
        
        app.get('/', (req, res) => {
          res.send('Welcome to my hotel');
        });
       
          
              // Import the router files
              const personRoutes = require('./routes/personRoutes');
              const menuItemRoutes = require('./routes/menuItemRoutes');
              //Use the routers
              app.use('/person',personRoutes);
              app.use('/menu',menuItemRoutes);
           
        app.listen(port, () => {
          console.log(`Server listening on port ${port}`);
        });