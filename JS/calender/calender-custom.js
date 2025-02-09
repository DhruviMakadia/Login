myEvents = [
  {
    id: "required-id-1",
    name: "New Year",
    date: "Wed Jan 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)",
    type: "holiday",
    everyYear: true,
  },
  {
    id: "required-id-2",
    name: "Valentine's Day",
    date: "Fri Feb 14 2020 00:00:00 GMT-0800 (Pacific Standard Time)",
    type: "holiday",
    everyYear: true,
    color: "#222",
  },
  {
    id: "required-id-3",
    name: "Custom Date",
    badge: "08/03 - 08/05",
    date: ["August/03/2020", "August/05/2020"],
    description: "Description here",
    type: "event",
  },
];

$("#evoCalendar").evoCalendar({
  calendarEvents: myEvents,
});

$("#evoCalendar").evoCalendar({
  format: "mm/dd/yyyy",
  titleFormat: "MM yyyy",
  eventHeaderFormat: "MM d, yyyy",
});

$("#evoCalendar").evoCalendar({
  language: "en",
});

$("#evoCalendar").evoCalendar({
  todayHighlight: false,
});

$("#evoCalendar").evoCalendar({
  firstDayOfWeek: 1, // Monday
});

// $("#evoCalendar").evoCalendar({
//   disabledDate: ["02/17/2020", "02/21/2020"],
// });

$("#evoCalendar").evoCalendar({
  onSelectDate: function () {
    console.log("onSelectDate!");
  },
});

$("#evoCalendar").evoCalendar("setTheme", "Midnight Blue");

$("#evoCalendar").evoCalendar({
  sidebarToggler: false,
  sidebarDisplayDefault: false,
  eventListToggler: false,
  eventDisplayDefault: false,
});
