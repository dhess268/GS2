var socket = io();


const button = document.querySelector('#fGersButton')
const h2 = document.querySelector('#counter')
button.addEventListener('click', dealWithFGers)


function dealWithFGers() {
    socket.emit('fGerson')

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