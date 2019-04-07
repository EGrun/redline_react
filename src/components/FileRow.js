import React from "react";

function FileRow(props) {

  return <tr>
    <td>{props.file.EmployeeName}</td>
    <td>{props.file.Topic}</td>
    <td>{props.file.Keyword1}</td>
    <td>{props.file.Date}</td>
    <td>{props.file.Time}</td>
    </tr>;
}

export default FileRow;