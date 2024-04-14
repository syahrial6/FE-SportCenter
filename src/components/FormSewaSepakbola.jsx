import {
  Box,
  Image,
  Text,
  Input,
  Select,
  Center,
  Alert,
  AlertIcon,
  Checkbox,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  API_ENDPOINT,
  getJamMain,
  getTim,
  getTimSaya,
  getTarif,
} from "../Context/Config";
import swal from "sweetalert";
import { MyContext } from "../Context/Context";
import ModalKonfirmasiSewa from "./ModalKonfirmasiSewa";
import dayjs from "dayjs";
import Loading from "./Loading";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";

const FormSewaSepakbola = (props) => {
  const { dataReservasi, cekKetersediaan, fungsiCekLibur, dataHariLibur } =
    props;
  const { data } = useContext(MyContext);
  const [dataTimSaya, setDataTimSaya] = useState([]);
  const [dataTim, setDataTim] = useState([]);
  const [jamMain, setJamMain] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [tanggal, setTanggal] = useState();
  const [jamMulai, setJamMulai] = useState();
  const [jamSelesai, setJamSelesai] = useState();
  const [isLoading, setLoading] = useState(true);
  const [cekLibur, setCekLibur] = useState(false);
  const [pakaiPg, setPakaiPg] = useState(true);
  const [tarif, setTarif] = useState([]);
  // ---------------------------------------------

  // state ini digunakan untuk ternary operator jika sudah ada reservasi maka ada alert
  const [pengecekan, setPengecekan] = useState([]);

  const dataKonfirmasi = {
    tim1: selected.id,
    tim2: selected2.id,
    tanggal: tanggal,
    jamMulai: jamMulai,
    jamSelesai: jamSelesai,
    biaya_sewa: cekLibur ? tarif[1]?.harga : tarif[0]?.harga,
    fotographer: pakaiPg ? 350000 : 0,
  };

  // fungsi pengecekan apakah ditanggal itu libur atau tidak

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      setTarif(await getTarif());
      setDataTim(await getTim());
      setDataTimSaya(await getTimSaya(data.id));
      setJamMain(await getJamMain());

      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  // useeffect untuk pengecekan jadwal tersedia dan hari libur
  useEffect(() => {
    if (dataReservasi.length !== 0) {
      setPengecekan(cekKetersediaan(tanggal, jamMulai, jamSelesai,dataReservasi));
      setCekLibur(fungsiCekLibur(tanggal, dataHariLibur));
    }
  }, [tanggal, jamMulai,jamSelesai, dataReservasi]);

  const reservasi = async () => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/reservasi`, {
        waktuMulai: `${tanggal} ${jamMulai}`,
        waktuSelesai: `${tanggal} ${jamSelesai}`,
        idTim1: `${selected.id}`,
        idTim2: `${selected2.id}`,
        biaya: dataKonfirmasi.biaya_sewa + dataKonfirmasi.fotographer,
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
  };
  // menhandle id dan url dari tim
  const handleChange1 = (e) => {
    const selectedValue = e.target.value;
    const [selectedId, selectedUrl] = selectedValue.split(",");
    setSelected({
      id: selectedId,
      url: selectedUrl,
    });
  };

  const handleChange2 = (e) => {
    const selectedValue = e.target.value;

    const [selectedId, selectedUrl] = selectedValue.split(",");
    setSelected2({
      id: selectedId,
      url: selectedUrl,
    });
  };
  // menghandle pilihan jam kemudian di split menjadi 2 bagian
  const handleSelectJam = (e) => {
    const selectJam = e.target.value;
    const [jamMulai, jamSelesai] = selectJam.split("-");
    setJamMulai(jamMulai);
    setJamSelesai(jamSelesai);
  };

  if (isLoading) {
    return <Loading />;
  }
  {
    return (
      <Box>
        <form onSubmit={reservasi}>
          <Box
            display={{ base: "block", lg: "flex" }}
            justifyContent={"space-around"}
            mt={"6"}
          >
            <Box>
              <Image
                alignItems={"center"}
                justifyContent={"center"}
                m={"auto"}
                borderRadius="full"
                boxSize="150px"
                src={selected.url}
              />

              <Select
                isRequired={true}
                placeholder="Pilih Tim Anda"
                onChange={(e) => handleChange1(e)}
              >
                {dataTimSaya.map((data) => (
                  <option
                    key={data.id}
                    disabled={data.isBlacklist}
                    value={`${data.id},${data.url}`}
                  >
                    {data.namaTim}
                  </option>
                ))}
              </Select>
            </Box>
            <Box textAlign={"center"}>
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
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                VS
              </Text>

              <FormLabel>Tanggal</FormLabel>

              <Input
                isRequired={true}
                w={"full"}
                min={dayjs(new Date()).format("YYYY-MM-DD")}
                type="date"
                onChange={(e) => setTanggal(e.target.value)}
              />
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
              <Checkbox
                onChange={(e) => setPakaiPg(e.target.checked)}
                defaultChecked
              >
                Jasa Fotographer
              </Checkbox>
              <Text fontSize={"12px"}>
                Centang Jika Menggunakan Fotographer Dari Kami
              </Text>
              {cekLibur ? (
                <Alert status="info" fontWeight={"bold"}>
                  <AlertIcon />
                  <NumericFormat
                    value={tarif[1]?.harga}
                    prefix="Rp"
                    thousandSeparator
                    displayType="text"
                  />
                </Alert>
              ) : (
                <Alert status="info" fontWeight={"bold"}>
                  <AlertIcon />
                  <NumericFormat
                    value={tarif[0]?.harga}
                    prefix="Rp"
                    thousandSeparator
                    displayType="text"
                  />
                </Alert>
              )}
            </Box>
            <Box>
              <Center>
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={selected2.url}
                />
              </Center>
              <Select
                isRequired={true}
                placeholder="Pilih Tim Lawan"
                onChange={(e) => handleChange2(e)}
              >
                {dataTim.map((data) => (
                  <option key={data.id} value={`${data.id},${data.url}`}>
                    {data.namaTim}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
          <Center my={"6"}>
            {pengecekan.length > 0 &&
            pengecekan[0].pembayaran?.datetime_payment != null ? null : (
              <ModalKonfirmasiSewa
                dataKonfirmasi={dataKonfirmasi}
                fungsiReservasi={reservasi}
              />
            )}
          </Center>
        </form>
      </Box>
    );
  }
};

FormSewaSepakbola.propTypes = {
  dataReservasi: PropTypes.object.isRequired,
  dataHariLibur: PropTypes.func.isRequired,
  fungsiCekLibur: PropTypes.func.isRequired,
  cekKetersediaan: PropTypes.func.isRequired,
};

export default FormSewaSepakbola;
