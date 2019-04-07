import React from 'react';
import FileRow from './FileRow';

function FilesList(props) {
  const rows = props.files;
  const columns = [
    {name: 'Employee', key: 'EmployeeName'},
    {name: 'Topic', key: 'Topic'},
    {name: 'Keyword', key: 'Keyword1'},
    {name: 'Date', key: 'Date'},
    {name: 'Time', key: 'Time'}
  ];
  return (
    <div className="files-container">
      {console.log(props.files)}
      <table width="100%">
        <tr><th>Employee</th><th>Topic</th><th>Keyword</th><th>Date</th><th>Time</th></tr>
        {props.files && props.files.map(f => <FileRow key={f.FileId} file={f} />)}
      </table>
    </div>
  );
}

export default FilesList;