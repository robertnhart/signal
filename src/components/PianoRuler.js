import React, { PropTypes } from "react"
import Theme from "../model/Theme"
import DrawCanvas from "./DrawCanvas"
import withTheme from "../hocs/withTheme"
import pureRender from "../hocs/pureRender"

const theme = Theme.fromCSS()

/**

    // FIXME
    this.grid.ruler.on("click", e => {
      const tick = this._transform.getTicks(e.localX)
      this.emitter.trigger("move-cursor", tick)
    })
    */

function drawRuler(ctx, height, pixelsPerTick, endTick, ticksPerBeat, theme) {
  ctx.beginPath()
  ctx.strokeStyle = theme.secondaryTextColor
  ctx.lineWidth = 1

  for (let beats = 0; beats < endTick / ticksPerBeat; beats++) {
    const x = beats * ticksPerBeat * pixelsPerTick
    const isTop = beats % 4 == 0

    if (isTop) {
      ctx.moveTo(x, height / 2)
      ctx.lineTo(x, height)
    } else {
      ctx.moveTo(x, height * 0.8)
      ctx.lineTo(x, height)
    }

    if (isTop) {
      const measure = beats / 4
      ctx.textBaseline = "top"
      ctx.font = `12px ${theme.canvasFont}`
      ctx.fillStyle = theme.secondaryTextColor
      ctx.fillText(measure, x + 5, 2)
    }
  }

  ctx.closePath()
  ctx.stroke()
}

function PianoRuler(props) {
  function draw(ctx) {
    const { width, height } = ctx.canvas
    ctx.clearRect(0, 0, width, height)
    drawRuler(ctx, props.height, props.pixelsPerTick, props.endTick, props.ticksPerBeat, props.theme)
  }

  return <DrawCanvas
    draw={draw}
    className="PianoRuler"
    width={props.pixelsPerTick * props.endTick}
    height={props.height}
  />
}

PianoRuler.propTypes = {
  pixelsPerTick: PropTypes.number.isRequired,
  ticksPerBeat: PropTypes.number.isRequired,
  endTick: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default pureRender(withTheme(PianoRuler))
