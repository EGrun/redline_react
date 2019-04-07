import React, {Component} from 'react';
import "./dropzone.css";
import Dropzone from 'react-dropzone';
import FilesList from './FilesList';
import Axios from 'axios';
import * as moment from 'moment';
const converter = require('json-2-csv');

export default class DropZone extends Component {
  handleResponse (response) {
    return response.json();
  }

  constructor() {
    super();
    var uploadedFiles = [
    ];

    this.state = {
      files: [],
      uploadedFiles: uploadedFiles
    };

    setImmediate(() => {
      this.getFileList();
    })
  }

  componentDidMount  = async ()=>{
      const response = await Axios.get('doc/upload')
      console.log(response.data)
  }

  onDrop = async (files) => {
    this.setState({files: files, uploadedFiles: this.state.uploadedFiles});
    await this.readFiles(this.state.files)
  };

  escapeString = function (val) {
    val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
      switch (s) {
        case "\0":
          return "\\0";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "\b":
          return "\\b";
        case "\t":
          return "\\t";
        case "\x1a":
          return "\\Z";
        case "'":
          return "''";
        case '"':
          return '""';
        default:
          return "\\" + s;
      }
    });
  
    return val;
  };

  getFileList = (searchTerm) => {
    var query = "";
    
    if (searchTerm && searchTerm.length > 0) {
      searchTerm = this.escapeString(searchTerm);
      query = "SELECT * FROM dcterms:qualifiedResource WHERE dc:title LIKE '" + searchTerm + "%'" + 
      " OR dc:description LIKE '" + searchTerm + "%'" +
      " OR dc:publisher LIKE '" + searchTerm + "%'" +
      " OR dc:contributor LIKE '" + searchTerm + "%'";
    }
    else{
      query = 'SELECT * FROM dcterms:qualifiedResource';
    }
    const requestOptions = {
      method: 'POST',
      headers: { 
        'accept': 'application/json',
        'Content-Type' : 'application/json',
        'Authorization': 'Basic YWRtaW46eThUZGhwVlo1YUdv',
        'X-ID-TENANT-NAME': 'nyc097',
      },
      body: JSON.stringify({
        "query": {
          "statement": query,
          "skipCount": 0,
          "maxItems": 50
        }})
      }

    fetch(`https://yuuvis.io/api/dms/objects/search`, requestOptions)
      .then(this.handleResponse).then(data => {
        console.log("search results:", data);

        var files = data.objects ? data.objects.map(f => {
          return {
            "FileId":f.properties["enaio:objectId"].value,
            "EmployeeName": f.properties["dc:creator"] ? f.properties["dc:creator"].value : "Richard Heins",
            "Topic": f.properties["dc:title"] ? f.properties["dc:title"].value : "",
            "Keyword1": f.properties["dc:description"] ? f.properties["dc:description"].value : "",
            "Keyword2": f.properties["dc:publisher"] ? f.properties["dc:publisher"].value : "",
            "Keyword3": f.properties["dc:contributor"] ? f.properties["dc:contributor"].value : "",
            "Date": f.properties["enaio:creationDate"] ? moment(f.properties["enaio:creationDate"].value).format("ll") : "",
            "Time": f.properties["enaio:creationDate"] ? moment(f.properties["enaio:creationDate"].value).format("LTS") : "",
          }
        }) : [];
        this.setState({files : this.state.files, uploadedFiles : files});
      });
  }

  handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.getFileList(e.target.value);
    }
  }

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
    
        console.log(csv)
        const res = await Axios.post('doc/nlptest', csv, {headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log("response from django:", res)

      //this.setState({files: this.state.files.concat(files)});     

      var content = {
        "objects": [{
        "properties": {
        "enaio:objectTypeId": {
        "value": "dcterms:qualifiedResource"
        },
        "dc:creator": {
          "value": "Anne Hathaway"
        },
        "dc:title": {
          "value": "redline-hackathon"
        },
        "dc:description": {
          "value": "dataset"
        },
        "dc:publisher": {
          "value": "python"
        },
        "dc:contributor": {
          "value": "dcterms"
        }
        },
        "contentStreams": [{
        "cid": "cid_63apple"
        }]
        }]
      };

      var blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json"});
      var formData  = new FormData();
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
        .then(this.handleResponse).then(data => {
          console.log("return from yuuvis:", data);
          setTimeout(() => {
            this.getFileList();
          }, 500)
        });
    };

    let documents = JSON.parse(json)
    //   console.log(documents)
  
      const json2csvCallback = function (err, csv) {
        if (err) throw err;
        // console.log('callback')
        // console.log(csv)
        analysisHandler( csv );
      };
  
      await converter.json2csv( documents , json2csvCallback, {expandArrayObjects: true})
    }
  }

  render() {
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
            </section>
          )}
        </Dropzone>
        <div>
          <input className="search-field-container" placeholder='Search' type="text" onKeyPress={this.handleSearchKeyPress} />
          <label className='file-select-btn'>Search</label>
        </div>
          <br/>
        <div className="filelist-container">
          <FilesList files={this.state.uploadedFiles}/>
        </div>
      </div>
    )
  }
}
