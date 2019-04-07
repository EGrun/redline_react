import React from 'react';
import FileRow from './FileRow';
import './fileslist.css'

function FilesList(props) {
  return (
    <div className="files-container">
      {console.log(props.files)}
      {props.files && props.files.map(f => <FileRow key={f.FileId} file={f} />)}
    </div>
  );
}

export default FilesList;