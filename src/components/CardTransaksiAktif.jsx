import {
  Card,
  Text,
  Box,
  Heading,
  CardBody,
  CardHeader,
  useToast,
  Button
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getHistoryReservasi, getReservasiEventByIdUser } from "../Context/Config";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import Loading from "./Loading";
import {NumericFormat} from "react-number-format";

const CardTransaksiAktif = ({ dataTim, idUser }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [historyReservasi, setHistoryReservasi] = useState([]);

  const historyReservasiAktif = historyReservasi.length > 0 
    ? historyReservasi.filter((item) => {
        const pembayaran = item?.pembayaran;
        const datetimeExpired = pembayaran?.datetime_expired;
        const datetimePayment = pembayaran?.datetime_payment;

        if (datetimeExpired && datetimePayment === null) {
          return new Date(datetimeExpired) > new Date();
        }

        return false;
      })
    : [];

  

  const getTransaksiAktif = async () => {
    try {
      const fetchedData = await Promise.all(
        dataTim.map(async (data) => {
          const response = await getHistoryReservasi(data.id);
          const responseEvent = await getReservasiEventByIdUser(idUser);
          return [...response, ...responseEvent];
        })
      );
      setHistoryReservasi(fetchedData.flat());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getTransaksiAktif();
      setLoading(false);
    };
    
    fetchData();
  }, [dataTim, idUser]);

  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
        historyReservasiAktif.map((data) => (
          <Card
            key={data.id} // Pastikan key diletakkan pada elemen yang berulang
            m={"auto"}
            my={"4"}
            width={"80%"}
            bgColor={"brand.utama"}
            color={"white"}
            visibility={historyReservasiAktif.length > 0 ? "visible" : "hidden"}
          >
            <CardHeader>
              <Heading size="md">Transaksi Aktif/Belum Dibayar</Heading>
            </CardHeader>
            <CardBody>
              <Box>
              <Text mt={1} display={"inline-block"}>
                    <strong>Bank Nasional Indonesia (BNI)</strong>
                  </Text>
                <Box display={"flex"}>
               
                  <Text mt={2}>
                    <strong>Virtual Account:</strong> {data.pembayaran.virtual_account}
                  </Text>

                  <CopyToClipboard
                    text={data.pembayaran.virtual_account}
                    onCopy={() => {
                      toast({
                        title: "Berhasil disalin ke clipboard",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                    }}
                  >
                    <Button
                      ml={"2"}
                      display={data.status === "Belum Diizinkan" ? "none" : "block"}
                      bgColor="brand.utama"
                    >
                      <FaCopy fill="white" />
                    </Button>
                  </CopyToClipboard>
                </Box>
                <Text>
                  <strong>Kebutuhan Reservasi:</strong> {data.Tim1 ? `${data.Tim1.namaTim} VS ${data.Tim2.namaTim}` : data.judul}
                </Text>
                <Text>
                  <strong>Jumlah: </strong>
                  <NumericFormat
                value={data.pembayaran.trx_amount.toLocaleString("id-ID")}
                prefix="Rp"
                thousandSeparator
                displayType="text"
              />
                  
                 
                </Text>
                <Text>
                  <strong>Batas Waktu:</strong> {dayjs(data.pembayaran.datetime_expired).format("D MMMM YYYY HH:mm")}
                </Text>
                {/* <Text
                  fontWeight={"bold"}
                  color={transaction.status === "pending" ? "red.500" : "green.200"}
                >
                  **Status:** {transaction.status}
                </Text> */}
              </Box>
            </CardBody>
          </Card>
        ))
      )}
    </Box>
  );
};

CardTransaksiAktif.propTypes = {
  dataTim: PropTypes.array.isRequired,
  idUser: PropTypes.string.isRequired,
};

export default CardTransaksiAktif;
