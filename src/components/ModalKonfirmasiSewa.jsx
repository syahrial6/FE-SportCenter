import {
  Modal,
  Tr,
  Td,
  Tbody,
  Table,
  TableContainer,
  ModalFooter,
  Button,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getTimByIdTim } from "../Context/Config";
import Loading from "./Loading";
import swal from "sweetalert";
import { NumericFormat } from "react-number-format";
const ModalKonfirmasiSewa = (props) => {
  const { dataKonfirmasi, fungsiReservasi } = props;
  const [tim1, setTim1] = useState([]);
  const [tim2, setTim2] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);

      setTim1(await getTimByIdTim(dataKonfirmasi.tim1));
      setTim2(await getTimByIdTim(dataKonfirmasi.tim2));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const pengecekanReservasi = () => {
    if (
      dataKonfirmasi.tanggal !== undefined &&
      dataKonfirmasi.jamMulai !== undefined &&
      dataKonfirmasi.jamSelesai !== undefined &&
      tim1 !== undefined &&
      tim2 !== undefined
    ) {
      if (tim1.pemains.length >= 11 && tim2.pemains.length >= 11) {
        fungsiReservasi();
        onClose();
      } else {
        swal({
          title: "Lengkapi Data Pemain",
          text: "Kedua Tim Harus Memiliki Minimal 11 Pemain",
          icon: "warning",
        });
      }
    } else {
      swal({
        title: "Lengkapi Data Reservasi",
        text: "Data Reservasi Belum Lengkap",
        icon: "error",
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, [dataKonfirmasi.tim1, dataKonfirmasi.tim2]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Button bgColor={"brand.utama"} color={"white"} onClick={onOpen}>
        Kirim Reservasi
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi</ModalHeader>
          <ModalBody>
            <TableContainer my={"12"} bgColor={"gray.100"}>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Pertandingan</Td>
                    <Td>{`${tim1?.namaTim} VS ${tim2?.namaTim}`}</Td>
                  </Tr>
                  <Tr>
                    <Td>Tanggal</Td>
                    <Td>
                      {dayjs(dataKonfirmasi.tanggal).format("D MMMM YYYY")}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Waktu</Td>
                    <Td>{`${dataKonfirmasi.jamMulai}-${dataKonfirmasi.jamSelesai}`}</Td>
                  </Tr>

                  <Tr>
                    <Td>Biaya Sewa</Td>
                    <Td>
                      {" "}
                      <NumericFormat
                        value={dataKonfirmasi.biaya_sewa}
                        prefix="Rp"
                        thousandSeparator
                        displayType="text"
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Biaya Fotographer</Td>
                    <Td>
                      {" "}
                      <NumericFormat
                        value={dataKonfirmasi.fotographer}
                        prefix="Rp"
                        thousandSeparator
                        displayType="text"
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Total Biaya</Td>
                    <Td fontWeight={"bold"}>
                      <NumericFormat
                        value={
                          dataKonfirmasi.biaya_sewa + dataKonfirmasi.fotographer
                        }
                        prefix="Rp"
                        thousandSeparator
                        displayType="text"
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              bgColor={"brand.utama"}
              color={"white"}
              onClick={() => pengecekanReservasi()}
              colorScheme="blue"
              mr={3}
            >
              Kirim
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

ModalKonfirmasiSewa.propTypes = {
  dataKonfirmasi: PropTypes.object.isRequired,
  fungsiReservasi: PropTypes.func.isRequired,
};

export default ModalKonfirmasiSewa;
