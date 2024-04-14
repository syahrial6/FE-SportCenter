import {
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../Context/Config";
import dayjs from "dayjs";
import Loading from "./Loading";
// import swal from "sweetalert";
import ModalDetailPertandinganAdmin from "./ModalDetailPertandinganAdmin";


const TabelReservasiUser = () => {
  const [dataReservasi, setDataReservasi] = useState([]);
  console.log(dataReservasi);

  useEffect(() => {
    getReservasi();
  }, []);

  const getReservasi = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/reservasi`);
      const array2 = response.data.map((item) => ({
        Tim1: item.Tim1,
        Tim2: item.Tim2,
        createdAt: item.createdAt,
        fotographer: item.fotographer,
        id: item.id,
        idTim1: item.idTim1,
        idTim2: item.idTim2,
        isPending: item.isPending,
        isVerified: item.isVerified,
        updatedAt: item.updatedAt,
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
      }));

      setDataReservasi(array2);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  // const izin_ditolak = async (reservasi) => {
  //   try {
  //     await axios.patch(`${API_ENDPOINT}/reservasi/${reservasi.id}`, {
  //       tanggal: reservasi.tanggal,
  //       tim1: reservasi.Tim1.namaTim,
  //       tim2: reservasi.Tim2.namaTim,
  //       izin: false,
  //     });
  //     swal({
  //       title: "Good job!",
  //       text: `Perizinan Telah Ditolak`,
  //       icon: "success",
  //     });
  //     getReservasi();
  //   } catch (error) {
  //     swal({
  //       title: "Error",
  //       text: `${error.response.data.msg}`,
  //       icon: "error",
  //     });
  //   }
  // };

  if (dataReservasi.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Table variant="simple">
        <Thead bgColor={"brand.utama"}>
          <Tr>
            <Th color={"white"} textAlign={"center"}>
              No
            </Th>
            <Th color={"white"} textAlign={"center"}>
              Pertandingan
            </Th>
            <Th color={"white"} textAlign={"center"}>
              Tanggal
            </Th>
            <Th color={"white"} textAlign={"center"}>
              Waktu
            </Th>
            <Th color={"white"} textAlign={"center"}>
              Izin
            </Th>
            <Th color={"white"} textAlign={"center"}>
              Pembayaran
            </Th>
           
        
          </Tr>
        </Thead>
        <Tbody>
          {dataReservasi.map((reservasi, index) => (
            <Tr key={index}>
              <Td width={"50px"} textAlign={"center"}>
                {index + 1}
              </Td>
              <Td
                textAlign={"center"}
                // mengirim idtim1 dan 2 untuk getData masing-masing tim di komponent modal
              >
                <ModalDetailPertandinganAdmin reservasi={reservasi} />
              </Td>
              <Td textAlign={"center"}>{reservasi.tanggal}</Td>
              <Td textAlign={"center"}>
                {`${reservasi.waktuMulai}-${reservasi.waktuSelesai}`}
              </Td>
              <Td>
                {!(reservasi.isVerified || reservasi.isPending) ? (
                  <Badge colorScheme="red">Ditolak</Badge>
                ) : reservasi.isPending && !reservasi.isVerified ? (
                  <Badge colorScheme="yellow">Pending</Badge>
                ) : (
                  <Badge colorScheme="green">Diberikan</Badge>
                )}
              </Td>
              <Td textAlign={"center"}>LUNAS</Td>
             
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};


export default TabelReservasiUser;
