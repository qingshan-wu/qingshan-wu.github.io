/*
 * @Author: qingshan
 * @Date: 2021-01-25 19:14:07
 */
;(function () {


  let clock = document.getElementById('clock'),
    ctx = clock.getContext('2d'),
    cWidth = ctx.canvas.width,
    cHeight = ctx.canvas.height,
    hours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
    t = null;

  console.log(ctx)

  // function drawRotateLine(t, factor, color = "#000", addminutes) {
  //   var radius, mRadius = 0;
  //   if (addminutes == undefined) {
  //     radius = 2 * Math.PI / 60 * t
  //   } else { //即调用该函数的是drawHour
  //     radius = 2 * Math.PI / 12 * t
  //     mRadius = 2 * Math.PI / 12 / 60 * addminutes
  //   }

  //   ctx.save() //绘制前保存
  //   ctx.beginPath()
  //   ctx.strokeStyle = color
  //   ctx.lineWidth = 5
  //   ctx.lineCap = 'round'
  //   ctx.rotate(radius + mRadius)
  //   ctx.moveTo(0, 0)
  //   ctx.lineTo(0, -this.r / factor)
  //   ctx.stroke()
  //   ctx.restore() //绘制后重新加载原状态
  // }





  class Clock {
    constructor() {
      this.r = cWidth / 2
    }
    init() {
      this.draw()
      t = setInterval(this.draw.bind(this), 1000)
    }

    draw() {
      ctx.clearRect(0, 0, cWidth, cHeight)
      var { hours, minutes, seconds } = getTime()
      console.log(hours, minutes, seconds)
      ctx.save()
      this.drawPanel()
      this.drawHourNums()

      this.drawHourIndicator(hours, minutes)
      this.drawMinuteIndicator(minutes)
      this.drawSecondIndicator(seconds)
      this.drawCentralPointer()
      ctx.restore()

    }

    drawPanel() {
      ctx.beginPath();
      ctx.translate(this.r, this.r)
      ctx.fillStyle = '#fff'
      ctx.arc(0, 0, this.r - 25, 0, 2 * Math.PI, false)
      ctx.fill()
    }

    drawHourNums() {
      var radius,
        x,
        y;


      ctx.font = "40px sans-serif"
      ctx.fillStyle = '#000'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      hours.forEach((it, index) => {
        radius = 2 * Math.PI / 12 * index
        x = (this.r - 60) * Math.cos(radius)
        y = (this.r - 60) * Math.sin(radius)
        ctx.beginPath()
        ctx.fillText(it, x, y)
      })

    }

    drawCentralPointer() {
      ctx.beginPath();
      ctx.fillStyle = '#333'
      ctx.arc(0, 0, 13, 0, 2 * Math.PI, false)
      ctx.fill()

      ctx.beginPath();
      ctx.fillStyle = '#666'
      ctx.arc(0, 0, 6, 0, 2 * Math.PI, false)
      ctx.fill()
    }

    drawHourIndicator(hours, minutes) {
      var radius = 2 * Math.PI / 12 * hours,
        mRadius = 2 * Math.PI / 12 / 60 * minutes

      ctx.save()
      ctx.beginPath();
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.rotate(radius + mRadius)
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -this.r / 1.8)
      ctx.stroke()
      ctx.restore()
    }

    drawMinuteIndicator(minutes) {
      var radius = 2 * Math.PI / 60 * minutes

      ctx.save()
      ctx.beginPath();
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.rotate(radius)
      ctx.moveTo(0, 0) //起点坐标
      ctx.lineTo(0, -this.r / 1.5) //终点坐标
      ctx.stroke()
      ctx.restore()
    }

    drawSecondIndicator(seconds) {
      var radius = 2 * Math.PI / 60 * seconds

      ctx.save() //绘制前保存
      ctx.beginPath();
      ctx.strokeStyle = 'orange'
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.rotate(radius)
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -this.r / 1.2)
      ctx.stroke()
      ctx.restore()
    }


  }

  function getTime() {
    var d = new Date()
    return {
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds()
    }
  }


  window.Clock = Clock;
})();