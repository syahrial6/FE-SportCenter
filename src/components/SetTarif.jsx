import { Box, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../Context/Config";
import Loading from "./Loading";
import swal from "sweetalert";
import { NumericFormat } from "react-number-format";

const SetTarif = () => {
  const [tarif, setTarif] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hargaWd, setHargaWd] = useState();
  const [hargaWe, setHargaWe] = useState();

  useEffect(() => {
    getTarif();
  }, []);
  const data = [
    {
      id: "536be314-a843-4ac2-85ec-50fe15a675dd",
      jenisWaktu: "weekend/libur",
      harga: hargaWe,
    },
    {
      id: "2dac393a-5cec-4ad5-a869-728ba0a0cd7e",
      jenisWaktu: "weekday",
      harga: hargaWd,
    },
  ];

  const getTarif = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_ENDPOINT}/tariflapangan`);
      console.log(response.data);
      setTarif(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  const updateTarif = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${API_ENDPOINT}/tariflapangan`, data);
      console.log(response.data);
      swal("Berhasil", "Tarif berhasil diupdate", "success");
      getTarif();
    } catch (error) {
      console.log(error.response.data);
      getTarif();
    }
  };

  const convertToInteger = (uang) => {
    // Menghapus karakter non-angka dan mengonversi menjadi integer
    const cleanedNumber = uang.replace(/\D/g, '');
    const result = parseInt(cleanedNumber, 10);

    return result;
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box bgColor={"white"} rounded={"xl"} p={"2"}>
          <form onSubmit={updateTarif}>
            <FormControl>
              <FormLabel textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
                Set Tarif Lapangan
              </FormLabel>
              <FormLabel>Weekend</FormLabel>
              <NumericFormat
                value={tarif[1].harga}
                onChange={(e) => setHargaWe(convertToInteger(e.target.value))}
                thousandSeparator
                customInput={Input}
              />

              <FormLabel>Weekday</FormLabel>
              <NumericFormat
                value={tarif[0].harga}
                onChange={(e) => setHargaWd(convertToInteger(e.target.value))}
                thousandSeparator
                customInput={Input}
              />
              <Button
                type="submit"
                bgColor={"brand.utama"}
                mt={"4"}
                color={"white"}
              >
                Set
              </Button>
            </FormControl>
          </form>
        </Box>
      )}
    </>
  );
};

export default SetTarif;
