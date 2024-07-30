import {
  Box,
  VStack,
  Flex,
  HStack,
  Divider,
  Text,
  Badge,
  Button,
  Link
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CardHistoryReservasi = (props) => {
    const toast = useToast();
  const { reservasi, component } = props;
  
  const status = !reservasi.pembayaran
    ? "Belum Diizinkan"
    : !reservasi.pembayaran.datetime_payment &&
      dayjs(reservasi.pembayaran.datetime_expired).unix() -
        dayjs(new Date().toISOString()).unix() <=
        0
    ? "Expired"
    : !reservasi.pembayaran.datetime_payment
    ? "Menunggu Pembayaran"
    : "Sukses";
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      
      width={{lg:"800px",sm:"300px"}}
      m="auto"
    >
      <VStack spacing={4}>
        <Flex width="100%" justifyItems={"flex-end"}>
            <Text fontWeight={"bold"} fontSize={"md"}>Status Pembayaran :</Text>
          <Badge
            colorScheme={
              status === "Sukses"
                ? "green"
                : status === "Menunggu Pembayaran"
                ? "orange"
                : status === "Belum Dibuat"
                ? "yellow"
                : "red"
            }
          >
            {status}
          </Badge>
        </Flex>
        {component}
        <HStack>
          <Text fontWeight="medium">Tanggal Reservasi:</Text>
          <Text>{reservasi.waktuMulaitgl}</Text>
          <Text>{`${reservasi.waktuMulaijam}-${reservasi.waktuSelesaijam}`}</Text>
        </HStack>
        {reservasi.urlFoto ?   (<Link bgColor={"brand.utama"} color={"white"} p={"2"} rounded={"xl"} target="_blank" href={reservasi.urlFoto}>Url Foto</Link>) : ""}
        <Divider />

        <HStack>
          <Text fontWeight="medium">Nomor VA:</Text>
          <Text>{reservasi.virtualAccount}</Text>
          <CopyToClipboard
            text={reservasi.virtualAccount}
            onCopy={() => {
              toast({
                title: "Berhasil disalin ke clipboard",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }}
          >
               <Button display={status === "Belum Diizinkan" ? "none" : "block"} bgColor="brand.utama">
              <FaCopy fill="white" />
            </Button>
          </CopyToClipboard>
        </HStack>

        <HStack>
          <Text fontWeight="medium">Batas Waktu:</Text>
          <Text>
            {reservasi.pembayaran
              ? dayjs(reservasi.pembayaran.datetime_expired).format(
                  "D-MM-YYYY HH:mm:ss"
                )
              : ""}
          </Text>
        </HStack>

      </VStack>
    </Box>
  );
};
CardHistoryReservasi.propTypes = {
  reservasi: PropTypes.object.isRequired,
  component: PropTypes.element.isRequired,

};

export default CardHistoryReservasi;
