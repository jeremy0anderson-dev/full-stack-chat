const router = require('express').Router();
// const verify = (req, res, next) =>{
//       if (req.session.signedIn !== true) {
//             router. .redirect('/auth');
//       }
//       next();
//
// }
let users = [];
router.get('/',(req, res)=>{
      const io = req.app.get('io');
      if (req.session.signedIn) {
            io.of('/user').once('connection', (socket) => {
                  socket.join('chat');
                  socket.leave(socket.id);
            
                  socket.request.session.userData = req.session.userData
                  socket.username = req.session.userData.username;
            
            
                  io.of('/user').to('chat').emit('chat message', `${socket.username} joined`)
                  socket.on('chat message', msg => {
                        io.of('user').to('chat').emit('chat message', `${socket.username}: ${msg}`);
                  });
            
                  socket.on('disconnect', (reason) => {
                        io.of('/user').emit('chat message', `${socket.username} left`)
                        io.of('/user').removeAllListeners('chat message');
                  })
            })
            res.render('chat', {
                  layout: 'main',
                  stylesheetPath: '/stylesheets/chat.css',
                  scriptPath: '/js/socketEvents.js',
                  bulma: "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css"
            })
      } else {
            res.redirect('/auth');
      }
})


module.exports = router;