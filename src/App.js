import { useEffect, useState } from "react";
import Auth from "./components/auth";
import AddFilm from "./components/AddFilm";
import DeleteFilm from "./components/DeleteFilm";
import UpdateAward from "./components/UpdateAward";
import { auth, db } from "./firebase-config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { moviesCollectionRef } from "./firebase-config/firebase";
import RandomImage from "./components/RandomImage";

function App() {

  const [movieList, setMovieList] = useState([]);
  const [updateAward, setUpdateAward] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false);

  const getMovieList = async() => {
    try {
    const data = await getDocs(moviesCollectionRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,
    }));
    setMovieList(filteredData);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    getMovieList();
  }, [])

  return (
    <div className="App">
      <RandomImage className="random-image" />
      <div className="layeredBackground">
      {!loggedIn && <Auth />}
      {loggedIn &&
        <>
          <div className="signOutButton">
             <button className="signOut" onClick={() => auth.signOut()}>Sign Out</button>
          </div>
          <AddFilm moviesCollectionRef={moviesCollectionRef} getMovieList={getMovieList}/>
          <div>
            {movieList.map((movie) => (
              <div className="movieCard">
                <h1>{movie.title}</h1>
                <p>Release Date: {movie.releaseDate}</p>
                {movie.award && <p>AWARD {movie.award}</p>}
                <button onClick={() => DeleteFilm(movie.id)}>Delete Film</button>
                <div className="updateAward">
                  <input type='checkbox' placeholder="Received Award" onChange={(e) => setUpdateAward(e.target.checked ? "Award Received" : "")}/>
                  <button onClick={() => UpdateAward(movie.id, !movie.award)}>Update Award Status</button>
                </div>
              </div>
            ))}
          </div>
        </>
      }
      </div>
   
    </div>
  );
}

export default App;
