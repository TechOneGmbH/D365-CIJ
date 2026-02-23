/*
        .toggleTitle {
            cursor: pointer;
            user-select: none;
        }

        .toggleTitle::before {
            content: '▼';
            display: inline-block;
            margin-right: 6px;
            font-weight: 700;
        }

        .toggleTitle.is-open::before {
            content: '▲';
        }
*/


document.addEventListener("d365mkt-afterformload", function () {
  groupSessionsByTime();
});


function groupSessionsByTime() {

  var slots = [];

  document.querySelectorAll("div.eventSession").forEach(div => {

    const spans = div.querySelectorAll("span.msdynmkt_personalization");

    if (spans.length === 5) {
      debugger;
      const [sessionTitle, dateSpan, startSpan, endSpan, noClou] = spans;

      debugger;

      let startTime = convertTo24(startSpan.innerText);
      let endTime = convertTo24(endSpan.innerText);

      let startAndEndTime = startTime + " bis " + endTime + " Uhr";

      dateSpan.style = "visibility: hidden;";
      startSpan.style = "visibility: hidden;";
      endSpan.style = "visibility: hidden;";

      var containsTime = false;

      slots.forEach(slot => {
        if (slot.startAndEndTime == startAndEndTime) {
          containsTime = true;
          slot.divHtml += div.outerHTML;
        }
      });

      if (!containsTime) {
        slots[slots.length] = { startAndEndTime: startAndEndTime, divHtml: div.outerHTML };
      }
    }
  });


  const eventSessions = document.querySelectorAll("fieldset.eventSessions");
  eventSessions[0].innerHTML = "";

  slots.forEach(slot => {
    eventSessions[0].innerHTML += "<div><b onclick='hideSessions(this);' class='toggleTitle'>" + slot.startAndEndTime + "</b><br><br><div class='divSessions' style='display:none'>" + slot.divHtml + "<br></div></div>";
  });

}

function hideSessions(el) {

  const sessions = el.parentElement.querySelector('.divSessions');
  const titles = el.parentElement.querySelector('.toggleTitle');

  if (!sessions) return;
  debugger;
  if (sessions.style.display === "none") {
    sessions.style.display = "block";
    titles.classList.add('is-open');
  } else {
    sessions.style.display = "none";
    titles.classList.remove('is-open');
  }
}

function convertTo24(timeStr) {

  debugger;

  const timePatternShort = /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i;
  if (timePatternShort.test(timeStr)) {

    let [, hours, minutes, meridian] = timeStr.match(timePatternShort);
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (meridian.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (meridian.toUpperCase() === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  const timePatternLong = /^(?<weekday>Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s+(?<month>January|February|March|April|May|June|July|August|September|October|November|December)\s+(?<day>0?[1-9]|[12]\d|3[01]),\s+(?<year>\d{4})\s+(?<hour>0?[1-9]|1[0-2]):(?<minute>[0-5]\d)(?::(?<second>[0-5]\d))?\s+(?<ampm>AM|PM)$/;

  if (timePatternLong.test(timeStr)) {

    let [, weekday, month, day, year, hours, minutes, second = "00", meridian] = timeStr.match(timePatternLong);
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (meridian.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (meridian.toUpperCase() === "AM" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  return timeStr;
}