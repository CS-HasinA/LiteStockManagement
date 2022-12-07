import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const token_key = "token";

export default function useAuth() {
  let [searchParams] = useSearchParams();

  const getToken = () => {
    const Token = searchParams.get("Token");
    if (!Token) {
      let token = localStorage.getItem(token_key);
      if (!token) {
        window.location.assign(process.env.REACT_APP_AUTH_SERVER_URL!);
      } else {
        const decoded = jwt_decode(token) as { exp: number };
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        const currentDate = new Date();
        if (date <= currentDate) {
          window.location.assign(process.env.REACT_APP_AUTH_SERVER_URL!);
        }
        return token;
      }
    } else {
      localStorage.setItem(token_key, Token as string);
      return Token;
    }
  };

  const removeToken = () => {
    localStorage.removeItem(token_key);
    window.location.assign(process.env.REACT_APP_AUTH_SERVER_URL!);
  };

  getToken();

  return {
    getToken,
    removeToken,
  };
}
