import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { ref,uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);
  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload state 
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // fn() to receive or read our database
    const getMovieList = async () => {
      // READ THE DATA
      //SET THE MOVIE LIST
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
        // console.log(filteredData);  
        // console.log(data);  
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, [moviesCollectionRef, onSubmitMovie]);

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  }

  const uploadFile = async() => {
    if (!fileUpload) return;
    const filesFolderRef=ref(storage,`projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef,fileUpload);
    }catch(err){
      console.error(err);
    }
  };
  return (
    <div className="App">
      <Auth />
      <div className='mt-3'>
        <div className="col-lg-6 m-auto">
          <div>
            <div class="mb-3">
              <input className="form-control"
                onChange={(e) => setNewMovieTitle(e.target.value)}
                placeholder='Movie title...' />
            </div>
            <div class="mb-3">
              <input placeholder='Release Date...'
                onChange={(e) => setNewReleaseDate(Number(e.target.value))}
                type='number' className="form-control" />
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox"
                checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)}
                className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" for="exampleCheck1">Receive an Oscar</label>
            </div>
            <button className="btn btn-primary"
              onClick={onSubmitMovie}
            >Submit Movie</button>
          </div>
        </div>
        {movieList.map((movie) => (
          <div>
            <h4 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h4>
            <p>Date:{movie.releaseDate}</p>
            <div class="row justify-content-around">
              <div class="col-4">
                <button  className='btn btn-danger' onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
              </div>
              <div class="col-4">
                <div class="input-group mb-3">
                  <input
                    className='form-control'
                    placeholder='new title...'
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <button
                    className='btn btn-warning'
                    onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
                </div>
               
                    {/* <input
                      className='form-control'
                      placeholder='new title...'
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    /> */}
              
                
                   
                
              
              </div>
            </div>
            {/* <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button> */}
            {/* <input
              placeholder='new title...'
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button> */}
          </div>
        ))}
      </div>
      <div className='container w-50'>
        <div className="input-group">
          <input 
          className='form-control w-50'
          type="file"
            onChange={(e) => setFileUpload(e.target.files[0])} />
          <button className='btn btn-secondary' onClick={uploadFile}>Upload File</button>
        </div>
        {/* <input type="file"
          onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button> */}
      </div>
    </div>
  );
}
export default App;
