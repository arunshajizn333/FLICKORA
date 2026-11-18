import { onAuthStateChanged } from "firebase/auth";
import './App.css';
import Body from './components/Body';
import { useEffect } from "react";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }))
      } else {
        dispatch(removeUser())
      }
    });
    return () => unsubscribe();
  }, [])

  return (
    <Body />
  );
}


export default App;
