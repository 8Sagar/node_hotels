        const express = require('express');
        const app = express();
        const db = require('./db');
        require('dotenv').config();

          const  passport = require('./auth');

        //const Person = require('./models/Person');
        const bodyParser = require('body-parser'); 
        app.use(bodyParser.json());

        
        const port = process.env.PORT||3000;

       
        app.use(passport.initialize());

        const localAuthMiddleware = passport.authenticate('local',{session:false});
 
        // Middleware Function

        const logRequest = (req,res,next)=>{
          console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
          next(); //Move to the next phase
        }
        
        app.use(logRequest);

       
        app.get('/',function (req, res){
          res.send('Welcome to my hotel');
        });
       
          
              // Import the router files
              const personRoutes = require('./routes/personRoutes');
              const menuItemRoutes = require('./routes/menuItemRoutes');
              const Person = require('./models/person');
              
              
              //Use the routers
              app.use('/person',personRoutes);
              app.use('/menu',menuItemRoutes);
           
        app.listen(port, () => {
          console.log(`Server listening on port ${port}`);
        });