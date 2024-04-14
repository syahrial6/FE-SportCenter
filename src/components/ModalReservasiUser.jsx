import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  Button,
  Badge,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { API_ENDPOINT } from "../Context/Config";
import axios from "axios";
import ModalDetailPertandinganAdmin from "./ModalDetailPertandinganAdmin";
import Loading from "../components/Loading";
import NotaSewa from "./NotaSewa";
import DataTable from "react-data-table-component";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";


// dipanggil di halaman profil untuk melihat history reservasi
const ModalReservasiUser = (props) => {
  const { idTim } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [dataReservasi, setDataReservasi] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getReservasi();
  }, []);

  // getReservasibyIdTim
  const getReservasi = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/reservasi/tim/${idTim}`
      );
      const array2 = response.data.map((item) => ({
        Tim1: item.Tim1,
        Tim2: item.Tim2,
        createdAt: item.createdAt,
        fotographer: item.fotographer,
        id: item.id,
        score: item.score || "",
        idTim1: item.idTim1,
        idTim2: item.idTim2,
        isPending: item.isPending,
        isVerified: item.isVerified,
        updatedAt: item.updatedAt,
        virtualAccount: item.virtualAccount,
        trxId: item.trxId,
        isPaid: item.isPaid,
        waktuMulai: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
          "HH:mm:ss"
        ),
        waktuSelesai: dayjs(
          new Date(item.waktuSelesai).toLocaleString()
        ).format("HH:mm:ss"),
        tanggal: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
          "D MMMM YYYY"
        ),
        wasit: item.wasit,
        pembayaran:item.pembayaran
      }));

      setDataReservasi(array2);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      maxWidth: "50px",
    },
    {
      name: "Pertandingan",
      minWidth: "200px",
      selector: (row) => <ModalDetailPertandinganAdmin reservasi={row} />,
    },
    {
      name: "Izin",
      minWidth: "50px",
      selector: (row) =>
        !(row.isVerified || row.isPending) ? (
          <Badge colorScheme="red">Ditolak</Badge>
        ) : row.isPending && !row.isVerified ? (
          <Badge colorScheme="yellow">Waiting</Badge>
        ) : (
          <Badge colorScheme="green">Diberikan</Badge>
        ),
    },
    {
      name: "Virtual Account",
      minWidth: "100px",
      selector: (row) => row.virtualAccount,
    },
    {
      name: "Batas Waktu",
      minWidth: "100px",
      selector: (row) => row.pembayaran ? dayjs(row.pembayaran.datetime_expired).format("D-MM-YYYY HH:mm:ss") : "",
    },
    {
      name: "Status Bayar",
      minWidth: "50px",
      selector: (row) => {
        if (!row.pembayaran) return "Belum Dibuat";
    
        return !row.pembayaran.datetime_payment && dayjs(row.pembayaran.datetime_expired).unix() - dayjs(new Date().toISOString()).unix() <= 0
          ? "Expired"
          : !row.pembayaran.datetime_payment
          ? "Menunggu"
          : "Sukses";
      },
    },    
    {
      name: "Aksi",
      minWidth: "50px",
      cell: (row) => (
        <Box display={"flex"} gap={"2"}>
          {" "}
          <NotaSewa data={row} />{" "}
          <CopyToClipboard
            text={row.virtualAccount}
            onCopy={() => {
              toast({
                title: "Berhasil disalin ke clipboard",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }}
          >
            <Button bgColor={"orange"}>
              <FaCopy fill="white" />
            </Button>
          </CopyToClipboard>
        </Box>
      ),
    },
  ];
  return (
    <>
      <Button
        color={"white"}
        bgColor={"brand.utama"}
        _hover={{ bgColor: "brand.second" }}
        onClick={() => [setIsOpen(true)]}
      >
        History Reservasi
      </Button>
      {isLoading ? (
        <Loading />
      ) : (
        <Modal size={"5xl"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <Text
              textAlign={"center"}
              my={"4"}
              fontSize={"3xl"}
              fontWeight={"bold"}
            >
              History Reservasi
            </Text>
            <ModalBody>
              <DataTable data={dataReservasi} columns={columns} pagination />
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => setIsOpen(false)}
                colorScheme="blue"
                mr={3}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ModalReservasiUser;
