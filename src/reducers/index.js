import {
  GETTING_NOTES,
  GOT_NOTES,
  ERROR,
  ADDING_NOTE,
  ADDED_NOTE,
  DELETING_NOTE,
  UPDATING_NOTE,
  NOTE_UPDATED,
  DELETED_NOTE
} from '../actions';

const initialState = {
  notes: [],
  gettingNotes: false,
  gotNotes: false,
  selectedNote: {},
  addingNote: false,
  addedNote: false,
  updatingNote: false,
  updatedNote: false,
  deletingNote: false,
  deletedNote: false,
  error: null
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_NOTES:
      return { ...state, gettingNotes: true };
    case GOT_NOTES:
      return { ...state, gettingNotes: false, notes: action.payload, error: null };
    case ADDING_NOTE:
      return { ...state, addingNote: true };
    case ADDED_NOTE:
      return { ...state, notes: [...state.notes, action.payload], addingNote: false };
    // creating a new array with an array literal
    // spreading the existing notes from the state and adding our note from action.payload
    case DELETING_NOTE:
      return { ...state, deletingNote: true };
    case DELETED_NOTE: 
      return { ...state, deletedNote: true, deletingNote: false, notes: state.notes.filter( note => note.id !== action.id )}
    case UPDATING_NOTE:
      return { ...state, updatingNote: true };
    case NOTE_UPDATED:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.id) {
            return { id: action.id, textBody: action.textBody, title: action.title };
            // replacing the note with action.payload
          } else {
            return note;
          }
        }),
        updatingNote: false
      };
    case ERROR:
      return { ...state, error: action.message };
    default:
      return state;
  }
};
