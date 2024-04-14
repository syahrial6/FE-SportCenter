import WithAction from "../components/Navbar";
import {
  Box,

  Text,
  Center,
  Spinner,
  Flex,

  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../Context/Context";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
const BuatTim = () => {
  const { isLoggedIn, data } = useContext(MyContext);
  const [namaTim, setNamatim] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (data == null) {
    return (
      <Flex
        width="100vw"
        height="100vh"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }
// menangkap inputan file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const buatTim = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("namaTim", namaTim);
    formData.append("userId", data.id);
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/createtim",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Atur tipe konten sebagai form-data
          },
        }
      );
      console.log(response);
      swal({
        title: "Good job!",
        text: `${response.data.msg}`,
        icon: "success",
      });
      navigate(`/profile/${id}`)
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  return (
    <div>
      <Box position={"relative"} zIndex={"10"}>
        <WithAction />
      </Box>
      <Box pt={"12"} height={"300px"} bgColor={"#004c79"} position="relative">
        <Text
          pt={"12"}
          textAlign={"center"}
          fontFamily={"Rubik Variable"}
          fontWeight={"bold"}
          color={"white"}
          fontSize={"4xl"}
        >
          Profil Akun
        </Text>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, 10%)"
          zIndex="5"
          bgColor={"white"}
          w={{ base: "80%", lg: "80%" }}
        >
          <Center pt={"8"}>
            <Box width={"100%"}>
              
                
                <Box shadow={"2xl"}>
                  <Box>
                    <form onSubmit={buatTim}>
                      <FormControl px={"12"} w={"full"} mt="2%">
                        <FormLabel fontWeight={"normal"}>Nama Tim</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setNamatim(e.target.value)}
                        />
                      </FormControl >
                      <FormControl px={"12"} mt="2%">
                        <FormLabel fontWeight={"normal"}>Logo Tim</FormLabel>
                        <Input
                          name="image"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </FormControl> 
                      <Button mb={"6"} bgColor={"brand.utama"} color={"white"} type="submit" ml={"6"} mt={"6"}>
                        Simpan
                      </Button>
                    </form>
                  </Box>
                </Box>
             
            </Box>
          </Center>
        </Box>
      </Box>
    </div>
  );
};

export default BuatTim;
