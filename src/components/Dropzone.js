import React, {Component} from 'react';
import "./dropzone.css";
import Dropzone from 'react-dropzone';
import Axios from 'axios';
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
    await this.readFiles(this.state.files)
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
      const analysisHandler = async (csv) => {
        // handle logic to pass files to backend
        console.log('analysisH')
        const res = await Axios.post('', csv)
        console.log(res)

      }
      console.log("im the file you're looking for:")
      let documents = JSON.parse(json)
      console.log(documents)
  
      const json2csvCallback = function (err, csv) {
        if (err) throw err;
        console.log('callback')
        console.log(csv)
        analysisHandler( csv );
      };
  
      await converter.json2csv( documents , json2csvCallback, {expandArrayObjects: true})
    }
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <div className="dropzone-container">
        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps}) => (
            <section className="container">
              <h4 className="upload-header">Upload Chat Log</h4>
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p className='drop-here-txt'>Drop files here</p>
                <p className='or-txt'>or</p>
                <p className='file-select-btn'>Select Files</p>
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