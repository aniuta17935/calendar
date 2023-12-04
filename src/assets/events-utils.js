import { INITIAL_EVENTS, createEventId } from "./events";


export function createEvent(title, start, end, startTime, endTime, userId) {
    const newEvent = {
        id: createEventId(),
        title: title,
        start: start + startTime,
        end: end + endTime,
        userId: userId.toString()
    }
    INITIAL_EVENTS.push(newEvent);
}

export function findEventByTitle(title) {
    const foundEvent = INITIAL_EVENTS.find(event => event.title === title);
    return foundEvent;
}

export function findEventByDate(start) {
    const foundEvent = INITIAL_EVENTS.find(event => event.start === start);
    return foundEvent;
}