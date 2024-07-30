import {
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  Text,
  ModalContent,
  Image,
  Input,
  Button,
  ModalFooter,
  useDisclosure,
  Center,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { API_ENDPOINT } from "../Context/Config";
import swal from "sweetalert";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";

const ModalEditTim = (props) => {
  const { tim, fetchData } = props;
  const [namaTim, setNamatim] = useState(tim.namaTim);
  const [logoTim, setLogoTim] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // menangkap inputan file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInBytes = 5 * 1024 * 1024; // Contoh batas ukuran 5MB

    if (!allowedTypes.includes(file.type)) {
      swal({
        title: "Maaf",
        text: `Jenis File Harus Foto`,
        icon: "warning",
      });
      e.target.value = null; // Mengosongkan input file
      if (file.size > maxSizeInBytes) {
        swal({
          title: "Maaf",
          text: `Ukuran Foto Terlalu Besar Max 5MB`,
          icon: "warning",
        });
        e.target.value = null; // Mengosongkan input file

        return;
      }
    }
    setSelectedFile(file);
    setLogoTim(URL.createObjectURL(file));
  };

  const updateTim = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("namaTim", namaTim);
    formData.append("image", selectedFile);

    try {
      const response = await axios.patch(
        `${API_ENDPOINT}/tim/${tim.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Atur tipe konten sebagai form-data
          },
        }
      );
      swal({
        title: "Good job!",
        text: `${response.data.msg}`,
        icon: "success",
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box fontFamily={"Rubik Variable"}>
      <>
        <Button
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          onClick={() => onOpen()}
          display={"block"}
          bgColor={"yellow.400"}
          color={"white"}
        >
          <FaEdit fill="white"/>
        </Button>
        <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Center>
              <Text my={"4"} fontWeight={"bold"} fontSize={"4xl"}>
                Edit Tim
              </Text>
            </Center>
            <Center>
              <ModalBody>
                <form onSubmit={updateTim}>
                  <Center>
                    <Image
                      src={logoTim ? logoTim : tim.url}
                      borderRadius="full"
                      boxSize="150px"
                    />
                  </Center>
                  <FormControl>
                    <FormLabel>Foto</FormLabel>

                    <Input type="file" onChange={handleFileChange} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nama Tim</FormLabel>
                    <Input
                      value={namaTim}
                      onChange={(e) => setNamatim(e.target.value)}
                    />
                  </FormControl>
                  <Button onClick={() => onClose()} mt={"4"} type="submit" color={"white"} bg={"brand.utama"}>
                    Submit
                  </Button>
                </form>
              </ModalBody>
            </Center>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
};

ModalEditTim.propTypes = {
  tim: PropTypes.object.isRequired,
};

export default ModalEditTim;
