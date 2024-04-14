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


const ModalEditPg = (props) => {
    const {pg,getPg} = props
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nama, setNama] = useState(pg.nama);
    const [nohp, setNohp] = useState(pg.nohp);


    const updatePg = async (id) => {
        try {
          const response = await axios.patch(`${API_ENDPOINT}/pg/${id}`,{
            nama:nama,
            nohp:nohp
          });
          swal({
            title: "Good job!",
            text: `${response.data.msg}`,
            icon: "success",
          });
          onClose()
          getPg();
        } catch (error) {
          console.log(error.response.data);
        }
      }

  return (
    <div>
      <Box fontFamily={"Rubik Variable"}>
        <>
          <Button
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            onClick={() => onOpen()}
            bgColor={"brand.second"}
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
                      <FormLabel>Nama Fotographer</FormLabel>

                      <Input type="text" value={nama} onChange={(e)=> setNama(e.target.value)} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>No Hp</FormLabel>
                      <Input type="text" value={nohp} onChange={(e)=> setNohp(e.target.value)} />
                    </FormControl>
                    <Button onClick={()=> updatePg(pg.id)} mt={"4"} type="submit">
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

ModalEditPg.propTypes = {
    pg: PropTypes.object.isRequired,
    getPg: PropTypes.func.isRequired,
  };

export default ModalEditPg;
