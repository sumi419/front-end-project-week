import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote } from '../actions';

class NoteForm extends Component {
  state = {
    title: '',
    textBody: ''
  };

  handleNoteInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const note = { title: this.state.title, textBody: this.state.textBody };
    this.props.addNote(note);
    this.setState({ title: '', textBody: '' });
  };

  render() {
    return (
      <div className="single-note">
        <h2>Create New Note:</h2>
        <input
          className="note-title"
          type="text"
          placeholder="note title"
          onChange={this.handleNoteInput}
          name="title"
          value={this.state.title}
        />
        <input
          className="note-text"
          type="text"
          placeholder="note text"
          onChange={this.handleNoteInput}
          name="textBody"
          value={this.state.textBody}
        />
        <button className="save-button" onClick={() => this.handleSubmit()}>
          Save
        </button>
      </div>
    );
  }
}
// pass in anonmyous function
export default connect(
  null,
  { addNote }
)(NoteForm);
