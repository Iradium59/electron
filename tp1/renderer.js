const notesList = document.getElementById('notesList');
const noteInput = document.getElementById('noteInput');
const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', () => {
    const note = noteInput.value;
    if (note.trim() !== '') {
        window.electronAPI.saveNote(note);
        noteInput.value = '';
    }
});

window.electronAPI.on('updateNotes', (notes) => {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `<span>${note}</span><button onclick="deleteNoteHandler(${index})">Supprimer</button>`;
        notesList.appendChild(noteItem);
    });
});

function deleteNoteHandler(index) {
    window.electronAPI.deleteNote(index);
}