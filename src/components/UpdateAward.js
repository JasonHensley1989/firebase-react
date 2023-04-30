// import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase-config/firebase';

const UpdateAward = async(id, award) => {
    const movieDoc = doc(db, "movies", id )
    await updateDoc(movieDoc, { award });
    window.location.reload();
}

export default UpdateAward