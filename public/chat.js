var socket = io.connect('http://localhost:4000/');

const output = document.querySelector('.output');
const handle = document.querySelector('.handle');
const message = document.querySelector('.message');
const sendBtn = document.querySelector('.send');
const typing = document.querySelector('.typing');

sendBtn.addEventListener('click',()=>{
    socket.emit('chat',{
        handle: handle.value,
        message : message.value
    });
    message.value = "";
});

socket.on('chat',function(data){
    typing.innerHTML = "";
    output.innerHTML += `<p><strong> ${data.handle} :</strong> ${data.message} </p>`;
});

message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value);
});

socket.on('typing',function(data){
    typing.innerHTML = `<p><em> ${data} is typing... </em></p>`
});