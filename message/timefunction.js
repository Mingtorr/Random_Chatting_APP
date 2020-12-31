

function settime() {
    let today = new Date();
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();
    if(hours==12){
      
      const stringtime = "오후 "+JSON.stringify(hours)+":"+JSON.stringify(minutes)
      return stringtime;
    }else if(hours>12){
      hours = hours - 12;
      const stringtime = "오후 "+JSON.stringify(hours)+":"+JSON.stringify(minutes)
      return stringtime;
    }else if(hours<12){
      const stringtime = "오전 "+JSON.stringify(hours)+":"+JSON.stringify(minutes)
      return stringtime;
    }
  }
  function settime2(t) {
    let today = new Date(t);
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();
    if(minutes<10){
        if(hours==12){
            const stringtime = "오후 "+JSON.stringify(hours)+":0"+JSON.stringify(minutes)
            return stringtime;
          }else if(hours>12){
            hours = hours - 12;
            const stringtime = "오후 "+JSON.stringify(hours)+":0"+JSON.stringify(minutes)
            return stringtime;
          }else if(hours<12){
            const stringtime = "오전 "+JSON.stringify(hours)+":0"+JSON.stringify(minutes)
            return stringtime;
          }
    }
    else{
        if(hours==12){
            const stringtime = "오후 "+JSON.stringify(hours)+":"+JSON.stringify(minutes)
            return stringtime;
          }else if(hours>12){
            hours = hours - 12;
            const stringtime = "오후 "+JSON.stringify(hours)+":"+JSON.stringify(minutes)
            return stringtime;
          }else if(hours<12){
            const stringtime = "오전 "+JSON.stringify(hours)+":"+JSON.stringify(minutes)
            return stringtime;
          }
    }
    
  }
  module.exports = {
    settime,settime2
  };
  