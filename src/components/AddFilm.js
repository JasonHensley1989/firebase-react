import React from 'react';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { auth } from '../firebase-config/firebase';

const AddFilm = ({ moviesCollectionRef, getMovieList }) => {

  const [newTitle, setNewTitle] = useState("");
  const [filmRelease, setFilmRelease] = useState(0);
  const [hasAward, setHasAward] = useState(false);

  const onSubmitFilm = async () => {
    try{
        await addDoc(moviesCollectionRef, {
            title: newTitle,
            releaseDate: filmRelease,
            award: hasAward,
            userId: auth?.currentUser.uid,
        });
        getMovieList();
    } catch(err) {
        console.error(err)
    }
  }

  return (
    <div className='form'>
        <form action="">
            <div className="signOutButton">
            <button className="signOut" onClick={() => auth.signOut()}>Sign Out</button>
            </div>
            <input type="text" className='filmInput' required placeholder='Film Title' onChange={(e) => setNewTitle(e.target.value)}/>
            <input type="number" className='filmInput' required placeholder='Film Release Year' onChange={(e) => setFilmRelease(Number(e.target.value))}/>
            <label>Received Award</label>
            <input type="checkbox" placeholder='Received Award' checked={hasAward} onChange={(e) => setHasAward(e.target.checked)} />
            <button type="button" onClick={onSubmitFilm}>Add To Film List</button>
        </form>
    </div>
  )
}

export default AddFilm;