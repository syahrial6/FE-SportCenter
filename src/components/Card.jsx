import {
  Text,
  Divider,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Kartu = () => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Heading size="md">Harga Mulai Dari</Heading>
        <Text fontWeight={"bold"} color="blue.600" fontSize="3xl">
          Rp. 1.400.000
        </Text>
      </CardBody>
      <Divider />
      
    </Card>
  );
};

export default Kartu;
