// generate events
var eventDates = {}

let day1a = formatDate(new Date(new Date().setDate(new Date().getDate() + 42)))
eventDates[day1a] = [
  '</br>DAY 1</br>In class:</br>First Day Warm Up (link)</br>Welcome to Physics!</br>Learn Names</br>Class overview: syllabus (link), materials, whiteboarding, grade weights</br>student info sheets</br>Modeling Discussion - Questions linked HERE(link)</br></br><u>Homework:</u></br>-Get and Bring all of your materials and have your binder organized</br>-Go to the class website - make sure you can get to the website and bookmark it!',
]

let day1b = formatDate(new Date(new Date().setDate(new Date().getDate() + 43)))
eventDates[day1b] = [
  '</br>DAY 1</br>In class:</br>First Day Warm Up (link)</br>Welcome to Physics!</br>Learn Names</br>Class overview: syllabus (link), materials, whiteboarding, grade weights</br>student info sheets</br>Modeling Discussion - Questions linked HERE(link)</br></br><u>Homework:</u></br>-Get and Bring all of your materials and have your binder organized</br>-Go to the class website - make sure you can get to the website and bookmark it!',
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
    flatpickr.set('showMonths', 1)
    flatpickr.set('maxDate', maxDate[1])
  }
  if(width < 992 && width >= 768 && flatpickr.config.showMonths !== 1) {
    flatpickr.set('showMonths', 1)
    flatpickr.set('maxDate', maxDate[1])
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