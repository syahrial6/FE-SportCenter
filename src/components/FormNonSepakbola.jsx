import {
  Box,
  Input,
  Select,
  FormLabel,
  FormControl,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import axios from "axios";
import { API_ENDPOINT, getJamMain, getTarif } from "../Context/Config";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import swal from "sweetalert";
import Loading from "./Loading";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import dayjs from "dayjs";

const FormNonSepakbola = (props) => {
  const { dataReservasi, dataHariLibur, fungsiCekLibur, cekKetersediaan } =
    props;
  const { data } = useContext(MyContext);
  const [tanggal, setTanggal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [jamMain, setJamMain] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [keterangan, setKeterangan] = useState("");
  const [tarif, setTarif] = useState([]);
  const [cekLibur, setCekLibur] = useState(false);
  const [pengecekan, setPengecekan] = useState([]);
  const [sesi, setSesi] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // useeffect untuk pengecekan jadwal tersedia dan hari libur
  useEffect(() => {
    if (dataReservasi.length !== 0) {
      setPengecekan(
        cekKetersediaan(tanggal, jamMulai, jamSelesai, dataReservasi)
      );
      setCekLibur(fungsiCekLibur(tanggal, dataHariLibur));
    }
  }, [tanggal, jamMulai, jamSelesai, dataReservasi]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setJamMain(await getJamMain());
      setTarif(await getTarif());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const createReservasi = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_ENDPOINT}/reservasievent`, {
        waktuMulai: `${tanggal} ${jamMulai}`,
        waktuSelesai: `${tanggal} ${jamSelesai}`,
        judul: keterangan,
        userId: data.id,
        biaya: cekLibur
          ? tarif[1]?.harga
          : cekLibur && sesi == "FullDay"
          ? tarif[1]?.harga * 4
          : cekLibur == false && sesi == "FullDay"
          ? tarif[0]?.harga * 4
          : tarif[0]?.harga,
      });
      swal({
        title: "Good job!",
        text: `${response.data.msg}`,
        icon: "success",
      });
    } catch (error) {
      console.log(error.response.data);
      swal({
        title: "Error!",
        text: `${error.response.data.msg}`,
        icon: "error",
      });
    }
    e.target.reset();
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const { sesi, jamMulai, jamSelesai } = JSON.parse(selectedValue);
    setJamMulai(jamMulai);
    setJamSelesai(jamSelesai);
    setSesi(sesi);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box width={"50%"} m={"auto"}>
      <form onSubmit={createReservasi}>
        <FormControl mt="2%">
          <FormLabel fontWeight={"normal"}>Tanggal</FormLabel>

          <Input
            isRequired={true}
            w={"full"}
            min={dayjs(new Date()).format("YYYY-MM-DD")}
            onChange={(e) => setTanggal(e.target.value)}
            id="waktuMulai"
            type="date"
          />
        </FormControl>
        <FormControl mt="2%">
          <FormLabel fontWeight={"normal"}>Sesi</FormLabel>
          <Select
            isRequired={true}
            mb={"4"}
            placeholder="Pilih Sesi"
            onChange={(e) => handleChange(e)}
          >
            {jamMain.map((data) => (
              <option
                key={data.id}
                value={JSON.stringify({
                  sesi: data.sesi,
                  jamMulai: data.jamMulai,
                  jamSelesai: data.jamSelesai,
                })}
              >
                {`${data.jamMulai}-${data.jamSelesai}`}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl my="2%">
          <FormLabel fontWeight={"normal"}>Keterangan</FormLabel>
          <Input
            isRequired={true}
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
        ) : pengecekan.length > 0 ? (
          <Alert status="success">
            <AlertIcon />
            Sudah Ada {pengecekan.length} Reservasi Menunggu
          </Alert>
        ) : null}

        {cekLibur ? (
          <Alert status="info" fontWeight={"bold"}>
            <AlertIcon />
            {sesi === "FullDay" ? (
              <NumericFormat
                value={tarif[1]?.harga * 4}
                prefix="Rp"
                thousandSeparator
                displayType="text"
              />
            ) : (
              <NumericFormat
                value={tarif[1]?.harga}
                prefix="Rp"
                thousandSeparator
                displayType="text"
              />
            )}
          </Alert>
        ) : (
          <Alert status="info" fontWeight={"bold"}>
            <AlertIcon />
            {sesi === "FullDay" ? (
              <NumericFormat
                value={tarif[0]?.harga * 4}
                prefix="Rp"
                thousandSeparator
                displayType="text"
              />
            ) : (
              <NumericFormat
                value={tarif[0]?.harga}
                prefix="Rp"
                thousandSeparator
                displayType="text"
              />
            )}
          </Alert>
        )}

        <Button
          mt={"4"}
          bgColor={"brand.utama"}
          color={"white"}
          mb={"12"}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

FormNonSepakbola.propTypes = {
  dataReservasi: PropTypes.object.isRequired,
  dataHariLibur: PropTypes.func.isRequired,
  fungsiCekLibur: PropTypes.func.isRequired,
  cekKetersediaan: PropTypes.func.isRequired,
};

export default FormNonSepakbola;
