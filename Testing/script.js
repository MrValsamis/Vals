// generate events
var eventDates = {}

let dayx = formatDate(new Date(2022,7,1,0,0,0,0))
eventDates[dayx] = [
  'This is Day x',
]

let day1a = formatDate(new Date(2022,7,17))
eventDates[day1a] = [
  '</br>DAY 1</br></br><u>In class:</u></br>First Day Warm Up (link)</br>Welcome to Physics!</br>Learn Names</br>Class overview: syllabus (link), materials, whiteboarding, grade weights</br>student info sheets</br>Modeling Discussion - Questions linked HERE(link)</br></br><u>Homework:</u></br></br>-Get and Bring all of your materials and have your binder organized</br>-Go to the class website - make sure you can get to the website and bookmark it!',
]
let day1b = formatDate(new Date(2022,7,18))
eventDates[day1b] = [
  '</br>DAY 1</br><br/><u>In class:</u></br>First Day Warm Up (link)</br>Welcome to Physics!</br>Learn Names</br>Class overview: syllabus (link), materials, whiteboarding, grade weights</br>student info sheets</br>Modeling Discussion - Questions linked HERE(link)</br></br><u>Homework:</u>-Get and Bring all of your materials and have your binder organized</br>-Go to the class website - make sure you can get to the website and bookmark it!',
]
let day2a = formatDate(new Date(2022,7,19))
eventDates[day2a] = [
  '</br>DAY 2</br></br><u>In class:</u></br>Waves and Sound Day 1 WU (link)</br>Make Lab Groups</br>Sign up for Hewitt Textbook</br>Sign up for Webassign</br>Semester Pretest</br>Science Modeling Discussion - Questions (linked) here</br>Hanging slinkly exploration and Discussion.  The questions are here (link)</br>The PHET simulation is linked HERE(link)</br>If time permits... Wave notes and class discussion</br> </br><u>Homework:</u></br>-Read Hewitt: 19.1 (First paragraph only), 19.2-19.5',
]
let day2b = formatDate(new Date(2022,7,22))
eventDates[day2b] = [
  '</br>DAY 2</br></br><u>In class:</u></br>Waves and Sound Day 1 WU (link)</br>Make Lab Groups</br>Sign up for Hewitt Textbook</br>Sign up for Webassign</br>Semester Pretest</br>Science Modeling Discussion - Questions (linked) here</br>Hanging slinkly exploration and Discussion.  The questions are here (link)</br>The PHET simulation is linked HERE(link)</br>If time permits... Wave notes and class discussion</br></br><u>Homework:</u></br>-Read Hewitt: 19.1 (First paragraph only), 19.2-19.5',
]
let day3a = formatDate(new Date(2022,7,23))
eventDates[day3a] = [
  '</br>DAY 3</br></br><u>In class:</u></br>Waves and Sound Day 2 WU (link)</br>Finish Modeling Discussion</br>Hanging Slinky Exploration and Discussion.  The questions are here (link)</br>The the simulation is linked (link) here</br>Waves Notes and Class Discussion</br>Begin Speed of Sound Lab if time permts</br></br><u>Homework:</u></br>-Do AIP (The Activities in Physics binder) pages: 21-22',
]
let day3b = formatDate(new Date(2022,7,24))
eventDates[day3b] = [
  '</br>DAY 3</br></br><u>In class:</u></br>Waves and Sound Day 2 WU (link)</br>Finish Modeling Discussion</br>Hanging Slinky Exploration and Discussion.  The questions are here (link)</br>The the simulation is linked (link) here</br>Waves Notes and Class Discussion</br>Begin Speed of Sound Lab if time permts</br></br><u>Homework:</u></br>-Do AIP (The Activities in Physics binder) pages: 21-22',
]
let day4a = formatDate(new Date(2022,7,25))
eventDates[day4a] = [
  '</br>DAY 4</br></br><u>In class:</u></br>Waves and Sound Day 3 (link)</br>Go over homework</br>Finish wave notes and answer questions</br>Speed of Sound Lab</br>Gather Data</br>Discuss and analyze results</br>If time...discuss lab report</br></br><u>Homework:</u></br>-Wave terms quiz next class</br>-If you would like some extra wave term review, feel free to check out this video (link)</br>-Speed of sound lab (link) (open and make a copy) due in 3 classes',
]
let day4b = formatDate(new Date(2022,7,26))
eventDates[day4b] = [
  '</br>DAY 4</br></br><u>In class:</u></br>Waves and Sound Day 3 (link)</br>Go over homework</br>Finish wave notes and answer questions</br>Speed of Sound Lab</br>Gather Data</br>Discuss and analyze results</br>If time...discuss lab report</br></br><u>Homework:</u></br>-Wave terms quiz next class</br>-If you would like some extra wave term review, feel free to check out this video (link)</br>-Speed of sound lab (link) (open and make a copy) due in 3 classes',
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