$(document).ready(function () {

  // Display current day in a set format 
  var date = dayjs()
  $("#currentDay").text(date.format("dddd, MMMM D"));


  // Load tasks from local storage by iterating through the hours 
  // Allows us to select the textarea element with the class "description" inside the time block corresponding to the current value of [i]

  function uploadTasks() {
    for (let i = 9; i <=21; i++) {
      var task = localStorage.getItem(`task_${i}`);
      $(`.time-block[data-hour='${i}'] .description`).val(task);
    }
  }

  // Save tasks to local storage using set item 
  function saveTask(hour, task) {
    localStorage.setItem(`task_${hour}`, task);
  }

   // Creating a click event in order to save 
   $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("data-hour");
    var task = $(this).siblings(".description").val();
    saveTask(hour, task);
  });
  
  // Updates time blocks according to time
  function updateTimeBlockClasses() {
    var currentHour = date.hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("data-hour"));
      $(this).removeClass("past present future"); // Removing existing classes from the current time blok 

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Upload tasks on page load
  uploadTasks();

  // Update CSS classes of each time block based on the current time
  updateTimeBlockClasses();

  // Time block classes updated every minute
  setInterval(updateTimeBlockClasses, 60000);



});
