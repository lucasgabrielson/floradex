import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


const S3_BUCKET ='floradex';
const REGION ='us-east-2';
const ACCESS_KEY ='AKIA5DNS5D5JVI6LTMWT';
const SECRET_ACCESS_KEY ='';


const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const UploadImageToS3WithReactS3 = ({id}) => {

    const dispatch = useDispatch();

    const history = useHistory();

    const [selectedFile, setSelectedFile] = useState(null);

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const [open, setOpen] = useState(true);

    const handleFileInput = event => {
        setSelectedFile(event.target.files[0]);
        // dispatch file to database so that I can call it.
        let reader = new FileReader();

        reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(event.target.files[0])

    }

    const handleUpload = async (file) => {
        if(open) alert('Loading...');
        uploadFile(file, config)
            .then( data => {
                setOpen(false)
                console.log( data );
                swal({
                    title: 'Successful Upload!',
                    icon: 'success',
                }).then( _ => {
                        setImagePreviewUrl(null)
                        // setSelectedFile(null)
                // history.push(`/my-hunts-item/${id}`, {params: id})
                // dispatch({ type: 'SET_FLORA_IMAGE', payload: data.location})
                }).catch( err => {
                    console.log( err );
                })
            }).catch( err => {
                console.log( err );
            })
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        {selectedFile !== null && <img src={imagePreviewUrl}/>}
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;


// import React, { Component } from 'react';
// import './App.css';
 
// class App extends Component {
//   state =  {
//     selectedFile: null,
//     imagePreviewUrl: null
//   };
 
//   fileChangedHandler = event => {
//     this.setState({
//       selectedFile: event.target.files[0]
//     })
 
//     let reader = new FileReader();
     
//     reader.onloadend = () => {
//       this.setState({
//         imagePreviewUrl: reader.result
//       });
//     }
 
//     reader.readAsDataURL(event.target.files[0])
 
//   }
 
//   submit = () => {
 
//     var fd = new FormData();
 
//     fd.append('file', this.state.selectedFile);
 
//     var request = new XMLHttpRequest();
 
//     request.onreadystatechange = function() {
//       if (this.readyState === 4 && this.status === 200) {
//         alert('Uploaded!');
//       }
//     };
//     request.open("POST", "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload", true);
//     request.send(fd);
//   }
 
//   render() {
 
//     let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
//     if (this.state.imagePreviewUrl) {
//       $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
//     }
 
//     return (
//       <div className="App">
//          <input type="file" name="avatar" onChange={this.fileChangedHandler} />
//          <button type="button" onClick={this.submit} > Upload </button>
//          { $imagePreview }
//       </div>
//     );
//   }
// }
 
// export default App;