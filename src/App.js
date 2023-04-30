import { useEffect, useState } from "react";
import Auth from "./components/auth";
import AddFilm from "./components/AddFilm";
import { auth, db } from "./firebase-config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { moviesCollectionRef } from "./firebase-config/firebase";

function App() {

  const [movieList, setMovieList] = useState([]);

  // const moviesCollectionRef = collection(db, "movies");
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
    getMovieList();
  }, [])


  return (
    <div className="App">
      
      {/* {auth.signIn && }*/}
      <Auth /> 
      <AddFilm moviesCollectionRef={moviesCollectionRef} getMovieList={getMovieList}/>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
            <p>Release Date: {movie.releaseDate}</p>
            {movie.award && <p>AWARD {movie.award}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
