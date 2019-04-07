import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
const converter = require('json-2-csv');

export default class DropZone extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  onDrop = async (files) => {
    this.setState({ files })
    const convertedFiles = await this.readFiles(this.state.files)
    await this.analysisHandler(convertedFiles)
  };

  readFiles = async (files) => {
    let file = files[0]

    let reader = new FileReader()
    reader.onload = await function(e) {
      let json = reader.result;
      convertFiles(json)
    }
    
    await reader.readAsText(file)

    const convertFiles = async (json) => { 
      console.log("im the file you're looking for:")
      let documents = JSON.parse(json)
      console.log(documents)
  
      const json2csvCallback = function (err, csv) {
        if (err) throw err;
        console.log('callback')
        console.log(csv);
      };
  
      let result = await converter.json2csv( documents , json2csvCallback)
      return result
    }
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