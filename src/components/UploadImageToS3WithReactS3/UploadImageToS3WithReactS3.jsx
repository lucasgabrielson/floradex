import React , {useState} from 'react';
import { uploadFile } from 'react-s3';

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

const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = event => {
        setSelectedFile(event.target.files[0]);
        // dispatch file to database so that I can call it.
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;