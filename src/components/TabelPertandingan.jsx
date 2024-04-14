import { Button, Badge, Box, Input } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import {
  API_ENDPOINT,
  getReservasi,

} from "../Context/Config";
import Loading from "./Loading";
import { PiProhibitBold } from "react-icons/pi";
import ModalDetailPertandinganAdmin from "./ModalDetailPertandinganAdmin";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import ModalDetailEvent from "./ModalDetailEvent";
import swal from "sweetalert";
import { FaCheck } from "react-icons/fa";
import { MyContext } from "../Context/Context";
import ModalSetPgWasit from "./ModalSetPgWasit";

// email masih dikirim ke satu user yaitu tim 2 perlu disetting lagi
const TabelPertandingan = (props) => {
  const { dataReservasi,fetchData } = props || {};
  const { data } = useContext(MyContext);
  console.log(dataReservasi);


  // const searchData = async (e) => {
  //   var searchData = dataReservasi.filter((item) => {
  //     if (
  //       item.title
  //         .toString()
  //         .toLowerCase()
  //         .includes(e.target.value.toLowerCase())
  //     ) {
  //       return item;
  //     }
  //   });

  // };

  const izin_diberikan = async (row) => {
    const konfirmasi = await swal({
      title: "Konfirmasi Perizinan",
      text: "Apakah Anda Yakin Akan Mengizinkan Reservasi Ini?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (konfirmasi) {
      try {
        const response = await axios.post(`http://localhost:5432/pembayaran`, {
          type: "createbilling",
          client_id: "001",
          trx_id: `12300${Math.floor(10000 + Math.random() * 90000)}`,
          trx_amount: "100000",
          billing_type: "c",
          customer_name: "Mr. Zakaria",
          customer_email: "xxx@email.com",
          customer_phone: "08123123123",
          virtual_account: `89922019${Math.floor(
            10000000 + Math.random() * 90000000
          )}`,
          datetime_expired: new Date(
            new Date().setDate(new Date().getDate() + 3)
          ),
          description: `Pembayaran Sewa Stadion UNTAN`,
        });

        if (response.data.data.trx_id && row.Tim1) {
          await axios.patch(`${API_ENDPOINT}/reservasi/${row.id}`, {
            izin: true,
            trxId: response.data.data.trx_id,
            virtualAccount: response.data.data.virtual_account,
          });
        } else {
          await axios.patch(`${API_ENDPOINT}/reservasievent/${row.id}`, {
            izin: true,
            trxId: response.data.data.trx_id,
            virtualAccount: response.data.data.virtual_account,
          });
        }

        swal({
          title: "Good job!",
          text: `Perizinan Telah DiBerikan`,
          icon: "success",
        });
        fetchData();
      } catch (error) {
        swal({
          title: "Error",
          text: `${error.response.data.message}`,
          icon: "error",
        });
        console.log(error.response);
        fetchData();
      }
    }
  };

  const izin_ditolak = async (row) => {
    const konfirmasi = await swal({
      title: "Konfirmasi Penolakan",
      text: "Apakah Anda Yakin Akan Menolak Reservasi Ini?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (konfirmasi) {
      try {
        if (row.Tim1) {
          await axios.patch(`${API_ENDPOINT}/reservasi/${row.id}`, {
            izin: false,
          });
        } else {
          await axios.patch(`${API_ENDPOINT}/reservasievent/${row.id}`, {
            izin: false,
          });
        }

        swal({
          title: "Good job!",
          text: `Perizinan Telah Ditolak`,
          icon: "success",
        });

        fetchData();
      } catch (error) {
        swal({
          title: "Error",
          text: `${error.response.data.msg}`,
          icon: "error",
        });

        fetchData();
      }
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

      cell: (row) =>
        row.Tim1 ? (
          <Box>
            <ModalDetailPertandinganAdmin reservasi={row} />
          </Box>
        ) : (
          <ModalDetailEvent reservasi={row} />
        ),

      button: true, // Menandakan kolom ini berisi tombol
    },

    {
      name: "Waktu",
      selector: (row) =>
        `${row.waktuMulaitgl} ${row.waktuMulaijam}-${row.waktuSelesaijam}`,
      sortable: true,
      maxWidth: "300px",
    },

    {
      name: "Izin",
      selector: (row) =>
        !(row.isVerified || row.isPending) ? (
          <Badge colorScheme="red">Ditolak</Badge>
        ) : row.isPending && !row.isVerified ? (
          <Badge colorScheme="yellow">Waiting</Badge>
        ) : (
          <Badge colorScheme="green">Diberikan</Badge>
        ),

      maxWidth: "200px",
    },
    {
      name: "Pembayaran",
      selector: (row) =>
        !row.virtualAccount
          ? "Belum Dibuat"
          : !row.pembayaran.datetime_payment &&
            dayjs(row.pembayaran.datetime_expired).unix() -
              dayjs(new Date().toISOString()).unix() <=
              0
          ? "Expired"
          : !row.pembayaran.datetime_payment
          ? "Menunggu"
          : "Sukses",
      maxWidth: "150px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Box>
          {data.role == "wasit" || data.role == "fotographer" ? (
            <ModalSetPgWasit reservasi={row} getReservasi={getReservasi} />
          ) : (
            <Box display={"flex"} gap={"2"}>
              <Button bgColor={"green.400"} onClick={() => izin_diberikan(row)}>
                <FaCheck />
              </Button>
              <Button bgColor={"red.400"} onClick={() => izin_ditolak(row)}>
                <PiProhibitBold />
              </Button>
            </Box>
          )}
        </Box>
      ), // Tombol aksi
      button: true, // Menandakan kolom ini berisi tombol
      maxWidth: "150px",
    },
  ];

  return (
    <Box overflowX={"auto"}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Input
          type="text"
          placeholder="Search"
          w={"30%"}
          h={"15%"}
          // onChange={searchData}
        />
      </Box>
      <DataTable
        columns={columns}
        data={dataReservasi}
        pagination
        // fixedHeader
        fixedHeaderScrollHeight={"100vh"}
      />
    </Box>
  );
};

export default TabelPertandingan;
