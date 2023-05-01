import React from 'react';
import { ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react';
import { db, storage } from '../firebase-config/firebase';

const FileUpload = () => {

  const [fileUpload, setFileUpload] = useState(null);

  const uploadFile = async () => {
    console.log("Click");
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      window.location.reload()
    } catch(err) {
      console.error(err)
    } 
  }

  return (
    <div className="fileUpload">
        <input className="fileInput" type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
    </div>
  )
}

export default FileUpload

