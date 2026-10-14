const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all");

const STORAGE_KEY = "quicknotes";

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

function render() {
  notesList.textContent = "";
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }

  const searchWords = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchWords);
  });

  if (visibleNotes.length === 0 && searchWords !== "") {
    const noMatch = document.createElement("li");
    noMatch.textContent = "No notes match your search.";
    notesList.appendChild(noMatch);
  }

  visibleNotes.forEach(function (note) {
    const li = document.createElement("li");
    li.classList.add("note", "category-" + note.category.toLowerCase());

    const text = document.createElement("p");
    text.textContent = note.text;

    const category = document.createElement("small");
    category.textContent = note.category;

    const date = document.createElement("small");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteNote(note.id);
    });

    li.append(text, category, date, deleteButton);
    notesList.appendChild(li);
  });
}
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}
function clearAll() {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
}

function addNote(event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  saveNotes();
  render();
  noteInput.value = "";
}

noteForm.addEventListener("submit", addNote);

clearAllButton.addEventListener("click", clearAll);
searchInput.addEventListener("input", render);
render();
