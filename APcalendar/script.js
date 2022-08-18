// generate events
var eventDates = {}

let dayx = formatDate(new Date(2022,7,1,0,0,0,0))
eventDates[dayx] = [

  'This is Day x',
]

let day1a = formatDate(new Date(2022,7,17))
eventDates[day1a] = [
  '</br>DAY 1</br><u>In class:</u></br>Welcome to Physics!</br><a href="Documents/Syllabus.pdf" target="_blank" rel="noopener noreferrer">Syllabus</a>, introduction, <a href="https://www.learnapphysics.com/" target="_blank" rel="noopener noreferrer">learnapphysics</a> and <a href="Documents/about_the_tests.pdf" target="_blank" rel="noopener noreferrer">course overview</a></br>Sign up for <a href="Documents/courseflyer.pdf" target="_blank" rel="noopener noreferrer">WileyPlus</a></br>Identity Folders</br></br><u>Homework:</u></br>-Read HRW, Chapter 2 (Motion Along a Straight Line)</br>-Complete Chapter 2 Homework on WileyPlus</br>-Begin working on Identity Folders!',
]

let day1b = formatDate(new Date(2022,7,18))
eventDates[day1b] = [
  '</br>DAY 2</br><u>In class:</u></br>Identity Folder and <a href="Documents/identity_folder.pdf" target="_blank" rel="noopener noreferrer">handout</a></br>Sign up for Google Classroom (code: fi4smwc)</br>Review <a href="Documents/worksheet_01.pdf" target="_blank" rel="noopener noreferrer"> Mechanics Packet</a></br></br><u>Homework:</u></br>No new HW',
]

// set maxDates
var maxDate = {
  1: new Date(new Date().setMonth(new Date().getMonth() + 11)),
  2: new Date(new Date().setMonth(new Date().getMonth() + 10)),
  3: new Date(new Date().setMonth(new Date().getMonth() + 9))
}

var flatpickr = $('#calendar .placeholder').flatpickr({
  inline: true,
  minDate: 'today',
  maxDate: maxDate[3]
,
  showMonths: 1,
  enable: Object.keys(eventDates),
  disableMobile: "true",
  onChange: function(date, str, inst) {
    var contents = '';
    if(date.length) {
        for(i=0; i < eventDates[str].length; i++) {
        contents += '<div class="event"><div class="date">' + flatpickr.formatDate(date[0], 'l J F') + '</div><div class="location">' + eventDates[str][i] + '</div></div>';
      }
    }
    $('#calendar .calendar-events').html(contents)
  },
  locale: {
    weekdays: {
      shorthand: ["S", "M", "T", "W", "T", "F", "S"],
      longhand: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]
    }
  }
})

eventCaledarResize($(window));
$(window).on('resize', function() {
  eventCaledarResize($(this))
})

function eventCaledarResize($el) {
  var width = $el.width()
  if(flatpickr.selectedDates.length) {
    flatpickr.clear()
  }
  if(width >= 992 && flatpickr.config.showMonths !== 3) {
    flatpickr.set('showMonths', 3)
    flatpickr.set('maxDate', maxDate[3])
  }
  if(width < 992 && width >= 768 && flatpickr.config.showMonths !== 2) {
    flatpickr.set('showMonths', 2)
    flatpickr.set('maxDate', maxDate[2])
  }
  if(width < 768 && flatpickr.config.showMonths !== 1) {
    flatpickr.set('showMonths', 1)
    flatpickr.set('maxDate', maxDate[1])
    $('.flatpickr-calendar').css('width', '')
  }
}

function formatDate(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1; //Month from 0 to 11
    let y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}