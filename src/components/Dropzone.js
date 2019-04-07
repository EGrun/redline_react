import React, {Component} from 'react';
import "./dropzone.css";
import Dropzone from 'react-dropzone';
import FilesList from './FilesList';
const converter = require('json-2-csv');

export default class DropZone extends Component {
  handleResponse (response) {
    return response.json();
  }

  constructor() {
    super();
    var uploadedFiles = [
      {
        "FileId":"1",
        "EmployeeName": "1",
        "Topic": "1",
        "Keyword1": "1",
        "Keyword2": "1",
        "Keyword3": "1",
        "Date": "1",
        "Time": "1",
      },
      {
        "FileId":"2",
        "EmployeeName": "2",
        "Topic": "2",
        "Keyword1": "2",
        "Keyword2": "2",
        "Keyword3": "2",
        "Date": "2",
        "Time": "2",
      },
    ];

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
      files: [],
      uploadedFiles: uploadedFiles
    };
  }

  // onDrop = async (files) => {
  //   this.setState({ files })
  //   const convertedFiles = await this.readFiles(this.state.files)
  //   await this.analysisHandler(convertedFiles)
  // };

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
  
      let result = await converter.json2csv( documents , json2csvCallback, {expandArrayObjects: true})
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
      <div>
      <div className="dropzone-container">
        {console.log(this.state.files)}
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
      <div className="filelist-container">
        <FilesList files={this.state.uploadedFiles}/>
      </div>
      </div>
    );
  }
}
