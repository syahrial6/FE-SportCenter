import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import swal from "sweetalert";
export const MyContext = createContext();

export const Parent = (props) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const toast = useToast();

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
     
      setIsLoggedIn(true);
      const decode = jwtDecode(response.data.token);
      
     
      setData(response.data.user);
      localStorage.setItem("token", response.data.token);
      
      navigasiLogin(data)
      ;
      
    
      // Tandai bahwa pengguna sudah login
      return { status: true, msg: "Berhasil Login"}
    } catch (error) {
      return { status: false, msg: error.response.data.msg}
    }
  };

  const navigasiLogin = (data) => {
    if (data.isVerified) {
      if (data.role === "admin") {
        navigate("/dashboard");
        toast({
          title: "Anda Berhasil Login",
          description: `Selamat Datang ${data.role} `,
          status: "success",
          duration: 2500,
          variant: "subtle",
          isClosable: true,
        });
      } else if (data.role === "wasit") {
        navigate("/dashboard/reservasi");
      }
      else if (data.role === "fotographer"){
        navigate("/dashboard/reservasi")
      }
      else {
        if (data.tims.length === 0) {
          navigate(`/profile/${data.id}`);
        } else {
          navigate("/sewa")
        }
       
      }
    } else {
      navigate(`/verifikasi/${data.email}`);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
    setData(null);
    swal("Berhasil", "Anda Berhasil Logout", "success");
  };
  const cek_jwt = async () => {
    if (currentTimestamp < data.iat || currentTimestamp > data.exp) {
      swal("Maaf", "Waktu Anda Berakhir, Silahkan Login Ulang", "warning");
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setData(jwtDecode(token));
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        data,
        setData,
        login,
        setIsLoggedIn,
        isLoggedIn,
        logout,
        cek_jwt,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};
