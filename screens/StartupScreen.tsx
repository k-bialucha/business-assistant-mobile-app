/**
 * Startup module to check if user's data are saved in local storage, then log in automatically otherwise
 * set in redux didTryLogin to true
 *
 * it useEffect could be in NavContainer but then we see piece of whites screen after logout
 */

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { tryAutoLogin } from '../redux/auth/actions';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryAutoLogin());
  }, [dispatch]);

  return null;
};

export default StartupScreen;
