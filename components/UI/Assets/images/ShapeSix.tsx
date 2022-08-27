/* eslint-disable prettier/prettier */
import React from "react"

function ShapeFive({color}) {
  return (
    <svg width="136" height="253" viewBox="0 0 136 253" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 175L61.5 249.5L63.254 243.5L38 187.5L127.153 10.5L2 175ZM34.5 189L54.5 238.5L7 177L34.5 189Z" fill={color}/>
        <path d="M127.153 10.5L134 1.5L63.254 243.5M127.153 10.5L2 175L61.5 249.5L63.254 243.5M127.153 10.5L38 187.5L63.254 243.5M54.5 238.5L34.5 189L7 177L54.5 238.5Z" stroke={color} strokeWidth="3"/>
        <circle cx="83" cy="82" r="3" fill="#FFFFFE"/>
        <circle cx="58" cy="120" r="3" fill="#FFFFFE"/>
        <circle cx="33" cy="149" r="3" fill="#FFFFFE"/>
        <circle cx="34" cy="172" r="3" fill="#FFFFFE"/>
    </svg>
  )
}

export default ShapeFive
