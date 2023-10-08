import axios from "axios";

const useAuth = () => {
  const signin = async ({email, password}: {email: string, password: string}) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password
      })
    } catch (err) {

    }
  }

  const signup = async () => {}

  return {
    signin,
    signup
  }
}


export default useAuth;