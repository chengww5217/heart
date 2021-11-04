const results = getQueryVariable('name', 'bless')
if (results[0]) {
  const domName = document.getElementById('name')
  domName.innerHTML = decodeURI(results[0])
}
if (results[1]) {
  const domBless = document.getElementById('bless')
  domBless.innerHTML = decodeURI(results[1])
}

function getQueryVariable(...variables) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  const map = new Map()
  vars.forEach(varValue => {
    const pair = varValue.split('=')
    if (pair[0]) {
      map.set(pair[0], pair[1])
    }
  })
  const results = []
  variables.forEach(variable => results.push(map.get(variable)))
  return results
}

// Background audio controller
const audioSwitch = document.getElementById('audio-switch')
const audio = document.getElementById('audio');
let isPlaying = false
audioSwitch.onclick = () => {
  isPlaying = !isPlaying
  backgroundAudioSwitch(audio, isPlaying)
  audioSwitch.src = isPlaying ? './img/audio_on.svg' : './img/audio_off.svg'
}

function backgroundAudioSwitch(audio, needPlay) {
  if (needPlay) {
    audio.play()
  } else {
    audio.pause()
  }
}

const classDisplayNone = 'display-none'
const baseUrl = 'https://mobile.sh1a.qingstor.com/file/heart'
setTimeout(() => {
  const domHeartLoading = document.getElementById('heart-loading')
  domHeartLoading.classList.add(classDisplayNone)
  const domLetters = document.getElementById('letters')
  domLetters.classList.remove(classDisplayNone)
  document.body.style.backgroundColor = '#787878'
  typeLetters(domLetters, () => {
    document.body.style.backgroundColor = '#eeeeee'
    fadeOut(domLetters, 50, () => {
      // Memory open
      const domMemory = document.getElementById('memory')
      domMemory.classList.remove(classDisplayNone)
      domMemory.style.opacity = '0'
      domMemory.innerHTML = `
      <img class="pic pic1" src="${baseUrl}/01.jpg" alt="pic1">
      <img class="pic pic2" src="${baseUrl}/02.jpg" alt="pic2">
      <img class="pic pic3" src="${baseUrl}/03.jpg" alt="pic3">
      <img class="pic pic4" src="${baseUrl}/04.jpg" alt="pic4">
      <img class="pic pic5" src="${baseUrl}/05.jpg" alt="pic5">
      <img class="pic pic6" src="${baseUrl}/06.jpg" alt="pic6">
`
      fadeIn(domMemory, 50)
    })
  })
}, 8000)
