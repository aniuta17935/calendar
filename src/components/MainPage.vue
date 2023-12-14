<script>
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../assets/events";
import { SpeechRecognition } from "@/utils/SpeechRecognition";

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS.filter(
          (e) => e.userId === localStorage.getItem("role")
        ),
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      speechRecognition: new SpeechRecognition(),
    };
  },
  methods: {
    testButtonClicked() {
      if (!this.speechRecognition.calendarApi)
        this.speechRecognition.provideCalendar(
          this.$refs.fullCalendar.getApi()
        );

      if (this.speechRecognition.isListening) {
        this.speechRecognition.stopListening();
      } else this.speechRecognition.startListening();
    },
    handleDateSelect(selectInfo) {
      console.log(localStorage.getItem("role"));
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect();

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
});
</script>

<template>
  <div class="demo-app">
    <div class="demo-app-sidebar">
      <div class="demo-app-sidebar-section">
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li
            v-for="event in currentEvents"
            :key="event.id">
            <b>{{ event.startStr.slice(0, 10) }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="demo-app-main">
      <FullCalendar
        ref="fullCalendar"
        class="demo-app-calendar"
        :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <div class="speech-area">
      <button
        class="speech-btn"
        @click="testButtonClicked">
        {{ speechRecognition.isListening ? "Stop" : "Start" }} listening
      </button>
      <div class="speech-result">{{ speechRecognition.result }}</div>
    </div>
  </div>
</template>

<style lang="css">
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 10px;
}

.demo-app-sidebar {
  height: 300px;
  background: #ffffff;
  border: 1px solid #d3e2e8;
  margin-top: 3em;
  padding: 2em;
}

.demo-app-main {
  padding: 3em;
}

.fc {
  max-width: 1100px;
  margin: 0 auto;
}

.speech-area {
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 16px;
  left: 16px;
}

.speech-btn {
  padding: 8px;
}

.speech-result {
  display: flex;
  align-self: center;
  padding-left: 16px;
}
</style>
