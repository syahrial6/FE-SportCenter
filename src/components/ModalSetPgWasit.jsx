import {
  Box,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  FormControl,
  FormLabel,
  Button,
  ModalFooter,
  Image,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_ENDPOINT } from "../Context/Config";
import swal from "sweetalert";
import PropTypes from "prop-types";
import Select from "react-select";
import { MyContext } from "../Context/Context";

const ModalSetPgWasit = (props) => {
  const { data } = useContext(MyContext);
  const { getReservasi, reservasi } = props;
  const [isOpen, setOpen] = useState(false);
  const [wasit, setWasit] = useState([]);
  const [pg, setPg] = useState([]);
  const [pilihPg, setPilihPg] = useState(
    reservasi.fotographer ? reservasi.fotographer.id : null
  );
  const [pilihWasit, setPilihWasit] = useState(
    reservasi.wasit ? reservasi.wasit.id : null
  );
  const [score1, setScore1] = useState(reservasi.score ? reservasi.score.split("-")[0]:"");
  const [score2, setScore2] = useState(reservasi.score ? reservasi.score.split("-")[1]:"");
  console.log(reservasi)
  const [urlFoto, setUrlFoto] = useState(reservasi.urlFoto);
  useEffect(() => {
    getWasit();
    getPg();
  }, []);

  const setPgWasit = async (e) => {
   e.preventDefault();
    try {
      if (data.role == "fotographer") {await axios.patch(`${API_ENDPOINT}/reservasi/pgwasit/${reservasi.id}`, {
        tanggal: reservasi.tanggal,
        tim1: reservasi.Tim1.namaTim,
        tim2: reservasi.Tim2.namaTim,
        userId: reservasi.Tim2.userId,
        userId2: reservasi.Tim1.userId,
        fotographerId: pilihPg,
        // ada bug disini
        urlFoto: urlFoto,
      })}
      else{
        await axios.patch(`${API_ENDPOINT}/reservasi/pgwasit/${reservasi.id}`, {
          tanggal: reservasi.tanggal,
          tim1: reservasi.Tim1.namaTim,
          tim2: reservasi.Tim2.namaTim,
          userId: reservasi.Tim2.userId,
          userId2: reservasi.Tim1.userId,
          wasitId: pilihWasit,
          // ada bug disini
          score: `${score1}-${score2}`,
          urlFoto: urlFoto,
        })
      }
      
      swal({
        title: "Good job!",
        text: `Data Berhasil Diubah`,
        icon: "success",
      });
      await getReservasi();
    } catch (error) {
      console.log(error.response);
      swal({
        title: "Error",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  const getPg = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/pg`);
      const array2 = response.data.map((data) => ({
        value: data.id,
        label: data.nama,
      }));
      setPg(array2);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const getWasit = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/wasit`);
      const array2 = response.data.map((data) => ({
        value: data.id,
        label: data.namaWasit,
      }));
      setWasit(array2);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  return (
    <Box display={"inline-block"}>
      <Button
        bgColor={"brand.utama"}
        color={"white"}
        onClick={() => setOpen(true)}
      >
        Set Fotographer dan Wasit
      </Button>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={setPgWasit}>
            <ModalHeader>Set Pertandingan</ModalHeader>
            <ModalBody pb={6}>
              {data.role == "fotographer" ? null : (
                <Box display={"flex"} justifyContent={"space-between"} mb={"6"}>
                  <Image
                    borderRadius="full"
                    boxSize="75px"
                    src={reservasi.Tim1.url}
                  />
                  <Input
                    fontSize={"xl"}
                    value={score1}
                    onChange={(e) => setScore1(e.target.value)}
                    my={"auto"}
                    w={"12%"}
                  />
                  <Input
                    fontSize={"xl"}
                    value={score2}
                    onChange={(e) => setScore2(e.target.value)}
                    my={"auto"}
                    w={"12%"}
                  />
                  <Image
                    borderRadius="full"
                    boxSize="75px"
                    src={reservasi.Tim2.url}
                  />
                </Box>
              )}

              {data.role == "fotographer" ? null : (
                <FormControl>
                  <FormLabel>Wasit</FormLabel>
                  <Select
                    onChange={(e) => setPilihWasit(e.value)}
                    options={wasit}
                    defaultInputValue={
                      reservasi.wasit ? reservasi.wasit.namaWasit : ""
                    }
                  />
                </FormControl>
              )}
              {data.role == "wasit" ? null : (
                <Box>
                <FormControl mt={4}>
                  <FormLabel>Fotographer</FormLabel>
                  <Select
                    isDisabled={data.role == "wasit" ? true : false}
                    onChange={(e) => setPilihPg(e.value)}
                    options={pg}
                    defaultValue={{
                      label: reservasi.fotographer
                        ? reservasi.fotographer.nama
                        : "",
                      value: reservasi.fotographer
                        ? reservasi.fotographer.id
                        : null,
                    }}
                  />
                </FormControl>
              
              <FormControl mt={4}>
                <FormLabel>Url Foto</FormLabel>
                <Input
                  isDisabled={data.role == "wasit" ? true : false}
                  onChange={(e) => setUrlFoto(e.target.value)}
                  value={urlFoto}
                />
              </FormControl>
              </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => setOpen(false)}
                type="submit"
                colorScheme="blue"
                mr={3}
              >
                Simpan
              </Button>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

ModalSetPgWasit.propTypes = {
  reservasi: PropTypes.object.isRequired,
  getReservasi: PropTypes.func.isRequired,
};

export default ModalSetPgWasit;
