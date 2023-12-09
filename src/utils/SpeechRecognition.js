import { useSpeechRecognition } from "@vueuse/core";
import { watch } from "vue";

export class SpeechRecognition {
  #actions = [
    {
      description: "Add new note to calendar",
      key_phrase: "create a new note",
      command: "NEW NOTE",
    },
    // { description: "", key_phrase: "", action: "" },
    // { description: "", key_phrase: "", action: "" },
    // { description: "", key_phrase: "", action: "" },
  ];

  constructor() {
    const speech = useSpeechRecognition({
      continuous: true,
    });

    const SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const speechRecognitionList = new SpeechGrammarList();
    speech.recognition.grammars = speechRecognitionList;

    const { isListening, start, stop, result } = speech;

    this.isListening = isListening;
    this.start = start;
    this.stop = stop;
    this.result = result;
  }

  startListening() {
    this.result = "";
    this.start();
    watch(this.result, (res) => console.log(res));
  }

  stopListening() {
    this.stop();
  }

  getLatestCommand() {
    const res = this.result.value.toLowerCase();
    let returnCommand = null;
    this.#actions.forEach(function (action) {
      if (res.includes(action.key_phrase)) {
        returnCommand = this.handleCreateNewNote(action.key_phrase, res);
        return;
      }
    });
    return returnCommand;
  }

  handleCreateNewNote(key_phrase = "", res = "") {
    const tmp = res.replace(key_phrase, "");
    console.log(tmp);
  }
}
