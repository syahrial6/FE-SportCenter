import { useEffect, useState } from "react";
import {
  Box,
  Link,
  VStack,
  FormLabel,
  FormControl,
  Button,
  Text,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import axios from "axios";

import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const Verifikasi = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    kirim_otp();
  }, []);

  const kirim_otp = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/send_otp", {
        id: id,
      });
      console.log(response.data.message);
      swal("Good job!", `${response.data.message}`, "success");
      setLoading(false);
    } catch (error) {
      swal("Failed", `${error.response.message}`, "error");
      console.log(error.response);
      setLoading(false);
    }
  };

  const verifikasi = async () => {
    if (otp.length < 6) {
      swal("Failed!", `OTP harus 6 digit`, "error");
      return;
    }
    try {
      setLoading1(true);
      const response = await axios.post("http://localhost:5000/verifikasi", {
        id: id,
        otp: otp,
      });
      swal("Good job!", `${response.data.message}`, "success");
      console.log(response.data);
      setLoading1(false);
      navigate(`/login`);
    } catch (error) {
      setLoading1(false);
      console.log(error.response.data.message);
      swal("Failed!", `${error.response.data.message}`, "error");
    }
  };

  return loading ? (
    <Box>
      <Loading />
      <Text textAlign={"center"} fontSize={"3xl"}>
        Sedang Mengirim OTP
      </Text>
    </Box>
  ) : (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <VStack spacing={4} borderWidth="1px" borderRadius="lg" p={6}>
        <Text fontSize="xl" fontWeight="bold">
          Verifikasi OTP
        </Text>
        <FormControl>
          <FormLabel textAlign={"center"}>Masukkan OTP Anda</FormLabel>
          <HStack
            display={"flex"}
            m={"auto"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <PinInput otp value={otp} onChange={setOtp}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </FormControl>
        <Button
          onClick={() => verifikasi()}
          bgColor={"brand.utama"}
          color={"white"}
        >
          Verifikasi
        </Button>
        {loading1 ? <Loading /> : ""}
        <Text fontWeight={"bold"}>
          Kami Telah Mengirimkan Kode OTP ke Email Anda
        </Text>
        <Link onClick={() => kirim_otp()} color={"blue.500"}>
          Kirim OTP Lagi
        </Link>
      </VStack>
    </Box>
  );
};
export default Verifikasi;
