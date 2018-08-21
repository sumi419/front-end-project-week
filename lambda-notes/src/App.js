import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { gettingAllNotes, addNote } from './actions';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import SingleNote from './components/SingleNote';
import SplitPane from 'react-split-pane';
import { Switch, Route, Link } from 'react-router-dom';
import UpdateForm from './components/UpdateForm';

class App extends Component {
  componentDidMount() {
    this.props.gettingAllNotes();
  }

  handleDeleteNote = () => {
    const { _id } = this.props.selectedNote;
    this.props.deleteNote(_id);
  };

  render() {
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize={250}>
          <div className="left">
            <h1>Lambda Notes</h1>
            <Link to="/">
              <button className="sidebar-button">View Your Notes</button>
            </Link>
            <Link to="/new">
              <button className="sidebar-button">+ Create New Note</button>
            </Link>
          </div>
          <div className="right">
            <Route
              exact
              path="/new"
              render={(props) => <NoteForm addNote={this.props.addNote} />}
            />
            {this.props.gettingNotes ? (
              <img src={logo} className="App-logo" alt="logo" />
            ) : (
              <Route exact path="/" render={(props) => <Notes notes={this.props.notes} />} />
            )}
            <Route path="/viewnote" component={SingleNote} />
            <Route path="/update" component={UpdateForm} />
          </div>
        </SplitPane>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    gettingNotes: state.gettingNotes,
    gotNotes: state.gotNotes,
    selectedNote: state.selectedNote,
    addingNote: state.addingNote,
    addedNote: state.addedNote,
    updatingNote: state.updatingNote,
    updatedNote: state.updatedNote,
    deletingNote: state.deletingNote,
    deletedNote: state.deletedNote,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { gettingAllNotes, addNote }
)(App);
