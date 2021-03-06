import axios from 'axios';

export const GETTING_NOTES = 'GETTING_NOTES';
export const GOT_NOTES = 'GOT_NOTES';
export const ADDING_NOTE = 'ADDING_NOTE';
export const ADDED_NOTE = 'ADDED_NOTE';
export const DELETING_NOTE = 'DELETING_NOTE';
export const DELETED_NOTE = 'DELETED_NOTE';
export const UPDATING_NOTE = 'UPDATING_NOTE';
export const NOTE_UPDATED = 'NOTE_UPDATED';
export const ERROR = 'ERROR';

// added_note, deleted_note, note_updated get replaced with fetchNotes

//middleware (another thunk) use for all action creators
const fetchNotes = (dispatch) => {
  return axios
    .get('https://suminotes-api.herokuapp.com/')
    .then(({ data }) => {
      setTimeout(() => {
        dispatch({
          type: GOT_NOTES,
          payload: data
        });
      }, 500);
    })
    .catch((error) => {
      dispatch({
        type: ERROR,
        message: 'error fetching all notes'
      });
    });
};

export const gettingAllNotes = () => {
  return (dispatch) => {
    dispatch({
      type: GETTING_NOTES
    });
    fetchNotes(dispatch);
  };
};

export const gettingSingleNote = (id) => {
  return (dispatch) => {
    dispatch({
      type: GETTING_NOTES
    });
    axios
      .get(`https://suminotes-api.herokuapp.com/${id}`)
      .then(({ data }) => dispatch({ type: GOT_NOTES, payload: data }))
      .catch((error) => {
        dispatch({ type: ERROR, message: 'error getting note' });
      });
  };
};

export const addNote = (note) => {
  return (dispatch) => {
    dispatch({
      type: ADDING_NOTE
    });
    axios
      .post('https://suminotes-api.herokuapp.com/', note)
      .then((response) => {
        console.log(response);
        // fetchNotes(dispatch);
        dispatch({ type: ADDED_NOTE, payload: { ...note, id: response.data.success } });
        // creating new note object
      })
      .catch((error) => {
        dispatch({ type: ERROR, message: 'error adding note' });
      });
  };
};
// refetch with fetchNotes because payload: data may or not be what you expect

//sends a response status
export const deleteNote = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETING_NOTE
    });
    axios
      .delete(`https://suminotes-api.herokuapp.com/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const action = { type: DELETED_NOTE, id };
          dispatch(action);
        }
      })
      .catch((error) => {
        dispatch({ type: ERROR, message: 'error deleting note' });
      });
  };
};

export const updateNote = (id, editNote) => {
  return (dispatch) => {
    dispatch({
      type: UPDATING_NOTE
    });
    axios
      .put(`https://suminotes-api.herokuapp.com/${id}`, editNote)
      .then((response) => {
        // console.log('this is the response', response);
        dispatch({ type: NOTE_UPDATED, id, ...response.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ERROR, message: 'error updating note' });
      });
  };
};
