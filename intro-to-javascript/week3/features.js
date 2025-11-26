// ======================================================
// #Smart-ease - Back to the basics!

// I carried the codes from the nOnoN0nOYes.js functions to this file. Preferably, I would have used the nOnoN0nOYes.js file as a module and imported it into this file. But for now, I will use the functions directly in this file.
const notes = [];

function saveNote(content, id) {
  notes.push({
    content: content,
    id: id
  });
}

function getNote(id) {
  if (id === undefined || typeof id !== 'number') {
    console.log('Error: Please provide a valid number id');
    return;
  }
  
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      return notes[i];
    }
  }
  
  return 'Error: No note found with the given id';
}

function logOutNotesFormatted() {
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    console.log(`The note with id: ${note.id}, has the following note text: "${note.content}".`);
  }
}

function insertNoteAtPosition(content, id, position) {
  if (position === undefined || position === '' || isNaN(position) || position < 1) {
    saveNote(content, id);
    return;
  }
  
  const index = position - 1;
  
  if (index >= notes.length) {
    saveNote(content, id);
    return;
  }
  
  const newNote = {
    content: content,
    id: id
  };
  
  for (let i = notes.length; i > index; i--) {
    notes[i] = notes[i - 1];
  }
  
  notes[index] = newNote;
}

function getNoteCount() {
  return notes.length;
}

// ======================================================
// Interactive UI code

const textarea = document.querySelector('textarea');
const ul = document.querySelector('ul');
const orderInput = document.querySelector('.order-input');
const noteCountDisplay = document.getElementById('note-count');
let noteId = 0;

// Function to update the note count display
function updateNoteCount() {
  noteCountDisplay.textContent = getNoteCount();
}

// Function to display all notes
function displayNotes() {
  ul.innerHTML = '';
  
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const li = document.createElement("li");
    li.innerHTML = note.content;
    ul.appendChild(li);
  }
  
  updateNoteCount();
}

// Add note function when add note button is clicked
document.querySelector('button.add-note').addEventListener('click', () => {
    const content = textarea.value;
    const orderValue = orderInput.value;
    
    if (orderValue !== '' && orderValue !== null) {
      const orderNum = parseInt(orderValue);
      
      if (!isNaN(orderNum) && orderNum > 0 && orderNum === Math.floor(orderNum)) {
        insertNoteAtPosition(content, noteId, orderNum);
      } else {
        saveNote(content, noteId);
      }
    } else {
      saveNote(content, noteId);
    }
    
    noteId++;
    textarea.value = '';
    orderInput.value = '';
    
    updateNoteCount();
});

// Log out notes function when log out button is clicked
document.querySelector('button.log-out').addEventListener('click', () => {
    logOutNotesFormatted();
    displayNotes();
});

updateNoteCount();
ul.innerHTML = '';

// For further development:
// 1. Add a function to delete a note
// 2. Add a function to edit a note
// ...........................................