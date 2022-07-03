import notesData from './notes.json' assert { type: 'json' }
import { utilService } from "../../../services/util-service.js"
import { storageService } from "../../../services/async-storage-service.js"



const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    removeNote,
    get,
    changeNoteBgc,
    save,
    addNote,
    togglePinned,
}

const colors = [
    '#9400D3',
    '#d0aaaa',
    '#008080',
    '#c96946',
    '#A9A9A9',
    '#ffa5a5',
    '#fff',
    '#f29164'
]

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
        title: 'Enter title',
        isPinned: false,
        style: {
            backgroundColor: colors[utilService.getRandomInt(0, colors.length)],
        },
    }
    return save(newNote)
}

function removeNote(noteId) {
    return get(noteId)
        .then(note => {
            return storageService.remove(NOTE_KEY, note.id)
        })
}

function togglePinned(noteId) {
    return get(noteId)
        .then(note => {
            note.isPinned = !note.isPinned
            return save(note)
        })
}

function changeNoteBgc(color, noteId) {
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
    return notes
}

