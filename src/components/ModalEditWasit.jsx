import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,

} from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import { API_ENDPOINT } from "../Context/Config";
import axios from "axios";
import swal from "sweetalert";
import { FaEdit } from "react-icons/fa";


const ModalEditWasit = (props) => {
    const {wasit,getWasit} = props
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [namaWasit, setNamaWasit] = useState(wasit.namaWasit);
    const [nohp, setNohp] = useState(wasit.nohp);


    const updateWasit = async (id) => {
        try {
          const response = await axios.patch(`${API_ENDPOINT}/wasit/${id}`,{
            namaWasit:namaWasit,
            nohp:nohp
          });
          swal({
            title: "Good job!",
            text: `${response.data.msg}`,
            icon: "success",
          });
          onClose()
          getWasit();
        } catch (error) {
          console.log(error.response.data);
        }
      }

  return (
   
      <Box>
        <>
          <Button
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            onClick={() => onOpen()}
            bgColor={"yellow.400"}
            color={"white"}
          >
            <FaEdit/>
          </Button>
          <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <Center>
                <ModalHeader fontSize={"4xl"}>Edit Tim</ModalHeader>
              </Center>
              <Center>
                <ModalBody>
                 
                    <FormControl>
                      <FormLabel>Nama Wasit</FormLabel>

                      <Input type="text" value={namaWasit} onChange={(e)=> setNamaWasit(e.target.value)} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>No Hp</FormLabel>
                      <Input type="text" value={nohp} onChange={(e)=> setNohp(e.target.value)} />
                    </FormControl>
                    <Button onClick={()=> updateWasit(wasit.id)} mt={"4"} type="submit">
                      Submit
                    </Button>
                
                </ModalBody>
              </Center>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </Box>
    
  );
};

ModalEditWasit.propTypes = {
    wasit: PropTypes.object.isRequired,
    getWasit: PropTypes.func.isRequired,
  };

export default ModalEditWasit;
