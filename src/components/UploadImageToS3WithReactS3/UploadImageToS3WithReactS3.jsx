import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';


const S3_BUCKET ='floradex';
const REGION ='us-east-2';
const ACCESS_KEY = process.env.REACT_APP_AWSAccessKeyId;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWSSecretKey;


const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const UploadImageToS3WithReactS3 = ({setOpen, id, sname, cname, endpoint}) => {

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    React.useEffect(() => {
        return () => {
        clearTimeout(timer.current);
        };
    }, []);

    const dispatch = useDispatch();

    const history = useHistory();

    const user = useSelector( store => store.user)

    const [selectedFile, setSelectedFile] = useState(null);

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

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
        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }
        uploadFile(file, config)
            .then( data => {
                setSuccess(true);
                setLoading(false);
                console.log( data );
                swal({
                    title: 'Successful Upload!',
                    icon: 'success',
                }).then( _ => {
                        setOpen(false);
                        setImagePreviewUrl(null)
                        setSelectedFile(null)
                        const objectToSend = {
                            image: data.location,
                            cname: cname,
                            sname: sname,
                            endpoint: id,
                            id: user.id

                        }
                        dispatch({ type: 'SET_MY_HUNTS_FLORA_IMAGE', payload: objectToSend})
                }).catch( err => {
                    console.log( err );
                })
            }).catch( err => {
                console.log( err );
            })
    }

    return (
        <>
            <Input type="file" onChange={handleFileInput}/>
            {selectedFile !== null && <img src={imagePreviewUrl}/>}
            <div className={classes.root}>
                
                <div className={classes.wrapper}>
                    <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}
                    onClick={() => handleUpload(selectedFile)}
                    >
                    {success ? <CheckIcon /> : <SaveIcon />}
                    </Fab>
                    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                </div>
            </div>
        </>
    )
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


// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { green } from '@material-ui/core/colors';
// import Button from '@material-ui/core/Button';
// import Fab from '@material-ui/core/Fab';
// import CheckIcon from '@material-ui/icons/Check';
// import SaveIcon from '@material-ui/icons/Save';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   wrapper: {
//     margin: theme.spacing(1),
//     position: 'relative',
//   },
//   buttonSuccess: {
//     backgroundColor: green[500],
//     '&:hover': {
//       backgroundColor: green[700],
//     },
//   },
//   fabProgress: {
//     color: green[500],
//     position: 'absolute',
//     top: -6,
//     left: -6,
//     zIndex: 1,
//   },
//   buttonProgress: {
//     color: green[500],
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     marginTop: -12,
//     marginLeft: -12,
//   },
// }));

// export default function CircularIntegration() {
//   const classes = useStyles();
//   const [loading, setLoading] = React.useState(false);
//   const [success, setSuccess] = React.useState(false);
//   const timer = React.useRef();

//   const buttonClassname = clsx({
//     [classes.buttonSuccess]: success,
//   });

//   React.useEffect(() => {
//     return () => {
//       clearTimeout(timer.current);
//     };
//   }, []);

//   const handleButtonClick = () => {
//     if (!loading) {
//       setSuccess(false);
//       setLoading(true);
//       timer.current = window.setTimeout(() => {
//         setSuccess(true);
//         setLoading(false);
//       }, 2000);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <div className={classes.wrapper}>
//         <Fab
//           aria-label="save"
//           color="primary"
//           className={buttonClassname}
//           onClick={handleButtonClick}
//         >
//           {success ? <CheckIcon /> : <SaveIcon />}
//         </Fab>
//         {loading && <CircularProgress size={68} className={classes.fabProgress} />}
//       </div>
//     </div>
//   );
// }

// <div className={classes.wrapper}>
//         <Button
//           variant="contained"
//           color="primary"
//           className={buttonClassname}
//           disabled={loading}
//           onClick={handleButtonClick}
//         >
//           Accept terms
//         </Button>
//         {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
//       </div>