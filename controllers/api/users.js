const router = require('express').Router();
const {Users, Blog, Posts}  = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    Users.findAll({
    }).then(userData =>{
        if (!userData){
            res.status(404).json({message: "No Users with this id"})
        }
        res.json(userData)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    // find one User by its `id` value
    // be sure to include its associated Products
    Users.findOne({
        where: {
            id: req.params.id
        }
    }).then(userData =>{
        if (!userData){
            res.status(404).json({message: "No Users with this id"})
        }
        res.json(userData)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }) .then(dbUserData => {
        req.session.userData = dbUserData
        res.status(201).redirect('/');
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a Users by its `id` value
    Users.update(req.body,{
        where: {
            id: req.params.id,
        },
    })
        .then((userData) => {
            if (!userData[0]) {
                res.status(404).json({ message: 'No Users found with this id' });
                return;
            }
            res.json(userData[0]);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    // delete a Users by its `id` value
    Users.destroy({
        where:{
            id: req.params.id
        }
    }).then(userData =>{
        if (!userData){
            res.status(404).json({message: "No Users with this id"})
        }
        res.json(userData)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
});
// done
module.exports = router;