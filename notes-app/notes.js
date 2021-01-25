const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if(note) {
        console.log(chalk.bgGreen(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bgGray('Your notes...'))
    notes.forEach(note => console.log(note.title))
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote) {
         notes.push({
            title,
            body
        })
        saveNote(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
       console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote = title => {
    const notes = loadNotes();
    const updatedNotes = notes.filter(note => note.title !== title)

    if(notes.length !== updatedNotes.length) {
        saveNote(updatedNotes)
        console.log(chalk.bgGreen('Note removed!'))
        // console.log('Note removed')
    } else {
        // console.log('No note found')
        console.log(chalk.bgRed('No note found!'))
    }
}

const saveNote = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON)
        return data;
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}