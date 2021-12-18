import React, { useEffect } from 'react'
import './style.css'

const LineCompo = (props) => {debugger
    const { start, end, posx, posy  } = props

    const ax = document.getElementById(start).clientTop;
    const ay = document.getElementById(start).clientLeft;

    const bx = document.getElementById(end).clientTop;
    const by = document.getElementById(end).clientLeft;

    return (
      <svg style={{position:'absolute', top:posy, left:posx}}>
        <path
          className="line"
          // d={`M ${position.sX}, ${position.sy} L ${position.lx}, ${position.sy} `}
          fill="none"
          d={`M${ax},${ay} 
           h${bx/2} 
           v${by} 
           h${bx/2}`}
        />
      </svg>
    )
}

export default LineCompo
