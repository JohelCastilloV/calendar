'use strict'

$('#formCalendar').submit(function( event ) {
    event.preventDefault();
    $('#calendar').html('')
    const dateParts=$('#startDate').val().split('-')
    debugger
    renderCalendar(new Date(dateParts[0],parseInt(dateParts[1])-1,dateParts[2]),parseInt($('#numberDays').val()),'US')
  });
function renderCalendar(startDate,numberDays,countryCode) {
    const days=startDate.getDate()
    const month=startDate.getMonth()
    const endDate=new Date(startDate.getTime())
    endDate.setDate(days+numberDays)
    let calendar=document.getElementById('calendar')
    let buffer = ''
    let week=1
    let months=1
    let currentDate=new Date(startDate.getTime())
    let printMonth=true
    let maxDaysOfMonth
    for(let i=currentDate.getDate();currentDate.getTime()<endDate.getTime();i++){
        if(printMonth==true){
            maxDaysOfMonth=getDaysOfMonth(currentDate)
            renderHeader(currentDate,months)
            printMonth=false
            let dayRemaining=currentDate.getDay()
            $('#'+months).append(`<tr id='tr${week}${months}'/>`)
            while(dayRemaining>0){
                renderInvalidDate(currentDate,$('#tr'+week+months))
                dayRemaining--
            }
        }
        if(currentDate.getDay()==0){
            $('#'+months).append(`<tr id='tr${week}${months}'/>`)
        }
        console.log(`${i} `)
        
        renderDate(currentDate,$('#tr'+week+months))
        
        //Salto de semana
        if(currentDate.getDay()==6){
            console.log('\n')
            week++
        }

        if(currentDate.getDate()==maxDaysOfMonth){
            printMonth=true
            let nextDay=currentDate.getDay()+1
            while(nextDay<7){
                renderInvalidDate(currentDate,$('#tr'+week+months))  
                nextDay++
            }
            months++  

        }
        currentDate.setDate(currentDate.getDate()+1)
        if(currentDate.getTime()>=endDate.getTime()){
            let nextDay=currentDate.getDay()
            while(nextDay<7){
                renderInvalidDate(currentDate,$('#tr'+week+months))  
                nextDay++
            }
        }
        
    }
}
function renderHeader(date,indx){

    let table= `<table id='${indx}'>
                    <caption>${date.toLocaleString('en', { month: "long" })} ${date.getFullYear()}</caption>
                    <thead>
                    <tr>
                    <th>S</th>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>T</th>
                    <th>F</th>
                    <th>S</th>
                    </tr>
                    </thead>
                </table>`
    $('#calendar').append(table)

}
function renderDate(currentDate,container){
     const color= getClassDay(currentDate)    
     container.append(`<td class='${color} Day'>${currentDate.getDate()}</td>`)
}
function renderInvalidDate(currentDate,container){
    const color= 'Gray'    
    container.append(`<td class='${color}'></td>`)
}
function getClassDay(date,firstDate){
    let color
    if(date.getDay()==0||date.getDay()==6)
        color= 'Yellow'
    else if(isHolliday(date))
            color='Red'
        else color= 'Green'
    return color    

    }

function getDaysOfMonth(date){
    let lastDate = new Date(date.getFullYear(),date.getMonth()+1,0)
    return lastDate.getDate()
}
function firstDayOfWeek(date){
    return date.getDate()-date.getDay()
}
function firstDateOfWeek(date){
    const firstDate=new Date(date.getTime())
    firstDate.setDate(firstDate.getDate()-firstDate.getDay())
    return firstDate;
}
function getWeeks(date){
    date=getDaysOfMonth()
}
function getWeeks(date) {
    const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const days = firstOfMonth.getDay() + getDaysOfMonth(date)
    return Math.ceil( days / 7);
}
function getWeek(date){
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return Math.ceil((date.getDate() + firstDay)/7);
}


function render(){
    let buffer = ''

    buffer += '<div></div>'
    
}
function isHolliday(date){
    return false
}