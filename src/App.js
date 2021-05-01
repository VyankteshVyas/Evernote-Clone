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
  selectNote=(note,index)=> this.setState({selectedNoteIndex:index,selectedNote:note});

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
}

export default App;
