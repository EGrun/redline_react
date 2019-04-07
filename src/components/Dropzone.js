import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import { ENETUNREACH } from 'constants';

export default class DropZone extends Component {
  handleResponse (response) {
    return response.json();
  }

  constructor() {
    super();
    this.onDrop = (files) => {

      this.setState({files: this.state.files.concat(files)});     

      var formData  = new FormData();

      var content = {
        "objects": [{
        "properties": {
        "enaio:objectTypeId": {
        "value": "dcterms:qualifiedResource"
        },
        "dc:title": {
          "value": "-placeholder1-"
        },
        "dc:subject": {
          "value": "-placeholder2-"
        }
        },
        "contentStreams": [{
        "cid": "cid_63apple"
        }]
        }]
      };

      var blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json"});
      formData.append("data", blob);
      formData.append("cid_63apple", this.state.files[0]);

      const requestOptions = {
        method: 'POST',
        headers: { 
          'accept': 'application/json',
          'Authorization': 'Basic YWRtaW46eThUZGhwVlo1YUdv',
          'X-ID-TENANT-NAME': 'nyc097',
        },
        body: formData
    };
     
    return fetch(`https://yuuvis.io/api/dms/objects`, requestOptions)
        .then(this.handleResponse).then(data => console.log(data));
    };
    this.state = {
      files: []
    };
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}