class Typing {
  constructor(opts) {
    this.opts = opts || {}
    this.source = opts.source
    this.output = opts.output
    this.delay = opts.delay || 100
    this.chain = {
      parent: null,
      dom: this.output,
      val: []
    }
    if (!(typeof this.opts.done === 'function')) this.opts.done = function () {
    }
  }

  init() {
    this.chain.val = this.convert(this.source, this.chain.val);
  }

  convert(dom, arr) {
    let children = Array.from(dom.childNodes)
    for (let i = 0; i < children.length; i++) {
      let node = children[i]
      if (node.nodeType === 3) {
        arr = arr.concat(node.nodeValue.split(''))
      } else if (node.nodeType === 1) {
        let val = []
        val = this.convert(node, val)
        arr.push({
          'dom': node,
          'val': val
        })
      }
    }
    return arr
  }

  print(dom, val, callback) {
    setTimeout(function () {
      dom.appendChild(document.createTextNode(val))
      let t = document.body.clientHeight;
      window.scroll({top: t, left: 0, behavior: 'smooth'});
      callback()
    }, this.delay)
  }

  play(ele) {
    if (!ele.val.length) {
      if (ele.parent) this.play(ele.parent)
      else this.opts.done()
      return;
    }
    let current = ele.val.shift()
    if (typeof current === 'string') {
      this.print(ele.dom, current, () => this.play(ele))
    } else {
      let dom = current.dom.cloneNode()
      ele.dom.appendChild(dom)
      this.play({
        parent: ele,
        dom,
        val: current.val
      })
    }
  }

  start() {
    this.init()
    this.play(this.chain)
  }
}

function typeLetters(domLetters, clickListener) {
  const colors = ['color-deepskyblue', 'color-darksalmon', 'color-darkturquoise', 'color-deeppink', 'color-yellow']
  const contentArr =
      `我会守护你生命里的精彩，并陪伴你一路精彩下去。
      你的幸福快乐，是我一生的追求。
      我会每一天带着笑脸，和你说早安，
      我会每一晚与你道声晚安再入梦乡，
      我会带你去所有你想去的地方。
      陪你闹看你笑，
      历经你生命中所有的点点滴滴。
      我期待这一生与你一起走过，
      我期待与你慢慢变老，
      等我们老到哪儿也去不了，
      还能满载着一生的幸福快乐！

      我会为我们的未来撑起一片天空，
      为我们的将来担负起一生的责任，
      愿意为你去做每一件能让你开心快乐的事。
      所有我们经历的点点滴滴，
      都是我们一辈子最美的回忆。`
          .split('\n')
  let content = ''
  contentArr.forEach((contentElement, i) => {
    const classColorIndex = i === 0 ? 0 : (i % colors.length)
    content += ('<p class="letters-content ' + colors[classColorIndex] + '">')
    content += contentElement
    content += '</p>'
  })
  const source = document.createElement('div')
  source.innerHTML = content
  const typing = new Typing({
    source, output: domLetters, done() {
      setTimeout(() => {
        const memoryReactivation = document.createElement('div')
        memoryReactivation.innerHTML = '<div class="memory-reactivation">开启回忆</div>'
        this.output.appendChild(memoryReactivation)
        memoryReactivation.style.opacity = '0';
        fadeIn(memoryReactivation)
        let t = document.body.clientHeight;
        window.scroll({top: t, left: 0, behavior: 'smooth'});
        if (clickListener) memoryReactivation.onclick = clickListener
      }, 1500)
    }
  })
  typing.start()
}

function fadeIn(element, speed) {
  speed = speed || 50;
  let num = 0;
  const st = setInterval(() => {
    num++
    element.style.opacity = num / 10 + ''
    if (num >= 10) {
      clearInterval(st)
    }
  }, speed)
}

function fadeOut(element, speed, callback) {
  speed = speed || 50
  let num = 10
  const st = setInterval(() => {
    num--
    element.style.opacity = num / 10 + ''
    if (num <= 0) {
      clearInterval(st)
      element.classList.add('display-none')
      if (callback) callback()
    }
  }, speed)
}

