// generate events
var eventDates = {}

let day1 = formatDate(new Date(2022,7,17))
eventDates[day1] = [
  '</br>DAY 1</br><u>In class:</u></br>Welcome to Physics!</br><a href="Documents/Syllabus.pdf" target="_blank" rel="noopener noreferrer">Syllabus</a>, introduction, <a href="https://www.learnapphysics.com/" target="_blank" rel="noopener noreferrer">learnapphysics</a> and <a href="Documents/about_the_tests.pdf" target="_blank" rel="noopener noreferrer">course overview</a></br>Sign up for <a href="Documents/courseflyer.pdf" target="_blank" rel="noopener noreferrer">WileyPlus</a></br>Identity Folders</br></br><u>Homework:</u></br>-Read HRW, Chapter 2 (Motion Along a Straight Line)</br>-Complete Chapter 2 Homework on WileyPlus</br>-Begin working on Identity Folders!',
]

let day2 = formatDate(new Date(2022,7,18))
eventDates[day2] = [
  '</br>DAY 2</br><u>In class:</u></br>Identity Folder and <a href="Documents/identity_folder.pdf" target="_blank" rel="noopener noreferrer">handout</a></br>Sign up for Google Classroom (code: fi4smwc)</br>Review <a href="Documents/worksheet_01.pdf" target="_blank" rel="noopener noreferrer"> Mechanics Packet</a></br></br><u>Homework:</u></br>No new HW',
]


let day3 = formatDate(new Date(2022,7,19))
eventDates[day3] = [
  '</br>DAY 3</br><u>In class:</u></br>Sign up for other CollegeBoard courses (<a href="Documents/CBMEC2022.pdf" target="_blank" rel="noopener noreferrer">Mechanics</a> and <a href="Documents/CBEM2022.pdf" target="_blank" rel="noopener noreferrer">E&M</a>)</br>Complete<a href="Documents/worksheet_01.pdf" target="_blank" rel="noopener noreferrer"> Mechanics Review Packet</a></br>Begin discussion on<a href="Documents/a_calculus_primmer.pdf" target="_blank" rel="noopener noreferrer"> Derivatives</a></br></br><u>Homework:</u></br>Due Monday - </br>Complete the packet reading on derivatives</br></br>Due Tuesday - </br>Continue to work on WileyPlus homework (extended)</br>Read HRW, Chapter 3',
]

let day4 = formatDate(new Date(2022,7,22))	
eventDates[day4] = [	
'</br>DAY 4</br><u>In class:</u></br>Finished (nearly) discussion on derivatives</br></br><u>Homework:</u></br>No new HW',	
]	


let day5 = formatDate(new Date(2022,7,23))	
eventDates[day5] = [	
'</br>DAY 5</br><u>In class:</u></br>Chain Rule</br>Calculus documents from class:</br><a href="https://www.valsamisphysics.com/APcalendar/Documents/calculus_rules.pdf" target="_blank" rel="noopener noreferrer">Calculus rules</a></br><a href="https://www.valsamisphysics.com/APcalendar/Documents/derivative_rules.pdf" target="_blank" rel="noopener noreferrer">Derivative rules</a></br></br>The "Ideal Atwood Machine (kinematics and energy solutions)</br></br>Extra Resources:</br><a href="https://www.valsamisphysics.com/APcalendar/Documents/additional_text/vectors.pdf" target="_blank" rel="noopener noreferrer">Vector reading</a>, <a href="https://www.valsamisphysics.com/APcalendar/Documents/additional_text/solutions.pdf" target="_blank" rel="noopener noreferrer">Solutions for reading</a></br><a href="https://www.valsamisphysics.com/APcalendar/Documents/additional_text/differentiation.pdf" target="_blank" rel="noopener noreferrer">Differentiation reading</a>, YouTube Series - <a href="https://www.youtube.com/watch?v=WUvTyaaNkzM&list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr&ab_channel=3Blue1Brown" target="_blank" rel="noopener noreferrer">3Blue1Brown</a></br></br><u>Homework:</u></br>Due Thursday</br>Read HRW, Chapter 3 Sections 4.1 - 4.5</br>(position and displacement, average and instantaneous velocity, average and instantaneous acceleration, projectile motion, uniform circular motion)</br></br>Due Friday</br>Prepare for derivatives quiz',	
]	

let day6 = formatDate(new Date(2022,7,24))	
eventDates[day6] = [	
'</br>DAY 6</br><u>In class:</u></br><a href="https://drive.google.com/file/d/1UUWWRWnXzVj4aaIzTjdpvqdQU8iGOYKP/view?usp=sharing" target="_blank" rel="noopener noreferrer">Wake Up 01</a></br></br><u>Homework:</u></br>Due Thursday (8/25)</br>Read HRW, Chapter 4, Sections 4.1 - 4.5</br>(position and displacement, average and instantaneous velocity, average and instantaneous acceleration, projectile motion, uniform circular motion)</br></br>Due Friday (8/26)</br>Prepare for derivatives quiz</br>Identity Folder/<a href="https://www.valsamisphysics.com/APcalendar/Documents/identity_folder.pdf" target="_blank" rel="noopener noreferrer">Handout</a></br></br>Due Monday (8/29)</br>WileyPlus Chapter 3 Homework',	
]

let day7 = formatDate(new Date(2022,7,25))	
eventDates[day7] = [	
'</br>DAY 7</br><u>In class:</u></br><a href="https://drive.google.com/file/d/1UUWWRWnXzVj4aaIzTjdpvqdQU8iGOYKP/view?usp=sharing" target="_blank" rel="noopener noreferrer">Continue with Wake Up 01</a></br><a href="https://youtu.be/rfG8ce4nNh0" target="_blank" rel="noopener noreferrer">The Integral - 3Blue1Brown</a></br>Projectile motion problem</br>Get some work done!</br></br><u>Homework:</u></br>Due Friday (8/26)</br>Prepare for derivatives quiz</br>Identity Folder/<a href="https://www.valsamisphysics.com/APcalendar/Documents/identity_folder.pdf" target="_blank" rel="noopener noreferrer">Handout</a></br></br>Due Monday (8/29)</br>WileyPlus Chapter 3 Homework</br>Read HRW, Chapter 4; Section 4.6 (relative motion in 1D)</br></br>Due Friday (9/2)</br>Tentative Kinematics Quiz',	
]

let day8 = formatDate(new Date(2022,7,26))	
eventDates[day8] = [	
'</br>DAY 8</br><u>In class:</u></br>Derivatives quiz</br>Finish problem set if time permits</br>Practice integration if time permits</br></br><u>Homework:</u></br>Due Monday (8/29)</br>WileyPlus Chapter 3 Homework</br>Read HRW, Chapter 4; Section 4.6 (relative motion in 1D)</br></br>Due Wednesday (8/31)</br>WileyPlus Chapter 4 Homework</br></br>Due Friday (9/2)</br>Tentative Kinematics Quiz',	
]

let day9 = formatDate(new Date(2022,7,29))	
eventDates[day9] = [	
'</br>DAY 9</br><u>In class:</u></br>Homework questions</br><a href="https://drive.google.com/file/d/1UUWWRWnXzVj4aaIzTjdpvqdQU8iGOYKP/view?usp=sharing" target="_blank" rel="noopener noreferrer">Wake Up 01</a></br>Banked curve</br>Integration practice</br>Work on HW</br></br><u>Homework:</u></br>Due Wednesday</br>WileyPlus Chapter 4 Homework</br></br>Read HRW, Chapter 5</br>Sections 5.1 - 5.3</br>(Newton\'s 1st and 2nd laws, some particular forces, applying newton\'s laws)</br></br>Due Friday (9/2)</br>Tentative Kinematics Quiz',	
]

let day10 = formatDate(new Date(2022,7,30))	
eventDates[day10] = [	
'</br>DAY 10</br><u>In class:</u></br>Pass back derivative quiz</br>Integration Practice</br>Wake up 03 (banked curve with friction)</br></br><u>Homework:</u></br>WileyPlus Chapter 4 Homework</br>Read HRW, Chapter 5</br>Sections 5.1 - 5.3',	
]	

let day11 = formatDate(new Date(2022,7,31))	
eventDates[day11] = [	
'</br>DAY 11</br><u>In class:</u></br>Wake Up 03</br>Integration practice</br>Banked curve</br></br><u>Homework:</u></br>Optional take-home retake</br>Kinematics Quiz',	
]	

let day12 = formatDate(new Date(2022,8,1))	
eventDates[day12] = [	
'</br>DAY 12</br><u>In class:</u></br>Dot Product</br>Wake Up 03</br></br><u>Homework:</u></br>Due Tuesday (9/6)</br>Optional take-home retake</br>Kinematics Quiz</br></br>Due Wednesday (9/7)</br>WileyPlus Chapter 5 Homework',	
]	

let day13 = formatDate(new Date(2022,8,2))	
eventDates[day13] = [	
'</br>DAY 13</br><u>In class:</u></br>Finished WU 03 Calvin and Hobbes</br>Differential Equation definition and example</br>Last WU 03 question</br>Atwood Machine with decreasing mass</br></br><u>Homework:</u></br>Due Tuesday (9/6)</br>Optional take-home retake</br>Kinematics Quiz</br></br>Due Wednesday (9/7)</br>WileyPlus Chapter 5 Homework',	
]	

let day14 = formatDate(new Date(2022,8,6))	
eventDates[day14] = [	
'</br>DAY 14</br><u>In class:</u></br>Unit 1 - Kinematics Quiz</br></br><u>Homework:</u></br>Due Wednesday (9/7)</br>WileyPlus Chapter 5 Homework=',	
]	

let day15 = formatDate(new Date(2022,8,7))	
eventDates[day15] = [	
'</br>DAY 15</br><u>In class:</u></br>Atwood machine with changing mass</br>Monkey/Pulley</br>Begin discussion/notes on torque</br>Vector cross product if time allows</br></br><u>Homework:</u></br>Due Friday (9/9)</br>Read HRW, Chapter 10</br>Section 10.6 (Torque)</br>Read HRW, Chapter 12</br>Sections 12.1-12.2 (Equilibrium and the center of gravity)',	
]	

let day16 = formatDate(new Date(2022,8,8))	
eventDates[day16] = [	
'</br>DAY 16</br><u>In class:</u></br>Review Kinematics Quiz work</br></br><u>Homework:</u></br>Due Friday (9/9)</br>Read HRW, Chapter 10</br>Section 10.6 (Torque)</br>Read HRW, Chapter 12</br>Sections 12.1 - 12.2 (Equilibrium and the center of gravity)',	
]	

let day17 = formatDate(new Date(2022,8,9))	
eventDates[day17] = [	
'</br>DAY 17</br><u>In class:</u></br>Extended FBD</br>WU 04 (coefficient of static friction)</br>Angled ladder problem</br></br><u>Homework:</u></br>Due Tuesday (9/13)</br>WileyPlus Chapter 6 Homework</br>Due Wednesday (9/14)</br>Read HRW, Chapter 7 and 8</br>Due Thursday (9/15)</br>WileyPlus Chapter 7 Homework</br>Due Monday (9/19)</br>WileyPlus Chapter 8 Homework</br></br>Will likely test on forces AND energy toward the end of the week of 9/19',	
]	

let day18 = formatDate(new Date(2022,8,12))	
eventDates[day18] = [	
'</br>DAY 18</br><u>In class:</u></br>Energy conservation equation (reminder about work)</br>Work as Integral</br>If time, finish with WU 04 frame 2</br></br><u>Homework:</u></br>Due Tuesday (9/13)</br>WileyPlus Chapter 6 Homework</br>Due Wednesday (9/14)</br>Read HRW, Chapter 7 and 8</br>Due Thursday (9/15)</br>WileyPlus Chapter 7 Homework</br>Due Monday (9/19)</br>WileyPlus Chapter 8 Homework</br></br>Will likely test on forces AND energy toward the end of the week of 9/19',	
]	

let day19 = formatDate(new Date(2022,8,13))	
eventDates[day19] = [	
'</br>DAY 19</br><u>In class:</u></br>Begin with lab pendulum activity</br>Work as integral</br>WU 04 frame 2</br>Time for homework</br></br><u>Homework:</u></br>Due Tuesday (9/13)</br>WileyPlus Chapter 6 Homework</br>Due Wednesday (9/14)</br>Read HRW, Chapter 7 and 8</br>Due Thursday (9/15)</br>WileyPlus Chapter 7 Homework</br>Due Monday (9/19)</br>WileyPlus Chapter 8 Homework</br></br>Will likely test on forces AND energy toward the end of the week of 9/19',	
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