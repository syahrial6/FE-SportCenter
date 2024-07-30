import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  Button,
  Text,
  Box,
  Center,
  useDisclosure,
  FormControl,
  Input,
  Select,
  FormLabel,

} from "@chakra-ui/react";
import dayjs from "dayjs";
import axios from "axios"
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { API_ENDPOINT, getJamMain } from "../Context/Config";
import Loading from "./Loading";
import swal from "sweetalert";


const ModalReschedule = ({reservasi,getReservasi}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jamMain, setJamMain] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jamMulai, setJamMulai] = useState();
  const [jamSelesai, setJamSelesai] = useState();
    const [tanggal, setTanggal] = useState();

  const handleSelectJam = (e) => {
    const selectJam = e.target.value;
    const [jamMulai, jamSelesai] = selectJam.split("-");
    setJamMulai(jamMulai);
    setJamSelesai(jamSelesai);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await setJamMain(await getJamMain());
      setLoading(false);
    };

    fetchData();
  }, []);

  const reschedule = async (e) => {
    e.preventDefault();
    if (reservasi.title !== "Match Day"){
      try {
        const response = await axios.patch(`${API_ENDPOINT}/rescheduleevent/${reservasi.id}`, {
            waktuMulai: `${tanggal} ${jamMulai}`,
            waktuSelesai: `${tanggal} ${jamSelesai}`,
        })
       swal("Berhasil", "Reschedule Berhasil", "success");
       await getReservasi();
       onClose();
      } catch (error) {
        swal("Gagal", error.response.data.msg, "error");
      }
    }
    else{
    try {
        const response = await axios.patch(`${API_ENDPOINT}/reschedulereservasi/${reservasi.id}`, {
            waktuMulai: `${tanggal} ${jamMulai}`,
            waktuSelesai: `${tanggal} ${jamSelesai}`,
        })
       swal("Berhasil", "Reschedule Berhasil", "success");
       await getReservasi();
       onClose();
    } catch (error) {
       swal("Gagal", error.response.data.msg, "error");
    }
  }
}
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
        {loading == true ? (<Loading/>) :(
        <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Center>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                Reschedule Pertandingan
              </Text>
            </Center>
            <ModalBody>
              <Box>
                <form onSubmit={reschedule}>
                  <FormControl mb={"4"}>
                    <FormLabel>Tanggal</FormLabel>
                    <Input
                      min={dayjs(new Date()).format("YYYY-MM-DD")}
                      type="date"
                      onChange={(e) => setTanggal(e.target.value)}
                    />
                  </FormControl>
                  <FormLabel>Jam</FormLabel>
                  <Select
                    isRequired={true}
                    mb={"4"}
                    placeholder="Pilih Jam Main"
                    onChange={(e) => handleSelectJam(e)}
                  >
                    {jamMain.map((data) => (
                      <option key={data.id} value={data.jam}>
                        {`${data.jamMulai}-${data.jamSelesai}`}
                      </option>
                    ))}
                  </Select>
                
                <Button
                  bgColor={"brand.utama"}
                  color={"white"}
                  mt={"2"}
                  type="submit"
                >
                  Simpan
                </Button>
                </form>
              </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
        )}
      </>
    </Box>
  );
};

export default ModalReschedule;
