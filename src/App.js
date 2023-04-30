import { useEffect, useState } from "react";
import Auth from "./components/auth";
import { db } from "./firebase-config/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {

  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
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
    getMovieList();
  }, [])


  return (
    <div className="App">
      <h1 className="title">Firebase React</h1>
      <Auth />
      <div>
        {movieList.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
            <p>Release Date: {movie.releaseDate}</p>
            {movie.award && <p>Award {movie.award}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
