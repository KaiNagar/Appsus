import { utilService } from "../../../services/util-service.js"
import { storageService } from "../../../services/async-storage-service.js"



const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    removeNote,
    get
}


function query() {
    return storageService.query(NOTE_KEY)
}


function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function removeNote(noteId) {
    return get(noteId)
        .then(noteId => {
            return storageService.remove(NOTE_KEY, noteId)
        })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = getNote()
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    console.log(notes);
    return notes
}


function getNote() {
    return [
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                title: "",
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "http://some-img/me",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                title: "Get my stuff together",
                todos: [
                    {
                        txt: "Driving liscence", doneAt: null
                    },
                    {
                        txt: "Coding power",
                        doneAt: 187111111
                    }
                ]
            }
        }
    ]

}