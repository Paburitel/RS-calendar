import Immutable from 'immutable';
window.Immutable = Immutable;

const initialState = createCalendare();

// console.log('[INIT]', initialState);

export default function calendarReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CALENDAR': {
            const date = action.payload;
            const calendar = Immutable.Map(getCalendar(date.month, date.year));
            console.log('[SET_CALENDAR]', calendar);
            // console.log('[SET_CALENDAR]', state);
            return calendar;
        }
        default:
            return state;
    }
}
function createCalendare() {
    return Immutable.Map(getCalendar());
}
function getCalendar(month, year){
    const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const curYear = year || new Date().getFullYear();
    const curDate = new Date().getDate();
    let curMonth;
    if (typeof  month === 'undefined') {
        curMonth = new Date().getMonth();
    } else {
        curMonth = month;
    }
    let curDay = new Date().getDay() || 7;
    const curMonthStr = checkMonth(curMonth);
    let {prevDay, prevDate, prevYear, prevMonth} = prevDates(curYear, curMonth);
    const amountDays = new Date(curYear, curMonth+1 , 0).getDate();
    const [daysTemp, days, calendar] = [[], [], {}];

    class dayConst {
        constructor(day, flag, ISOdate){
            this.day = day;
            this.flag = flag;
            this.ISOdate = ISOdate;
        }
    }

    if (prevDay !=7) {
        while (prevDay--) {
            let pDay = prevDate - prevDay;
            daysTemp.push(new dayConst(pDay, false, getDay(prevYear, prevMonth, pDay)));
        }
    }
    let i = 0;
    while (i++ < amountDays) {

        daysTemp.push(new dayConst(i, true, getDay(curYear, curMonth, i)));
    }

    while (daysTemp.length) {
        let part = daysTemp.splice(0,7);
        if (part.length < 7) {
            let g = 7 - part.length;
            let j = 1;
            for (g ; g-- ;) {
                let nextDay = j;
                let nextMonth = (curMonth + 1) > 11 ? 0 : curMonth + 1;
                let nextYear = (curMonth === 11) ? curYear + 1 : curYear;
                part.push(new dayConst(nextDay, false, getDay(nextYear, nextMonth, nextDay)));
                j++
            }
        }
        days.push(part);
    }
    calendar.month = {};
    calendar.month.text = curMonthStr;
    calendar.month.number = curMonth;
    calendar.year = curYear;
    calendar.day = curDay;
    calendar.date = curDate;
    calendar.monthName = monthName;
    calendar.days = days;
    calendar.week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return  calendar;

    function checkMonth(month) {
        return monthName[month];
    }
    function getDay(year, month, day) {
        const date = new Date(year, month, day+1);
        return date.toISOString();
    }
    function prevDates(year, month){

        const date = new Date(year, month, 0);
        let day = date.getDay();
        let prevYear = date.getFullYear();
        let prevMonth= date.getMonth();

        if (day === 0) {
            day = 7;
        }
        return {prevDay: day, prevDate: date.getDate(), prevYear: prevYear, prevMonth: prevMonth}
    }
}
