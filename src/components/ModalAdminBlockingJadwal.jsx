import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  Select,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_ENDPOINT } from "../Context/Config";
import swal from "sweetalert";
import Loading from "./Loading";
import { MyContext } from "../Context/Context";
import { FaPlus } from "react-icons/fa";

const ModalAdminBlockingJadwal = (props) => {
  const { getData, cekKetersediaan, dataReservasi } = props;
  const { data } = useContext(MyContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tanggal, setTanggal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [jamMain, setJamMain] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [keterangan, setKeterangan] = useState("");
  const [pengecekan, setPengecekan] = useState([]);

  useEffect(() => {
    getJamMain();
  }, []);

  useEffect(() => {
    if (dataReservasi.length !== 0) {
      setPengecekan(
        cekKetersediaan(tanggal, jamMulai, jamSelesai, dataReservasi)
      );
    }
  }, [tanggal, jamMulai, jamSelesai, dataReservasi]);

  const handleChange = (e) => {
    const selectJam = e.target.value;
    const [jamMulai, jamSelesai] = selectJam.split("-");
    setJamMulai(jamMulai);
    setJamSelesai(jamSelesai);
  };

  const getJamMain = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_ENDPOINT}/jam`);
      setJamMain(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const createReservasi = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_ENDPOINT}/reservasieventadmin`, {
        waktuMulai: `${tanggal} ${jamMulai}`,
        waktuSelesai: `${tanggal} ${jamSelesai}`,
        judul: keterangan,
        userId: data.id,
      });
      swal({
        title: "Good job!",
        text: `${response.data.msg}`,
        icon: "success",
      });
      onClose();
      getData();
    } catch (error) {
      console.log(error.response.data);
      swal({
        title: "Error!",
        text: `${error.response.data.msg}`,
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box display={"inline-block"}>
      <Button color={"white"} bgColor={"brand.utama"} onClick={() => onOpen()}>
        <Box mr={"2"}>
          <FaPlus />
        </Box>
        Tambah Jadwal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Jadwal</ModalHeader>
          <ModalBody pb={6}>
            <form onSubmit={createReservasi}>
              <FormControl mt="2%">
                <FormLabel fontWeight={"normal"}>Tanggal</FormLabel>
                <Input
                  onChange={(e) => setTanggal(e.target.value)}
                  id="waktuMulai"
                  type="date"
                />
              </FormControl>
              <FormControl mt="2%">
                <FormLabel fontWeight={"normal"}>Sesi</FormLabel>
                <Select
                  mb={"4"}
                  placeholder="Pilih Sesi"
                  onChange={(e) => handleChange(e)}
                >
                  {jamMain.map((data) => (
                    <option key={data.id} value={data.jam}>
                      {`${data.jamMulai}-${data.jamSelesai}`}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt="2%">
                <FormLabel fontWeight={"normal"}>Sesi</FormLabel>
              </FormControl>
              <FormControl mt="2%">
                <FormLabel fontWeight={"normal"}>Keterangan</FormLabel>
                <Input
                  onChange={(e) => setKeterangan(e.target.value)}
                  id="keterangan"
                  type="text"
                />
              </FormControl>
              {pengecekan.length > 0 &&
              pengecekan[0].pembayaran?.datetime_payment != null ? (
                <Alert status="error">
                  <AlertIcon />
                  Sudah Di Booking
                </Alert>
              ) : null}
              {pengecekan.length > 0 &&
              pengecekan[0].pembayaran?.datetime_payment != null ? null : (
                <Button type="submit">Submit</Button>
              )}
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalAdminBlockingJadwal;
