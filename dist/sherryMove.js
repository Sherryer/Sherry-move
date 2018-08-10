(function(global,factory){
    global.startMove = factory()
})(typeof window != undefined ? window : this,function(){
  function getStyle (obj, name) {
    if (obj.currentStyle) {
      return obj.currentStyle[name]
    } else {
      return getComputedStyle(obj, false)[name]
    }
  }

  function startMove (obj, json, fnEnd) {
    clearInterval(obj.timer)
    if (typeof json.speed === 'undefined') {
      json.speed = 8
    } else if (isNaN(Number(json.speed))) {
      console.warn('.speed must be a number')
    }
    obj.timer = setInterval(function () {
      var bStop = true
      for (var attr in json) {
        if (attr === 'speed') continue
        var cur = 0
        if (attr === 'opacity') {
          cur = Math.round(parseFloat(getStyle(obj, attr)) * 100)
        } else {
          cur = parseInt(getStyle(obj, attr))
        }
        var speed = (json[attr] - cur) / Math.max(Math.abs(json.speed), 4)
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
        if (cur !== json[attr]) {
          bStop = false
        }

        if (attr === 'opacity') {
          obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'
          obj.style.opacity = (cur + speed) / 100
        } else {
          obj.style[attr] = cur + speed + 'px'
        }
      }

      if (bStop) {
        clearInterval(obj.timer)
        if (fnEnd)fnEnd()
      }
    }, 16.7)
  }

  export default startMove


  return startMove
})