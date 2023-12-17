import { useSpeechRecognition, useSpeechSynthesis } from "@vueuse/core";
import { watch } from "vue";

export class SpeechRecognition {
  actions = [
    {
      description: "hello",
      prompt: "привіт",
      response: "Привіт, чим я можу допомогти?",
    },
    // 20 грудня створи нову нотатку
    {
      description: "new calendar note",
      prompt: "створи нову нотатку",
      response: "Готовий створювати нову нотатку. Який вміст нотатки?",
    },
    // піти за продуктами кінець нотатки
    {
      description: "confirm note",
      prompt: "кінець нотатки",
      response: "Нотатку створено",
    },
    // 20 грудня видали нотатку
    {
      description: "delete note",
      prompt: "видали нотатку",
      response: "Нотатку видалено",
    },
    {
      description: "error",
      response: "Вибачте, команду не розпізнано",
    },
  ];

  constructor() {
    const speech = useSpeechRecognition({ lang: "uk" });
    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const speechRecognitionList = new SpeechGrammarList();
    speech.recognition.grammars = speechRecognitionList;

    const { isListening, start, stop, result } = speech;

    this.isListening = isListening;
    this.start = start;
    this.stop = stop;
    this.result = result;

    this.speechSynth = useSpeechSynthesis(this.result, {
      lang: "uk",
      pitch: 0.4,
    });

    this.lastDate = "";

    const ctx = this;

    watch(
      this.result,
      function (res) {
        console.log(res);
        const response = this.resolveCommand(res);
        if (Object.keys(response).length !== 0 && this.isListening)
          setTimeout(
            function () {
              this.commandResolved = true;
              this.stopListening();

              // SET SPEECH ANIMATION HERE
              // WITH TIMEOUT SET IDLE ANIMATION

              this.result.value = response.response;

              this.speechSynth.speak();
            }.bind(ctx),
            1500
          );
      }.bind(ctx)
    );
  }

  provideCalendar(calendarApi) {
    this.calendarApi = calendarApi;
  }

  startListening() {
    // SET LISTENING ANIMATION HERE

    this.commandResolved = false;
    this.result = "";
    this.start();
    console.log("Start listening");
  }

  stopListening() {
    // SET IDLE ANIMATION HERE

    this.stop();
    console.log("Stop listening");
    if (!this.commandResolved) {
      this.result = "Вибачте, команду не розпізнано";
      this.speechSynth.speak();
    }
  }

  resolveCommand(command) {
    let response = {};

    const ctx = this;

    this.actions.forEach(
      function (action) {
        if (command.includes(action.prompt)) {
          switch (action.description) {
            case "new calendar note": {
              this.lastDate = getFormattedDate(
                command.split(" ").slice(0, 2).join(" ")
              );
              console.log(this.lastDate);
              break;
            }
            case "confirm note": {
              const date = this.lastDate;
              const content = getNoteContent(command);

              console.log(date, content);
              this.calendarApi.addEvent({
                id: date,
                title: content,
                date: date,
                allDay: true,
              });

              this.lastDate = "";
              break;
            }
            case "delete note": {
              const date = getFormattedDate(
                command.split(" ").slice(0, 2).join(" ")
              );
              this.calendarApi.getEventById(date).remove();
              break;
            }
          }
          response = { ...action };
          return;
        }
      }.bind(ctx)
    );
    return response;
  }
}

function getFormattedDate(stringDate) {
  const dateDict = {
    січня: 1,
    лютого: 2,
    березня: 3,
    квітня: 4,
    травня: 5,
    червня: 6,
    липня: 7,
    серпня: 8,
    вересня: 9,
    жовтня: 10,
    листопада: 11,
    грудня: 12,
  };

  const dates = stringDate.split(" ");
  const stringMonth = dates[1];
  const stringDay = dates[0];

  return `2023-${dateDict[stringMonth]}-${stringDay}`;
}

function getNoteContent(command) {
  const content = command.split(" ").slice(0, -2).join(" ");
  return content;
}
