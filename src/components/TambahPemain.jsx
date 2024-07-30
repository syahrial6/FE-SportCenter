import {
  Box,
  Input,
  Button,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { API_ENDPOINT, getTimByIdTim } from "../Context/Config";
import axios from "axios";
import swal from "sweetalert";
const TambahPemain = (props) => {
  const { dataTim, fetchData } = props;
  const [namaPemain, setNamaPemain] = useState();
  const [noPunggung, setNoPunggung] = useState();
  const [posisi, setPosisi] = useState();

  const tambahPemain = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_ENDPOINT}/pemain`, {
        namaPemain: namaPemain,
        noPunggung: noPunggung,
        posisi: posisi,
        timId: dataTim.id,
      });
      swal("Berhasil", `${response.data.msg}`, "success");
      fetchData();
    } catch (error) {
      swal("Gagal", `${error.response.data.msg}`, "error");
    }
  };

  return (
    <Box>
      <form onSubmit={tambahPemain}>
        <Box display={{ lg: "flex ", sm: "block" }}>
          <FormControl>
            <FormLabel>No Punggung</FormLabel>
            <Input
              required
              type="number"
              placeholder="No Punggung"
              onChange={(e) => setNoPunggung(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nama Pemain</FormLabel>
            <Input
              required
              type="text"
              placeholder="Nama Pemain"
              onChange={(e) => setNamaPemain(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Posisi</FormLabel>
            <Select
              required
              placeholder="Posisi"
              onChange={(e) => setPosisi(e.target.value)}
            >
              <option value="GK">GK</option>
              <option value="CB">CB</option>
              <option value="LB">LB</option>
              <option value="RB">RB</option>
              <option value="DM">DM</option>
              <option value="CM">CM</option>
              <option value="LW">LW</option>
              <option value="RW">RW</option>
              <option value="AM">AM</option>
              <option value="SS">SS</option>
              <option value="ST">ST</option>
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="solid"
          bgColor={"brand.utama"}
          color={"white"}
          _hover={{ bg: "#ffb606" }}
          mt={"6"}
          type="submit"
        >
          Tambah Pemain
        </Button>
      </form>
    </Box>
  );
};

TambahPemain.propTypes = {
  dataTim: PropTypes.object.isRequired,
  getTim: PropTypes.func.isRequired,
};

export default TambahPemain;
