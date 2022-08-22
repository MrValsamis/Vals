// generate events
var eventDates = {}


let day1a = formatDate(new Date(2022,7,17))
eventDates[day1a] = [
  '</br>DAY 1</br></br><u>In class:</u></br><a href="Documents/First_Day_Warm_Up_PCB.pdf"  target="_blank" rel="noopener noreferrer">First Day Warm Up</a></br>Welcome to Physics!</br>Learn Names</br>Class overview: <a href="Documents/syllabus_year_22.pdf"  target="_blank" rel="noopener noreferrer">syllabus</a>, materials, whiteboarding, grade weights</br>student info sheets</br><a href="Documents/Science_Model_Discussion_Questions_Day_1.pdf" target="_blank" rel="noopener noreferrer">Modeling Discussion </a></br></br><u>Homework:</u></br></br>-Get and Bring all of your materials and have your binder organized</br>-Go to the class website - make sure you can get to the website and bookmark it!',
]

let day1b = formatDate(new Date(2022,7,18))
eventDates[day1b] = [
  '</br>DAY 1</br></br><u>In class:</u></br>First Day Warm Up</br>Welcome to Physics!</br>Learn Names</br>Class overview: <a href="Documents/syllabus_year_22.pdf"  target="_blank" rel="noopener noreferrer">syllabus</a>, materials, whiteboarding, grade weights</br>student info sheets</br><a href="Documents/Science_Model_Discussion_Questions_Day_1.pdf" target="_blank" rel="noopener noreferrer">Modeling Discussion </a></br></br><u>Homework:</u></br></br>-Get and Bring all of your materials and have your binder organized</br>-Go to the class website - make sure you can get to the website and bookmark it!',
]

let day2a = formatDate(new Date(2022,7,19))
eventDates[day2a] = [
  '</br>DAY 2</br></br><u>In class:</u></br><a href="https://docs.google.com/document/d/1iefv7wdN0P37O6l1Q2U8dn6um5eYZzCg8M9CBUStGHE/edit"  target="_blank" rel="noopener noreferrer">Waves and Sound Day 1 WU</a></br>Make Lab Groups</br>Student Info Sheets</br>Sign up for Hewitt Textbook - Information linked <a href="Documents/textbook_registration.pdf"  target="_blank" rel="noopener noreferrer">HERE</a></br>Sign up for WebAssign - Information linked <a href="Documents/webassign_registration.pdf"  target="_blank" rel="noopener noreferrer">HERE</a></br><a href="Documents/Science_Model_Discussion_Questions_Day_1.pdf"  target="_blank" rel="noopener noreferrer">Science Modeling Discussion</a></br>Hanging Slinky Exploration and Discussion.  The questions are <a href="https://docs.google.com/document/d/1U0sQNeimCN0mkQwtNYOFg4YLLM6HN0RwZElM4ZabRck/edit"  target="_blank" rel="noopener noreferrer">HERE</a>.  The PHET simulation is linked <a href="https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html"  target="_blank" rel="noopener noreferrer">HERE</a></br>If time permits... wave notes and class discussion.</br></br><u>Homework:</u></br>Read Hewitt:</br>Section 19.1 (First paragraph only)</br>Sections 19.2-19.5</br>TAKE NOTES!',
]

let day2b = formatDate(new Date(2022,7,22))
eventDates[day2b] = [
  '</br>DAY 2</br></br><u>In class:</u></br><a href="https://docs.google.com/document/d/1iefv7wdN0P37O6l1Q2U8dn6um5eYZzCg8M9CBUStGHE/edit"  target="_blank" rel="noopener noreferrer">Waves and Sound Day 1 WU</a></br>Make Lab Groups</br>Student Info Sheets</br>Sign up for Hewitt Textbook - Information linked <a href="Documents/textbook_registration.pdf"  target="_blank" rel="noopener noreferrer">HERE</a></br>Sign up for WebAssign - Information linked <a href="Documents/webassign_registration.pdf"  target="_blank" rel="noopener noreferrer">HERE</a></br><a href="Documents/Science_Model_Discussion_Questions_Day_1.pdf"  target="_blank" rel="noopener noreferrer">Science Modeling Discussion</a></br>Hanging Slinky Exploration and Discussion.  The questions are <a href="https://docs.google.com/document/d/1U0sQNeimCN0mkQwtNYOFg4YLLM6HN0RwZElM4ZabRck/edit"  target="_blank" rel="noopener noreferrer">HERE</a>.  The PHET simulation is linked <a href="https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html"  target="_blank" rel="noopener noreferrer">HERE</a></br>If time permits... wave notes and class discussion.</br></br><u>Homework:</u></br>Read Hewitt:</br>Section 19.1 (First paragraph only)</br>Sections 19.2-19.5</br>TAKE NOTES!',
]


// set maxDates
var maxDate = {
  1: new Date(new Date().setMonth(new Date().getMonth() + 11)),
  2: new Date(new Date().setMonth(new Date().getMonth() + 10)),
  3: new Date(new Date().setMonth(new Date().getMonth() + 9))
}

var flatpickr = $('#calendar .placeholder').flatpickr({
  inline: true,
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