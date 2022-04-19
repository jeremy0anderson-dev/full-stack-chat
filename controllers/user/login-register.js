const router = require('express').Router();
const {Users} = require('../../models');
const verify = (req,res,next) =>{
      if (req.session.signedIn){
            res.redirect("/");
      }
      next();
}

router.get('/', (req, res)=>{
      res.render('login', {
            layout:'main',
            stylesheetPath:"/stylesheets/authorize.css",
            scriptPath: "/js/authorize.js"
      })
})

router.post('/register', (req, res)=>{
      Users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
      }) .then(dbUserData => {
                req.session.userData = dbUserData
                req.session.signedIn = true;
                req.session.save();
                res.redirect('/');
          })
          .catch(err => {
                console.log(err);
                res.status(500).json(err);
          });

});

router.post('/login',(req, res)=>{
      Users.findOne({
            where: {
                  username: req.body.username
            }
      }).then(userData =>{
            if (!userData){
                  res.status(404).json({message: "No Users with this id"})
            }
            let validPassword = userData.verifyPassword(req.body.password);
            if (validPassword){
                  req.session.signedIn = true;
                  req.session.userData = userData;
                  req.session.save();
                  res.redirect('/');
            }
      }).catch((err)=>{
            console.log(err);
            res.status(500).json(err);
      })
})
router.post('/logout', (req, res, next)=>{
      req.session.destroy(err=>{
            if (err) throw err;
      });
      res.status(301).redirect('/auth');
})

module.exports = router;