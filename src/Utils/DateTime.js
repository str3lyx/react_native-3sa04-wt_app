import React, { useState, useEffect } from 'react'

const str_dayWeek = [
    "อา.",
    "จ.",
    "อ.",
    "พ.",
    "พฤ.",
    "ศ.",
    "ส.",
]

const str_month = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
]

export function DateTime()
{
    const dayWeek = new Date().getDay()
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const hrs = new Date().getHours()
    const min = new Date().getMinutes()

    var calendar = str_dayWeek[dayWeek] + " " + day + " " + str_month[month-1]
    var clock = (min < 10 ? (hrs + ":0" + min) : (hrs + ":" + min))
    return calendar + ", " + clock
}