//PROJECT URL> https://glitch.com/~alike-spark

const express = require('express');
const app = express();
const html = app.use(express.static('views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const array = [
    {user: 'saul', _id: 1},
    {user: 'pepe', _id: 2},
    {user: 'rita', _id: 3}
];

let data = new Date();

//DONE!!
app.get('/', (req,res) => {
    res.send(html)
});

//DONE!!! I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
app.get('/api/exercise/users', (req,res) => {
    res.send(array)
});

//DONE!! I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
app.post('/api/exercise/new-user', (req,res) => {
    const user = req.body.user;
    const validate = array.find( u => u.user === user)
    if(!validate){
        const users = {
            user: user,
            _id: array.length + 1
        };

        array.push(users);
        res.send(users);
    }

    return res.status(400).send('Sorry that name has been taken: Existing user')
});

//I can add an exercise to any user by posting form data userId(_id), description, duration,and optionally date to /api/exercise/add
app.post('/api/exercise/add', (req,res) => {
     const _id = req.body._id; 
     const desc = req.body.desc;
     const time = req.body.time;
     const date = req.body.date;
         
     const validate = array.find(i => i._id === parseInt(_id));
     if(!validate) return res.status(404).send('<h1>Id is not in our database! Please login first</h1>');
     //else 
     
     if(date === ''){
        const users = {
            user: validate.user,
            description: desc,
            duration: time,
            _id: _id,
            date: data
            }
            
            array.push(users);
            res.send(users)
        }
     //If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.
    else {
     const users = {
     user: validate.user,
     description: desc,
     duration: time,
     _id: _id,
     date: date
        }
     array.push(users);
     res.send(users)
    }
});

/*I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id).
 Return will be the user object with added array log and count (total exercise count). */
app.get('/api/exercise/log/:_id', (req,res) => {
     const search = req.params._id
     const validate = array.find( c => c._id === parseInt(search));
     if(!validate) return res.status(404).send('NO ID EXISTING IN OUR DATABASE');

     const research = array.filter( (element) => element._id === search )
        res.send(research);


});

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`You are listening on port: ${port}  mr Hacker`));