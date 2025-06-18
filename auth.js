//SET up Passport with a Local Authentication strategy, using person model for usernam and password

        const  passport = require('passport');
        const LocalStrategy = require('passport-local').Strategy;
       const Person = require('./models/person');//Adjust the path as needed
       
       //Authentication code
       passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
          //Your authentication logic here
          try{
             //console.log('Received credentials:',USERNAME,password);
             const user = await Person.findOne({username:USERNAME});
             if(!user){ 
                return done(null,false,{message:'Incorrect UserName'});
             }

             const isPasswordMatch = await user.comparePassword(password);
             if(isPasswordMatch){
              return done(null,user);
             }else{      
              return done(null,false,{message:'Incorrect Password. '});
             }

        

          }catch(err){
            return done(err);

          }
        }))
        // app.use(passport.initialize());
        
        module.exports = passport; //Export configured passport