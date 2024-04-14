import {
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  ModalHeader,
  ModalContent,
  useDisclosure,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { API_ENDPOINT } from "../Context/Config";
import swal from "sweetalert";

const ModalTambahJamMain = (props) => {
    const {fetchData}   = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jamMulai, setJamMulai] = useState("");
    const [jamSelesai, setJamSelesai] = useState("");
    const [sesi, setSesi] = useState("");

    const tambahJamMain = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_ENDPOINT}/jam`, {
                jamMulai: jamMulai,
                jamSelesai: jamSelesai,
                sesi: sesi
            })
            swal("Berhasil", "Data Berhasil Ditambahkan", "success");
            fetchData()
            onClose()
        } catch (error) {
            console.log(error.response.data);
            swal("Gagal", "Data Gagal Ditambahkan", "error");
        }
    }
   return (
    <Box mb={"4"}>
      <Button onClick={() => onOpen()} bgColor={"brand.utama"} color={"white"}>
        <FaPlus />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={tambahJamMain}>
            <ModalHeader>Tambah Jam Main</ModalHeader>

            <ModalBody pb={6}>
              <FormControl mt="2%">
                <FormLabel fontWeight={"normal"}>Jam Mulai</FormLabel>
                <Input
                  onChange={(e) => setJamMulai(`${e.target.value}:00`)}
                  id="waktuMulai"
                  type="time"
                  step="any" 
                />
              </FormControl>
              <FormControl mt="2%">
                <FormLabel fontWeight={"normal"}>Jam Selesai</FormLabel>
                <Input
                  onChange={(e) => setJamSelesai(`${e.target.value}:00`)}
                  id="waktuMulai"
                  type="time"
                />
              </FormControl>
              <FormControl mt="2%">
                <FormLabel fontWeight={"normal"}>Sesi</FormLabel>
                <Input
                  onChange={(e) => setSesi(e.target.value)}
                  id="waktuMulai"
                  type="text"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={() => onClose()}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalTambahJamMain;
