import './App.css';
import React from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

// const firebase=require('firebase');

class App extends React.Component{

  constructor() {
    super();
    this.state={
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  

  render(){
    console.log("oye hoe",this.state.selectedNote)
    return(
      <div className="app-container">
      <SidebarComponent 
      selectedNoteIndex={this.state.selectedNoteIndex}
      notes={this.state.notes}
      deleteNote={this.deleteNote}
      selectNote={this.selectNote}
      
      newNote={this.newNote}></SidebarComponent>
      {
        
        this.state.selectedNote?<EditorComponent
        selectedNote={this.state.selectedNote}
        selectedNoteIndex={this.state.selectedNoteIndex}
        notes={this.state.notes}
        noteUpdate={this.noteUpdate}></EditorComponent>:
        null
      }
      </div>
    );
  }

  componentDidMount= ()=>{
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes=serverUpdate.docs.map(_doc=>{
          const data=_doc.data();
          data['id']=_doc.id;
          return data;
        });
        
        console.log(notes);
        this.setState({notes:notes});
      })

  }
  selectNote=(note,index)=>{
    console.log("hai select note was called",this.state.selectedNote);
    this.setState({selectedNoteIndex:index,selectedNote:note});
    console.log("after hai select note was called",this.state.selectedNote);
    
  } 

  noteUpdate=(id,noteObj)=>{
    firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      Title:noteObj.title,
      body:noteObj.body,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  newNote=async(title)=>{
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        Title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }
  
}

export default App;
