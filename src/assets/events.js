let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [{
        id: createEventId(),
        title: 'HB',
        start: '2023-12-01',
        end: '2023-12-02',
        userId: '1'
    },
    {
        id: createEventId(),
        title: 'TDOODOD',
        start: todayStr + 'T18:20:00',
        userId: '1'
    }
]

export function createEventId() {
    return String(eventGuid++)
}