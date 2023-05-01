import { useEffect, useState } from "react";
import Auth from "./components/auth";
import AddFilm from "./components/AddFilm";
import DeleteFilm from "./components/DeleteFilm";
import UpdateAward from "./components/UpdateAward";
import { auth } from "./firebase-config/firebase";
import { getDocs } from "firebase/firestore";
import { moviesCollectionRef } from "./firebase-config/firebase";
import RandomImage from "./components/RandomImage";
import FileUpload from "./components/FileUpload";


function App() {

  const [movieList, setMovieList] = useState([]);
  const [updateAward, setUpdateAward] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false);
  // const [fileUpload, setFileUpload] = useState(null)

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

  // const uploadFile = async () => {
  //   if(!fileUpload) return;
  //   const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
  //   try {
  //     await uploadBytes(filesFolderRef, fileUpload);
  //     window.location.reload()
  //   } catch(err) {
  //     console.error(err)
  //   }
    
  // }

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
      <h1 className="title">Movie Tracker</h1>
      <div className="layeredBackground">
        {!loggedIn && <Auth />}
        {loggedIn &&
          <>
            {/* <div className="signOutButton">
               <button className="signOut" onClick={() => auth.signOut()}>Sign Out</button>
            </div> */}
            <AddFilm moviesCollectionRef={moviesCollectionRef} getMovieList={getMovieList}/>
            <div>
              {movieList.map((movie) => (
                <div className="movieCard">
                  <h1>{movie.title}</h1>
                  <p>Release Date: {movie.releaseDate}</p>
                  {movie.award && <p>AWARD {movie.award}</p>}
                  <button onClick={() => DeleteFilm(movie.id)}>Delete Film</button>
                  <div className="updateAward">
                    <input className="checkbox" type='checkbox' placeholder="Received Award" onChange={(e) => setUpdateAward(e.target.checked ? "Award Received" : "")}/>
                    <button onClick={() => UpdateAward(movie.id, !movie.award)}>Update Award Status</button>
                  </div>
                </div>
              ))}
            </div>
            <FileUpload />
          </>
        }
      </div>
    </div>
  );
}

export default App;