const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', (e) => {
      if(e.target.matches('.signIn-action')){
            container.classList.toggle("right-panel-active");
      }
});

signInButton.addEventListener('click', (e) => {
      if(e.target.matches('.signIn-action')) {
            container.classList.toggle("right-panel-active");
      }
});
// let firstName = $('#first_name');
// let lastName = $('#last_name');
// let registerUsername = $('#rUser-name');
// let rEmail = $('#rEmail');
// let rPassword = $('#rPassword');
// $('#register-form').submit(async(e)=>{
//       let url = await fetch('/register', {
//             method: "post",
//             body: {
//                   "first_name": `${firstName.value}`,
//                   "last_name": lastName.value,
//                   "username": registerUsername.value,
//                   "email": rEmail.value,
//                   "password": rPassword.value
//             }
//       });
//       let res = await url.json();
//       console.log(res);
// })
//
// $('#login-form').submit(async(e)=>{
//       e.preventDefault();
//       let url = fetch('/login', {
//             method: "post",
//             body: {
//                   username: $('#lUser-name').value,
//                   password: $('#lPassword').value
//             }
//       }).then(res =>{
//             let r = res.json();
//             console.log(r);
//       })
// })


//
// const socket = io(`${window.location.origin}/`)
//
// socket.on('connect', ()=>{
//       console.log(socket);
//
// })