var socket = io();

const audioSection = document.querySelector('#audioSection')
const button = document.querySelector('#fGersButton')
const h2 = document.querySelector('#counter')
button.addEventListener('click', dealWithFGers)
const loveButton = document.querySelector('#loveGersButton')
loveButton.addEventListener('click', dealWithLGers)
const but = document.querySelector('.btn')

// but.addEventListener('focusin', (event) => {
//     event.target.blur()
//   });


function dealWithFGers() {
    socket.emit('fGerson')
    play("sound/effgerson.mp3")
    let count = Number(h2.innerText)
    count += 1
    h2.innerText = count
    event.target.blur()
}

function dealWithLGers(event) {
    socket.emit('lGerson')
    play("sound/luvger.mp3")
    let count = Number(h2.innerText)
    count -= 1
    h2.innerText = count
    event.target.blur()
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


function play(path) {
    let aud = document.createElement('audio')
    aud.src = path
    audioSection.appendChild(aud)
    aud.play()
    // var audio = document.getElementById("audio");
    // audio.play();
  }
