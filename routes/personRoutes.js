const express = require('express');
const router = express.Router();

const Person = require('./../models/person');

const {jwtAuthMiddleware,generateToken} = require('./../jwt');

           
       //post route to add a person    
  router.post('/signup',async(req,res) =>{
          try{
            const data = req.body //Assuming the request body conatains the person data

            //Create the new person to the database
            const newPerson = new Person(data);

            // Save the new person to the database
            const response = await newPerson.save();
            console.log('data saved');
             
            const payload = {
              id: response.id,
              username: response.username
            };
            console.log(JSON.stringify(payload));

            const token = generateToken(payload);
            console.log("token is : ",token);

            res.status(200).json({response: response, token: token});

          }catch(err){
            console.log(err);
            res.status(500).json({
              error:'Internal Server Error'
            });

          }
        })
          //Login Route
          router.post('/login',async(req,res)=>{
            try{
              //Extract username and password from request body
              const {username,password}=req.body;

              //Find the user by username
              const user = await Person.findOne({username: username});
              //If user does not exixt or password does not match,return error
              if(!user || !(await user.comparePassword(password))){
                return res.status(401).json({error :'Invalid username or password'});
              }
              //generate token
              const payload = {
                id : user.id,
                username : user.username
              }
              const token = generateToken(payload);
              // return token as response
              res.json({token});
            }catch(err){
              console.error(err);
              res.status(500).json({error:'Internal server error'});
            }
          })

          //Profile route 
           router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
            try{
              const userData = req.user;
              console.log("User Data : ",userData);

              const userId = userData.id;
              const user = await Person.findById(userId);

              res.status(200).json({user});
            }catch(err){
              console.error(err);
              res.status(500).json({error:'Internal server Error'});

            }
           })

        // GET method to get the person
        router.get('/',jwtAuthMiddleware,async(req,res)=>{
          try{
            const data = await Person.find();
            console.log('data fetched');
            res.status(200).json(data);
          }catch(err){
            console.log(err);
             res.status(500).json({error:'Internal Server Error'});
          }
        })
           //Parameterised API call
           router.get('/person/:workType',async(req,res)=>{
            try{
              const workType = req.params.workType; // Extract the work typr from the URL parameter
              if(workType=='chef'||workType=='manager'||workType=='waiter'){
                const response = await Person.find({work:workType});
                console.log('response fetched');
                res.status(200).json(response);
              }else{
                res.status(404).json({error:'Invalid work Type'});
              }
            }catch(err){
              console.log(err);
              res.status(500).json({
                error:'Internal Server Error'
              });
            }
           })




           router.put('/:id',async(req,res)=>{
            try{
                const personId = req.params.id;//extract the id from the URL parameter
                const updatedPersonData = req.body;//Updated data for the person

                const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
                    new:true,//Return the Updated document
                    runValidators: true,//Run Mongoose validation
                })
                if(!response){
                    return res.status(404).json({error:'Person not found'});
                }

                console.log('data updated');
                res.status(200).json(response);
            }catch(err){
                console.log(err);
                res.status(500).json({error:'Internal Server Error'}); 
                
            }
           })


           // Route for deletion operation
           router.delete('/:id',async(req,res)=>{
            try{
                const personId = req.params.id;
                //Assuming you have a person Model
                const response = await Person.findByIdAndDelete(personId);
                if(!response){
                    return res.status(404).json({error:'Person not found'});
                }
                console.log('data deleted');
                res.status(200).json({message:'Person Deleted successfully'});

            }catch(err){
                console.log(err);
                res.status(500).json({error:'Internal Server Error'});
            }
           })

           module.exports = router;   