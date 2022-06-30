import notesData from './notes.json' assert { type: 'json' }
import { utilService } from "../../../services/util-service.js"
import { storageService } from "../../../services/async-storage-service.js"


// "url": "https://source.unsplash.com/random/200x200?sig=5",
const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    removeNote,
    get,
    changeNoteBgc,
    save,
    addNote,

}


function query() {
    return storageService.query(NOTE_KEY)
}


function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(NOTE_KEY, note)
    else return storageService.post(NOTE_KEY, note)
}

function addNote(note) {
    const { type, info } = note
    const newNote = {
        type,
        info,
        style: {
            backgroundColor: '#495057',
        },
    }

    return save(newNote)
}

function removeNote(noteId) {
    return get(noteId)
        .then(noteId => {
            return storageService.remove(NOTE_KEY, noteId)
        })
}

function changeNoteBgc({ color, noteId }) {
    return get(noteId)
        .then(note => {
            note.style.backgroundColor = color
            return save(note)
        })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = notesData
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    // console.log(notes);
    return notes
}

