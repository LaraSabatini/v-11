/* eslint-disable prettier/prettier */
import React from "react"

function ShapeFive({color}) {
  return (
    <svg width="286" height="194" viewBox="0 0 286 194" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 3.5L118 191L165.5 124.5L4.5 3.5Z" fill={color}/>
        <path d="M4.5 3.5L163.5 69M4.5 3.5L118 191M4.5 3.5L165.5 124.5M163.5 69H281M163.5 69L165.5 124.5M281 69L118 191M281 69L165.5 124.5M118 191L165.5 124.5" stroke={color} strokeWidth="3"/>
        <circle cx="57" cy="63" r="3" fill="#FFFFFE"/>
        <circle cx="81" cy="82" r="3" fill="#FFFFFE"/>
        <circle cx="87" cy="108" r="3" fill="#FFFFFE"/>
        <circle cx="113" cy="114" r="3" fill="#FFFFFE"/>
        <circle cx="141" cy="125" r="3" fill="#FFFFFE"/>
        <circle cx="120" cy="152" r="3" fill="#FFFFFE"/>
    </svg>
  )
}

export default ShapeFive
