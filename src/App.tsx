import "./App.css";
import { db, auth, storage } from "./firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

import { Auth } from "./components/auth";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [releaseDate, setReleasedData] = useState("");
  const [receivedOscar, setReceivedOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const [file, setFile] = useState<any>(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMovies = async () => {
    const data = await getDocs(moviesCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMovies(filteredData);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleSubmitMovie = async () => {
    const payload = {
      title,
      releaseDate,
      receivedOscar,
      userId: auth.currentUser?.uid,
      displayName: auth.currentUser?.displayName,
    };
    await addDoc(moviesCollectionRef, payload);
    getMovies();
  };

  const deleteMovie = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovies();
  };

  const handleUpdateTitle = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovies();
  };

  const handleUploadFile = async () => {
    if (!file) return;
    const fileFolderRef = ref(storage, `allimages/${file.name}`);
    try {
      await uploadBytes(fileFolderRef, file);
    } catch (error) {
      console.error("error uploading file", error);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <h3>Movies</h3>
        {movies.map((movie: any) => {
          return (
            <div
              key={movie.id}
              style={{
                margin: "1rem",
                padding: "1rem",
                background: "lightgrey",
              }}
            >
              <div
                style={{
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  border: "1px solid black",
                  margin: "1rem",
                }}
              >
                <div>{movie.title}</div>
                <div>{movie.releaseDate}</div>
                <div>Received Oscar: {String(movie.receivedOscar)}</div>
                <div>user: {movie.displayName}</div>
                <button onClick={() => deleteMovie(movie.id)}>
                  Delete Movie
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  placeholder="update title"
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button onClick={() => handleUpdateTitle(movie.id)}>
                  Update Title
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2>Add movie to list</h2>
        <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        <input
          type="number"
          placeholder="year"
          onChange={(e) => setReleasedData(e.target.value)}
        />
        <input
          type="checkbox"
          placeholder="receivedsocar"
          onChange={(e) => setReceivedOscar(e.target.checked)}
        />
        <label>got Oscar?</label>

        <button onClick={handleSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        <h3>upload image</h3>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        <button onClick={handleUploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
