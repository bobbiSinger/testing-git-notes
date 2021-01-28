const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.bgGreen('New note added'))
    } else {
        console.log(chalk.inverse.bgRed('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesAfterRemove = notes.filter((note) => note.title !== title)
    if (notes.length === notesAfterRemove.length) {
        console.log(chalk.inverse.bgRed('No note found'))
    } else {
        saveNotes(notesAfterRemove)
        console.log(chalk.inverse.bgGreen('Note removed'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length > 0) {
        console.log(chalk.inverse.bgBlue('Your notes:'))
        notes.forEach((note) => console.log(note.title))
    } else {
        console.log(chalk.inverse.bgBlue('No notes'))
    }   
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.inverse.bgBlue(note.title + ':') + ' ' + note.body)
    } else {
        console.log(chalk.inverse.bgRed('No such note exists'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}