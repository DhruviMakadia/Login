document.addEventListener("DOMContentLoaded", function () {
  let storedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];

  $("#evoCalendar").evoCalendar({
    calendarEvents: storedEvents,
    format: "mm/dd/yyyy",
    titleFormat: "MM yyyy",
    eventHeaderFormat: "MM d, yyyy",
    language: "en",
    todayHighlight: true,
    firstDayOfWeek: 1,
    sidebarToggler: true,
    sidebarDisplayDefault: true,
    eventListToggler: true,
    eventDisplayDefault: true,
  });

  $("#evoCalendar").evoCalendar("setTheme", "Midnight Blue");

  $("#evoCalendar").on("selectDate", function (event, newDate) {
    $("#selected-date").text(newDate);
    $("#event-note").val("");
    $("#popupModal").modal("show");
  });

  $("#save-event").on("click", function () {
    let selectedDate = $("#selected-date").text();
    let noteText = $("#event-note").val();

    if (noteText.trim() !== "") {
      let newEvent = {
        id: "event-" + Date.now(),
        name: noteText,
        date: selectedDate,
        type: "note",
      };

      storedEvents.push(newEvent);
      localStorage.setItem("calendarEvents", JSON.stringify(storedEvents));

      $("#evoCalendar").evoCalendar("addCalendarEvent", [newEvent]);
    }
    $("#popupModal").modal("hide");
  });

  $("#close-popup").on("click", function () {
    $("#popupModal").modal("hide");
  });
});
