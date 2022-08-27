/* eslint-disable prettier/prettier */
import React from "react"

function ShapeThree({color}) {
  return (
    <svg width="55" height="177" viewBox="0 0 55 177" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M52.5 0.5L1 138.5L5 138.892L24.5 140.804L26.5 141L50.3719 12L52.5 0.5Z" fill={color}/>
        <path d="M54 175.5L52.5 0.5L50.3719 12L52.5 170.5L26.5 141L24.5 140.804L48 169.5L5 138.892L1 138.5L54 175.5Z" fill={color}/>
        <path d="M52.5 0.5L1 138.5M52.5 0.5L54 175.5L1 138.5M52.5 0.5L50.3719 12M1 138.5L5 138.892M26.5 141L50.3719 12M26.5 141L52.5 170.5L50.3719 12M26.5 141L24.5 140.804M24.5 140.804L48 169.5L5 138.892M24.5 140.804L5 138.892" stroke={color}/>
        <circle cx="35" cy="62" r="2" fill="#FFFFFE"/>
        <circle cx="26" cy="90" r="2" fill="#FFFFFE"/>
        <circle cx="17" cy="115" r="2" fill="#FFFFFE"/>
        <circle cx="21" cy="130" r="2" fill="#FFFFFE"/>
    </svg>
  )
}

export default ShapeThree
