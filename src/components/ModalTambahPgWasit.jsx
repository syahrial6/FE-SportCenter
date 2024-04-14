import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,

  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Center,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";

const ModalTambahPgWasit = (props) => {
  // komponent modal ini untuk menambah fotogpraher dan wasit,fungsi dari parent dikirim ke sini
  const { fungsiTambah } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nama, setNama] = useState("");
  const [nohp, setNohp] = useState("");
  return (
    <div>
      <Box fontFamily={"Rubik Variable"}>
        <>
          <Button
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            onClick={() => onOpen()}
            display={"block"}
            bgColor={"blue.500"}
          >
            <FaPlus fill="white"/>
          </Button>
          <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <Center>
                <Text fontWeight={"bold"} mt={"8"} fontSize={"4xl"}>Tambah Data</Text>
              </Center>
              <Center>
                <ModalBody>
                  <FormControl>
                    <FormLabel>Nama</FormLabel>

                    <Input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={"2"}>No Hp</FormLabel>
                    <Input
                      type="text"
                      value={nohp}
                      onChange={(e) => setNohp(e.target.value)}
                    />
                  </FormControl>
                  <Button bgColor={"green.500"} color={"white"} mt={"4"} type="submit" onClick={()=>[fungsiTambah(nama,nohp),onClose()]}>
                    Submit
                  </Button>
                  
                </ModalBody>
              </Center>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Box>
    </div>
  );
};
ModalTambahPgWasit.propTypes = {
  fungsiTambah: PropTypes.func.isRequired,
};

export default ModalTambahPgWasit;
