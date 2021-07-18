# 3SA04: React Native
นายสุทธิรัก มัธยวีรเกียรติ 6210110383 Section 01

## [Commit #1 location searching](https://github.com/suttirak-mattaya/react_native-3sa04-wt_app/commit/e5014f13b6b01b1dae94a6e5ac01fc0852e0b7b0)
- เปลี่ยนแปลง โฟลเดอร์ Components -> src
- เพิ่มไฟล์ `Location.json` เก็บข้อมูลzipcode
- เพิ่มระบบค้นหาตำแหน่งข้อมูล โดยเพิ่ม `TextInput` ในหน้า Home โดยจะมีการ filter ข้อมูลตามชื่อจังหวัดเมื่อพิมพ์ และเมื่อ `focus` จะแสดงข้อมูลทั้งหมด แต่เมื่อ `blur` จะแสดงข้อมูลที่ save ไว้
- แต่ยังจัด `position` เป็น `fixed` อยู่ (ไม่รองรับ)

## [Commit #2 tweak weather page](https://github.com/suttirak-mattaya/react_native-3sa04-wt_app/commit/567e5eba36844c4b7065b6bc7660d6d5739140ea)
- จัดตำแหน่งการวางข้อความใหม่ในหน้า Weather ใหม่
- เพิ่มอุณหภูมิที่รู้สึก ,เวลา และ icon สภาพอากาศจาก openweather
- เพิ่ม `DateTime.js` ไว้แปลงเดือน(1-12) และวันในสัปดาห์(0-6) เป็นข้อความภาษาไทย

## [Commit #3 tweak zipcodescreen](https://github.com/suttirak-mattaya/react_native-3sa04-wt_app/commit/a88c5e23c940ae6c868708cab309b913b97cc717)
- เปลี่ยนแหล่งข้อมูล Location ไปใช้ข้อมูลจาก [link นี้](https://raw.githubusercontent.com/rathpanyowat/Thai-zip-code-latitude-and-longitude/master/data.json)
- ลบระบบ `onFocus` `onBlur`
- เปลี่ยนระบบการ search ใหม่ ให้ search ได้ทั้ง ตำบล จังหวัด รหัสไปรษณีย์ ในภาษาไทย
- เปลียนการแสดงผลเป็น `ตำบล, จังหวัด` ในภาษาไทย
- เปลี่ยนระบบ `ZipCodeScreen` เป็น `class`
- มีปัญหากดปุ่มไม่ติดใน android

## [Commit #4 tweak weather screen by adding information](https://github.com/suttirak-mattaya/react_native-3sa04-wt_app/commit/f90ed8eb027451cf0a213ae9b6ca209ef2a9f694)
- เพิ่มข้อมูลในหน้า Weather ให้แสดง ความเร็ว, ทิศทางลม ความชื้น และความดันบรรยากาศ
- พื้นหลังหน้า Weather เปลี่ยนเป็น 4 ช่วง เช้า, กลางวัน, เย็น, กลางคืน

## [Commit #5 fix untouchable zipcodescreen issue on android](https://github.com/suttirak-mattaya/react_native-3sa04-wt_app/commit/8fb6777897e9c58fa64a477836cb8bea6896019b)
- เปลี่ยนระบบในหน้า `ZipCodeScreen` กลับมาเป็น `function`
- กลับมาใช้ `location.json` โดยdownloadข้อมูลจาก [link นี้](https://raw.githubusercontent.com/rathpanyowat/Thai-zip-code-latitude-and-longitude/master/data.json) มา filter เอาแค่บางตำบล
- ปรับ UI ในหน้า Weather ให้สามารถดูข้อมูลได้ใน android
- แก้ปัญหากดปุ่มไม่ติดใน android
