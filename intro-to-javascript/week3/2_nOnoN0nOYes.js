// ======================================================

// #Smart-ease - Back to the basics!
// NOnoN0nOYes (Note taking app)

// Create a variable called notes and assign it to an empty array
const notes = [];

// Save a note function
function saveNote(content, id) {
  notes.push({
    content: content,
    id: id
  });
}

// test the saveNote function
saveNote('This is a test note', 1);
saveNote('This is a third test note', 3);
saveNote('This is a second test note', 2);
console.log(notes);


// Get a note function
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

// test the getNote function
console.log(getNote(1));
console.log(getNote(2));
console.log(getNote(3));
console.log(getNote(4));

// Log out notes formatted function
function logOutNotesFormatted() {
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    console.log(`The note with id: ${note.id}, has the following note text: "${note.content}".`);
  }
}

// test the logOutNotesFormatted function
logOutNotesFormatted();

// Unique feature: Insert note at specific position
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
// test the insertNoteAtPosition function
insertNoteAtPosition('This is a fourth test note', 4, 2);
console.log(notes);
insertNoteAtPosition('This is a fifth test note', 5, 3);
console.log(notes);
insertNoteAtPosition('This is a sixth test note', 6, 4);
console.log(notes);
insertNoteAtPosition('This is a seventh test note', 7, 5);
console.log(notes);
insertNoteAtPosition('This is a eighth test note', 8, 6);
console.log(notes);


// Get note count function
function getNoteCount() {
  return notes.length;
}// test the getNoteCount function
console.log(getNoteCount());
