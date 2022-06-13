var socket = io();

const audioSection = document.querySelector('#audioSection')
const button = document.querySelector('#fGersButton')
const h2 = document.querySelector('#counter')
button.addEventListener('click', dealWithFGers)


function dealWithFGers() {
    socket.emit('fGerson')
    play()
    let count = Number(h2.innerText)
    count += 1
    h2.innerText = count
}


socket.on('connected', (count) => {
    console.log(count)
    h2.innerText = count
})


socket.on('fGers', () => {
    let count = Number(h2.innerText)
    count += 1
    h2.innerText = count
})


function play() {
    let aud = document.createElement('audio')
    aud.src = "sound/effgerson.mp3"
    audioSection.appendChild(aud)
    aud.play()
    // var audio = document.getElementById("audio");
    // audio.play();
  }