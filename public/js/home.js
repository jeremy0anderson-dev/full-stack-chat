const socket = io(`${window.location.origin}/user`,{
    transports: ['websocket', 'polling']
});


socket.on('connect', ()=>{
    console.log(socket.id);

socket.on('user-data', (userData)=>{
    console.log(userData);
})

})