import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

export default class DropZone extends Component {
  handleResponse (response) {
    return response.json();
  }

  constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({files});

      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': 'Basic YWRtaW46eThUZGhwVlo1YUdv',
          'X-ID-TENANT-NAME': 'nyc097',
        },
        body: '{"query":{"statement":"SELECT * FROM enaio:object","skipCount":0,"maxItems":50}}'
    };

      return fetch(`https://yuuvis.io/api/dms/objects/search`, requestOptions)
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