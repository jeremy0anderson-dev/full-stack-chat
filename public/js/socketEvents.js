let socket = io(`${window.location.origin}/user`, {
      transports: ['websocket']
});

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');

form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
      }
});
socket.once('connect', ()=>{
      console.log(socket.id);
      
socket.on('chat message', function(msg) {
      let item = document.createElement('li');
      item.textContent = msg;
      
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
});
});