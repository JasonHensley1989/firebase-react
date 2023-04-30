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
      console.log(data);
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
    </div>
  );
}

export default App;
