import { Box, Image, Text, Center,Table,TableContainer,Td,Tr,Tbody } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ModalEditProfile from "./ModalEditProfile";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { getUserById } from "../Context/Config";

const CardProfil = () => {
  const [dataUser, setDataUser] = useState([]);
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      setDataUser(await getUserById(id));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <Box height={"fit-content"} shadow={"2xl"} maxWidth={"100vw"}>
      <Center>
        <Image
          src={dataUser.url}
          borderRadius="full"
          boxSize="150px"
          alt="Dan Abramov"
        />
      </Center>
      <Box textAlign={"center"}>
        <TableContainer my={"4"}>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td fontSize={"xl"} fontWeight={"bold"}>{dataUser.nama}</Td>
              </Tr>
              <Tr>
                <Td>{dataUser.email}</Td>
              </Tr>
              <Tr>
                <Td>{dataUser.nohp}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <ModalEditProfile dataUser={dataUser} fetchData={fetchData} />
      </Box>
    </Box>
  );
};

CardProfil.propTypes = {
  style: PropTypes.string.isRequired,
  style1: PropTypes.string.isRequired,
};

export default CardProfil;
