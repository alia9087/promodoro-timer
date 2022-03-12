const worktime = document.querySelector('.workinterval');
const breaktime = document.querySelector('.breakinterval');
const startbutton = document.querySelector('.btnstart')
const pausebutton = document.querySelector('.btnpause')
const resumebutton = document.querySelector('.btnresume')
const stopbutton = document.querySelector('.btnstop')
const taskname = document.querySelector('.taskname')
const worktimer = document.querySelector('.worktimer');
const worktimer2 = document.querySelector('.worktimer2');
const alertmessage = document.querySelector('.alertmessage');
const completedList = document.querySelector('.completedList ul ');

let i = 0;
let isworktime;
let isbreaktime;
let ispause;
let wt;
let totalWorkTime;
let bt;
let totalbreakTime;

function refresh() {
    isworktime = true;
    isbreaktime = false;
    ispause = false;
    i = 0;
    wt = worktime.value;
    totalWorkTime = wt * 60;
    totalWorkTime = totalWorkTime - 1;
    bt = breaktime.value;
    totalbreakTime = bt * 60;
    const html = `<h1><span class="minuts">00</span><span>:<span><span class="seconds">00</span></h1>`
    worktimer.innerHTML = html;
}
refresh();
taskname.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.target.value.trim() != "") {
        startbutton.classList.remove('startgrey');
        startbutton.classList.add('startblue')
        alertmessage.classList.add('d-none');
    }
    else {
        startbutton.classList.add('startgrey');
        startbutton.classList.remove('startblue')
    }

})
let worktimefun = () => {
    let newworktime = totalWorkTime;
    let seconds = parseInt((newworktime % 60));
    let minuts = parseInt(newworktime / 60) % 60;
    i++;
    worktimer.classList.remove("yellowcolor");
    worktimer.classList.add("greencolor")


    const html = `<h1><span class="minuts">${minuts}</span>: <span class="seconds">${seconds}</span></h1>`
    worktimer.innerHTML = html;
}
let breaktimefun = () => {
    i++;
    let newbreaktime = totalbreakTime;
    let seconds = parseInt(newbreaktime % 60);
    let minuts = parseInt(newbreaktime / 60) % 60;
    worktimer.classList.remove("greencolor");
    worktimer.classList.add("yellowcolor");
    const html = `<h1><span class="minuts">${minuts}</span>: <span class="seconds">${seconds}</span></h1>`
    worktimer.innerHTML = html;
}
let abc
const a = startbutton.addEventListener('click', () => {

    if (taskname.value === "") {
        alertmessage.classList.remove('d-none');
        return;
    }

    refresh();
    startbutton.classList.add('d-none')
    pausebutton.classList.remove('d-none');
    stopbutton.classList.remove('d-none');
    worktimer.classList.remove('worktimer2');

    abc = setInterval(e => {
        if (!ispause) {
            if (isworktime) {
                worktimefun();
                if (totalWorkTime == 0) {
                    isbreaktime = true;
                    isworktime = false;
                    wt = worktime.value;
                    totalWorkTime = wt * 60;
                }
                else {
                    totalWorkTime--;
                }
            }
            else {
                breaktimefun();
                if (totalbreakTime == 0) {
                    isbreaktime = false;
                    isworktime = true;
                    bt = breaktime.value;
                    totalbreakTime = bt * 60;
                }
                else {
                    totalbreakTime--;
                }
            }
        }
    }, 1000);
})

pausebutton.addEventListener('click', e => {

    ispause = true;
    pausebutton.classList.add('d-none')
    resumebutton.classList.remove('d-none');
})
resumebutton.addEventListener('click', e => {
    ispause = false;
    pausebutton.classList.remove('d-none')
    resumebutton.classList.add('d-none');
})
stopbutton.addEventListener('click', e => {
    e.preventDefault();
    clearInterval(abc)
    displayinlist(i)
    refresh()
    startbutton.classList.remove('d-none')
    pausebutton.classList.add('d-none');
    stopbutton.classList.add('d-none');
    resumebutton.classList.add('d-none');

    worktimer.classList.add('worktimer2');
    taskname.value = "";
    startbutton.classList.add('startgrey');
    startbutton.classList.remove('startblue')
})
function displayinlist(i) {
    const tasknamevalue = taskname.value;
    let newworktime = i;
    let seconds = parseInt(newworktime % 60);
    let minuts = parseInt(newworktime / 60) % 60;
    let hours = parseInt(newworktime / 3600);
    let message = `<li>${tasknamevalue} completed in <br> ${hours} hours : ${minuts} mints : ${seconds} Seconds</li>`;
    completedList.innerHTML += message;
}