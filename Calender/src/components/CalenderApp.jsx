import { useState } from "react"
import "./CalenderApp.css"


function CalenderApp(){

    const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    const currentDate=new Date()
    const [currentMonth, setCurrentMonth]=useState(currentDate.getMonth())
    const [currentYear, setCurrentYear]=useState(currentDate.getFullYear())
    const daysInMonth=new Date(currentYear, currentMonth+1 , 0).getDate();
    const firstDayOfMonth=new Date(currentYear,currentMonth, 1).getDay();
    const [selectedDate,setSelectedDate]=useState(currentDate)
    const [showEventPopup, setShowEventPopup]=useState(false)
    const [events,setEvents]=useState([]);
    const [eventTime,setEventTime]=useState({hours:"00", minutes:"00"})
    const [eventText,setEventText]=useState("");
    console.log(currentDate,currentMonth,currentYear,daysInMonth,firstDayOfMonth)

    const prevMonth=()=>{
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? (11):(prevMonth-1)))
        setCurrentYear((prevYear) => (currentMonth === 0 ? (prevYear-1):(prevYear)))
    }

    const nextMonth=()=>{
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? (0):(prevMonth+1)))
        setCurrentYear((prevYear) => (currentMonth === 11 ? (prevYear+1):(prevYear)))
    }

    const handleDayClick= (day)=>{
        const clickedDate=new Date(currentYear, currentMonth, day)
        const today=new Date()

        if(clickedDate >=today || isSameDay(clickedDate,today)){
            setSelectedDate(clickedDate)
            setShowEventPopup(true)
            setEventTime({hours:"00", minutes:"00"})
            setEventText("")
        }
    }

    const isSameDay=(date1, date2)=>{
        return (
            date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
        )
    }

    const handleEventSubmit=()=>{
        const newEvents={
            date:selectedDate,
            time:`${eventTime.hours.padStart(2,'0')}:${eventTime.minutes.padStart(2,'0')}`,
            text:eventText
        }
        setEvents([...events,newEvents])
        setEventTime({hours:"00", minutes:"00"})
        setEventText("")
        setShowEventPopup(false)
    }

    return (
        <div className="calendar-app">
            <div className="calendar">
                <h1 className="heading">Calendar</h1>
                <div className="navigate-date">
                    <h2 className="month">{months[currentMonth]},</h2>
                    <h2 className="year">{currentYear}</h2>
                    <div className="buttons">
                        <i className="bx bx-chevron-left" onClick={prevMonth}></i>
                        <i className="bx bx-chevron-right" onClick={nextMonth}></i>
                    </div>
                </div>
                <div className="weekdays">
                    {
                        days.map((day,index)=> <span key={index}>{day}</span>)
                    }
                </div>
                <div className="days">
                    {
                        [...Array(firstDayOfMonth).keys()].map((_,index)=> <span key={`empty-${index} `}/>)
                    }
                    {
                        [...Array(daysInMonth).keys()].map((day)=> <span key={day+1} className={day+1 === currentDate.getDate() && currentMonth===currentDate.getMonth() && currentYear===currentDate.getFullYear() ? "current-day" : "" } onClick={()=>handleDayClick(day+1)}>{day+1}</span>)
                    }
                </div>
            </div>
            <div className="events">
                {
                    showEventPopup && <div className="event-popup">
                                        <div className="time-input">
                                            <div className="event-popup-time">Time</div>
                                            <input type="number" name="hours" min={0} max={24} className="hours bg-white" value={eventTime.hours} onChange={(e)=>setEventTime({...eventTime, hours:e.target.value})}/>
                                            <input type="number" name="minutes" min={0} max={60} className="minutes bg-white" value={eventTime.minutes} onChange={(e)=>setEventTime({...eventTime, minutes:e.target.value})}/>
                                        </div>
                                        <textarea placeholder="Enter Event Text (Maximum 60 Characters)" className="bg-white" value={eventText}></textarea>
                                        <button className="event-popup-btn bg-white">Add Event</button>
                                        <button className="close-event-popup" onClick={()=>setShowEventPopup(false)}>
                                            <i className="bx bx-x bg-white"></i>
                                        </button>
                                    </div>
                }
                <div className="event">
                    <div className="event-date-wrapper">
                        <div className="event-date">May 15, 2024</div>
                        <div className="event-time">10:00</div>
                    </div>
                    <div className="event-text">Meeting with John</div>
                    <div className="event-buttons">
                        <i className="bx bxs-edit-alt"></i>
                        <i class='bx  bx-message-plus'  ></i> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalenderApp;