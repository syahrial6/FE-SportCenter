import { useEffect, useState } from "react";
import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Text, Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import ModalDetailPertandinganAdmin from "../components/ModalDetailPertandinganAdmin";
import ModalDetailEvent from "../components/ModalDetailEvent";
import { Calendar } from "antd";
import { getReservasi, getReservasiComplete } from "../Context/Config";
import ModalAdminBlockingJadwal from "../components/ModalAdminBlockingJadwal";
import Loading from "../components/Loading";

const JadwalPemakaian = () => {
  const [dataReservasi, setDataReservasi] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(dataReservasi);

  const fetchData = async () => {
    setLoading(true);
    try {
      setDataReservasi(await getReservasiComplete());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // Tangani kesalahan di sini
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const cekKetersediaan = (tanggal, jamMulai, jamSelesai, dataReservasi) => {
    const waktuMulai = `${tanggal} ${jamMulai}`;
    const waktuSelesai = `${tanggal} ${jamSelesai}`;
    const array = [];

    for (const reservasi of dataReservasi) {
      const reservasiWaktu = `${dayjs(reservasi.waktuMulaitgl).format(
        "YYYY-MM-DD"
      )} ${reservasi.waktuMulaijam}`;
      const reservasiWaktuSelesai = `${dayjs(
        reservasi.waktuSelesaitgl
      ).format("YYYY-MM-DD")} ${reservasi.waktuSelesaijam}`;
      if (
        waktuMulai <= reservasiWaktu &&
        waktuSelesai >= reservasiWaktuSelesai
      ) {
        array.push(reservasi);
      } else if (
        waktuMulai >= reservasiWaktu &&
        waktuSelesai <= reservasiWaktuSelesai
      ) {
        array.push(reservasi);
      }
    }

    if (array.length > 0) {
      return array; // Mengembalikan array reservasi yang cocok dengan tanggal dan jamMulai yang diinputkan
    } else {
      return 0; // Tidak ada tanggal yang cocok dengan yang diinputkan
    }
  };

  // sebagai parameter untuk properti di kalendar
  // sebagai parameter untuk properti di kalendar
  const dateCellRender = (value) => {
    const date = value.format("YYYY-MM-DD");

    const eventsForDate = dataReservasi.filter((reservasi) => {
      const waktuMulai = dayjs(reservasi.waktuMulaitgl).format("YYYY-MM-DD");
      const waktuSelesai = dayjs(reservasi.waktuSelesaitgl).format(
        "YYYY-MM-DD"
      );

      // Memeriksa apakah tanggal saat ini berada di antara tanggalMulai dan tanggalSelesai
      return date >= waktuMulai && date <= waktuSelesai;
    });

   
    return (
      <Box>
        {eventsForDate.map((reservasi) =>
          reservasi.Tim1 && reservasi.Tim2 ? (
            <ModalDetailPertandinganAdmin
              reservasi={reservasi}
              key={reservasi.id}
            />
          ) : (
            <ModalDetailEvent reservasi={reservasi} key={reservasi.id} />
          )
        )}
      </Box>
    );
  };
  return (
    <Box>
      <WithAction />
      <Sidebar>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Text
              fontSize={"4xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              mt={"12"}
              fontFamily={"Rubik Variable"}
            >
              Jadwal Pemakaian
            </Text>
            <Box m={"4"} p={"4"} bgColor={"white"} overflowX={"auto"}>
              <ModalAdminBlockingJadwal
                getData={fetchData}
                cekKetersediaan={cekKetersediaan}
                dataReservasi={dataReservasi}
              />
              <Calendar
                style={{
                  width: "100%",
                  overflow: "hidden",
                }}
                cellRender={dateCellRender}
              />
            </Box>
          </>
        )}
      </Sidebar>
    </Box>
  );
};

export default JadwalPemakaian;
