import {
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { API_ENDPOINT } from "../Context/Config";
import PropTypes from "prop-types";
import swal from "sweetalert";

const ModalEditPemain = (props) => {
  const { fetchData } = props;
  const [isOpen, setOpen] = useState(false);
  const [namaPemain, setNamaPemain] = useState(props.namaPemain);
  const [posisi, setPosisi] = useState(props.posisi);
  const [noPunggung, setNoPunggung] = useState(props.noPunggung);

  const editPemain = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_ENDPOINT}/pemain/${props.id}`, {
        namaPemain: namaPemain,
        noPunggung: noPunggung,
        posisi: posisi,
      });
      swal({
        title: "Good job!",
        text: `Data Berhasil DIubah`,
        icon: "success",
      });
      fetchData();
      setOpen(false);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  return (
    <Box mb={"4"}>
      <Button onClick={() => setOpen(true)} bgColor={"yellow.400"}>
        {props.icon}
      </Button>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={editPemain}>
            <ModalHeader>Edit Pemain</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>No Punggung</FormLabel>
                <Input
                  value={noPunggung}
                  onChange={(e) => setNoPunggung(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Nama Pemain</FormLabel>
                <Input
                  value={namaPemain}
                  onChange={(e) => setNamaPemain(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Posisi</FormLabel>
                <Select
                  required
                  placeholder="Posisi"
                  value={posisi}
                  onChange={(e) => setPosisi(e.target.value)}
                >
                  <option value="GK">GK</option>
                  <option value="CB">CB</option>
                  <option value="LB">LB</option>
                  <option value="RB">RB</option>
                  <option value="DM">DM</option>
                  <option value="CM">CM</option>
                  <option value="LW">LW</option>
                  <option value="RW">RW</option>
                  <option value="AM">AM</option>
                  <option value="SS">SS</option>
                  <option value="ST">ST</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

ModalEditPemain.propTypes = {
  namaPemain: PropTypes.string.isRequired,
  posisi: PropTypes.string.isRequired,
  noPunggung: PropTypes.number.isRequired,
  getTim: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default ModalEditPemain;
