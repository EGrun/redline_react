import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
const converter = require('json-2-csv');
const states = require('./states.json')

export default class DropZone extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  onDrop = async (files) => {
    this.setState({ files })
    const convertedFiles = await this.convertFiles(this.state.files)
    await this.analysisHandler(convertedFiles)
  };

  convertFiles = async (files) => { 
    const json = require(files[0].path)
    const json2csvCallback = function (err, csv) {
      if (err) throw err;
      console.log(csv);
    };

    let result = await converter.json2csv(json, json2csvCallback, {expandArrayObjects: true})
    console.log(result)
    return result
  }

  analysisHandler = (files) => {
    // handle logic to pass files to backend
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <div className="dropzone-container">
        {console.log(this.state.files)}
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
      </div>
    );
  }
}