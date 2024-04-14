import { Flex, Heading, Text, Divider } from "@chakra-ui/react";

const TentangKami = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="calc(100vh - 200px)"
      padding="4"
    >
      <Heading as="h1" size="xl" mb="4">
        Tentang Kami
      </Heading>
      <Text fontSize="lg" textAlign="center">
        SewaLapangan.com adalah platform yang bertujuan untuk menyediakan informasi dan layanan untuk pencarian lapangan sepakbola yang berkualitas untuk para pecinta olahraga. Kami berkomitmen untuk memudahkan Anda menemukan lapangan sepakbola yang sesuai dengan kebutuhan Anda, baik untuk pertandingan resmi maupun sekadar berlatih bersama teman-teman.
      </Text>
      <Divider my="6" />
      <Flex direction="column" align="center" textAlign="center">
        <Text fontSize="lg" fontWeight="bold">Kontak Kami</Text>
        <Text fontSize="md">
          Jalan Contoh No. 123, Jakarta
          <br />
          Daerah Contoh, Indonesia
          <br />
          Telepon: (021) 1234-5678
          <br />
          Email: info@sewalapangan.com
        </Text>
      </Flex>
    </Flex>
  );
};

export default TentangKami;
