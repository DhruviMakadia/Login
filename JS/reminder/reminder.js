document.addEventListener("DOMContentLoaded", function () {
  let storedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
  let reminderList = document.getElementById("reminder-list");

  function formatDate(dateStr) {
    let date = new Date(dateStr + "T00:00:00"); // Ensure local timezone handling
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let year = date.getFullYear();
    return `${month}/${day}/${year}`; // Returns MM/DD/YYYY
  }

  function parseDateInput(dateStr) {
    let [month, day, year] = dateStr.split("/");
    return `${year}-${month}-${day}`; // Convert MM/DD/YYYY to YYYY-MM-DD
  }

  function sortEvents() {
    storedEvents.sort(
      (a, b) =>
        new Date(parseDateInput(a.date)) - new Date(parseDateInput(b.date))
    );
  }

  function renderReminders() {
    sortEvents();
    reminderList.innerHTML = "";

    storedEvents.forEach((event, index) => {
      let listItem = document.createElement("li");
      listItem.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );

      listItem.innerHTML = `
        <span><strong>${event.date}</strong>: ${event.name}</span>
        <div>
            <button class="btn btn-primary btn-sm edit-event" data-id="${event.id}" data-index="${index}">Edit</button>
            <button class="btn btn-danger btn-sm delete-event" data-id="${event.id}">Delete</button>
        </div>
      `;

      reminderList.appendChild(listItem);
    });
  }

  renderReminders();

  reminderList.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-event")) {
      let eventId = e.target.getAttribute("data-id");
      let eventToEdit = storedEvents.find((event) => event.id === eventId);
      if (eventToEdit) {
        document.getElementById("edit-event-id").value = eventToEdit.id;
        document.getElementById("edit-event-note").value = eventToEdit.name;
        document.getElementById("edit-event-date").value = parseDateInput(
          eventToEdit.date
        );
        new bootstrap.Modal(document.getElementById("editModal")).show();
      }
    }

    if (e.target.classList.contains("delete-event")) {
      let eventId = e.target.getAttribute("data-id");
      document
        .getElementById("confirm-delete")
        .setAttribute("data-id", eventId);
      new bootstrap.Modal(document.getElementById("deleteModal")).show();
    }
  });

  document.getElementById("save-edit").addEventListener("click", function () {
    let eventId = document.getElementById("edit-event-id").value;
    let newNote = document.getElementById("edit-event-note").value;
    let newDate = document.getElementById("edit-event-date").value;

    let formattedNewDate = formatDate(newDate); // Ensure it's MM/DD/YYYY

    storedEvents = storedEvents.map((event) =>
      event.id === eventId
        ? { ...event, name: newNote, date: formattedNewDate }
        : event
    );

    localStorage.setItem("calendarEvents", JSON.stringify(storedEvents));
    renderReminders();
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  });

  document
    .getElementById("confirm-delete")
    .addEventListener("click", function () {
      let eventId = this.getAttribute("data-id");
      storedEvents = storedEvents.filter((event) => event.id !== eventId);
      localStorage.setItem("calendarEvents", JSON.stringify(storedEvents));
      renderReminders();
      bootstrap.Modal.getInstance(
        document.getElementById("deleteModal")
      ).hide();
    });
});
