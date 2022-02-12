import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import RouteSite from '../RouteSite';
import { createAuthTokenWithThunk } from '../../store/users';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createAuthTokenWithThunk());
  }, [dispatch])
  return (
    <RouteSite />
  );
}

export default App;


