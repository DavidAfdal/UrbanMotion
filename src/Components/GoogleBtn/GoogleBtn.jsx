

import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../utils/authUtils';
import axiosInstance from '../../utils/axios';

const GoogleBtn = () =>  {
    const navigate = useNavigate();
    const loginWithGoogle = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (result) => {
          console.log(result)
          const respon = await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login/google`, {code: result.code})
          console.log(respon.data.data)
          localStorage.setItem("isLoggedIn", true); // Store login status
          localStorage.setItem("role", respon.data.data.user.role); // Store user role
          saveToken(respon.data.data.token);
          navigate('/');
        }

});
  return (
    <button className="google-login" onClick={() => loginWithGoogle()} style={{backgroundColor: "white", border: "1px solid #ccc",}}>
        <img alt="Google Logo" height="20" src="/assets/images/google.png" width="20" />
        <span style={{color: "black"}}>Masuk dengan Google</span>
    </button>
  )
}

export default GoogleBtn