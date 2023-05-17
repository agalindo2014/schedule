document.addEventListener('DOMContentLoaded', function() {
    const currentDayEl = document.getElementById('currentDay');
    const saveButtons = document.querySelectorAll('.saveBtn');
    const timeBlocks = document.querySelectorAll('.time-block');
  
    // Get the current date
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    currentDayEl.textContent = currentDate.toLocaleDateString('en-US', options);
  
    // Set color-coded time blocks
    timeBlocks.forEach(function(timeBlock) {
      const hour = parseInt(timeBlock.querySelector('.hour').textContent);
      if (hour < currentDate.getHours()) {
        timeBlock.classList.add('past');
      } else if (hour === currentDate.getHours()) {
        timeBlock.classList.add('present');
      } else {
        timeBlock.classList.add('future');
      }
    });
  
    // Save event to local storage
    saveButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const eventText = button.previousElementSibling.value;
        const hour = button.parentNode.querySelector('.hour').textContent;
        localStorage.setItem(hour, eventText);
      });
    });
  
    // Load saved events from local storage
    timeBlocks.forEach(function(timeBlock) {
      const hour = timeBlock.querySelector('.hour').textContent;
      const eventText = localStorage.getItem(hour);
      if (eventText) {
        timeBlock.querySelector('.event').value = eventText;
      }
    });
  });
  