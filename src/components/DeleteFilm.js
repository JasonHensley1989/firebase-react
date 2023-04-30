import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config/firebase';

const DeleteFilm = async(id) => {
    const movieDoc = doc(db, "movies", id )
    await deleteDoc(movieDoc);
    window.location.reload();
}

export default DeleteFilm