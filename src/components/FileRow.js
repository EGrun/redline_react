import React from "react";

function FileRow(props) {
  return <div>
    <span>{props.file.EmployeeName}</span>
    <span>{props.file.Topic}</span>
    <span>{props.file.Keyword}</span>
    <span>{props.file.Date}</span>
    <span>{props.file.Time}</span>
    </div>;
}

export default FileRow;