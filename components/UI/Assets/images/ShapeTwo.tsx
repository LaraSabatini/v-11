/* eslint-disable prettier/prettier */
import React from "react"

function ShapeTwo({color}) {
  return (
    <svg width="56" height="178" viewBox="0 0 56 178" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.5 1.5L54.5 38L3.5 177L1.5 1.5ZM3.5 7L5.5 167.5L29.5 37.5L3.5 7ZM50.5 38L8 8.5L31.5 36.5L50.5 38Z" fill={color} stroke={color}/>
        <circle cx="39" cy="62" r="2" fill="#FFFFFE"/>
        <circle cx="35" cy="47" r="2" fill="#FFFFFE"/>
        <circle cx="29" cy="84" r="2" fill="#FFFFFE"/>
        <circle cx="20" cy="114" r="2" fill="#FFFFFE"/>
    </svg>
  )
}

export default ShapeTwo
