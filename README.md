# QuickNotes

QuickNotes is a note-taking web app built with HTML, CSS and JavaScript. You can write a note, give it a category (Personal, Work or Study), and see it as a card in a list. Notes are saved in the browser, so they are still there after the page is refreshed.

## Features

- Add notes with a category: Personal, Work or Study
- Each note card shows the text, the category, the date and time, and a Delete button
- Each category has its own left-border colour
- Validation: an empty note or a note over 200 characters shows an error message
- Delete any single note
- Search notes by their text, ignoring upper and lower case
- A note count that reads correctly for zero, one and many notes
- Notes are saved with localStorage and load when the page opens
- A layout that stacks the form on screens 600px wide or narrower

## How to run locally

1. Download or clone the repository:

```
git clone https://github.com/mukta-55/quicknotes-app.git
```

2. Open the `quicknotes-app` folder.
3. Open `index.html` in a web browser. In VS Code you can also use the Live Server extension and click "Go Live".

No installation or build step is needed.

## What I learned

- I learned to save data in the browser with localStorage, using JSON.stringify to save the notes array and JSON.parse to load it back.
- I learned to build the list with createElement and textContent instead of innerHTML, so the text a user types is never treated as HTML.
- I learned to use the filter method on an array, both to delete one note and to show only the notes that match a search.
- I learned to use event.preventDefault() in the form's submit handler so the page does not reload when a note is added.
