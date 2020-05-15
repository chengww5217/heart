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
      domMemory.innerHTML = '<img class="pic pic1" src="img/01.jpg"><img class="pic pic2" src="img/02.jpg"><img class="pic pic3" src="img/03.jpg"><img class="pic pic4" src="img/04.jpg"><img class="pic pic5" src="img/05.jpg"><img class="pic pic6" src="img/06.jpg">'
      fadeIn(domMemory, 50)
    })
  })
}, 8000)
