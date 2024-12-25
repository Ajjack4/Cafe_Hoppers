import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { UPDATE_ALERT } from '../../slice/slice';
import { useDispatch } from 'react-redux';
import { RootState } from '../../slice/stateStore';
import { useSelector } from 'react-redux';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

const GoogleOneTapLogin = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleResponse = (response: any) => {
    console.log(response);
    setDisabled(false);
  };

  const handleGoogleLogin = () => {
    setDisabled(true);
    // Make API call to Google OAuth
    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          throw new Error('Try to clear the cookies or try again later!');
        }
        if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
          setDisabled(false);
        }
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      dispatch(
        UPDATE_ALERT({
          ...user,
          alert: {
            open: true,
            severity: 'error',
            message: e.message,
          },
        })
      );
      console.log(e);
    }
  };
console.log()
  return (
    <Button
      variant="outlined"
      startIcon={<Google />}
      disabled={disabled}
      onClick={handleGoogleLogin}
    >
      Login with Google
    </Button>
  );
};

export default GoogleOneTapLogin;
