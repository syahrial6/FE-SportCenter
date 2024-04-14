import {
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Text,
  ModalContent,
  useDisclosure,
  Button,
  ModalFooter,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { API_ENDPOINT } from "../Context/Config";
import swal from "sweetalert";

const ModalEditJamMain = (props) => {
  const { data, fetchData } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jamMulai, setJamMulai] = useState(data.jamMulai);
  const [jamSelesai, setJamSelesai] = useState(data.jamSelesai);
  const [sesi, setSesi] = useState(data.sesi);

  const editJamMain = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_ENDPOINT}/jam/${data.id}`, {
        jamMulai: jamMulai,
        jamSelesai: jamSelesai,
        sesi: sesi,
      });
      fetchData();
      swal("Berhasil", "Data Berhasil Diubah", "success");
      onClose();
    } catch (error) {
      console.log(error.response.data);
      swal("Gagal", "Data Gagal Diubah", "error");
    }
  };
  return (
    <Box>
      <>
        <Button
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          onClick={() => onOpen()}
          bgColor={"brand.second"}
        >
          <FaEdit />
        </Button>
        <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Center>
              <Text fontWeight={"bold"} fontSize={"4xl"}>Edit Jam Main</Text>
            </Center>
            <Center>
              <form onSubmit={editJamMain}>
                <ModalBody>
                  <FormControl mt="2%">
                    <FormLabel fontWeight={"normal"}>Jam Mulai</FormLabel>
                    <Input
                      onChange={(e) => setJamMulai(`${e.target.value}:00`)}
                      id="waktuMulai"
                      type="time"
                      step="any"
                      value={jamMulai}
                    />
                  </FormControl>
                  <FormControl mt="2%">
                    <FormLabel fontWeight={"normal"}>Jam Selesai</FormLabel>
                    <Input
                      onChange={(e) => setJamSelesai(`${e.target.value}:00`)}
                      id="waktuMulai"
                      type="time"
                      value={jamSelesai}
                    />
                  </FormControl>
                  <FormControl mt="2%">
                    <FormLabel fontWeight={"normal"}>Sesi</FormLabel>
                    <Input
                      onChange={(e) => setSesi(e.target.value)}
                      id="waktuMulai"
                      type="text"
                      value={sesi}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    Save
                  </Button>
                </ModalBody>
              </form>
            </Center>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
};

export default ModalEditJamMain;
