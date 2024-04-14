
import { useNavigate } from 'react-router-dom'
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Box textAlign="center" mt="20">
          <Heading size="xl" mb="4">
            404 - Page Not Found
          </Heading>
          <Text mb="8">Upps...Halaman Yang Kamu Cari Sepertinya Tidak Ada</Text>
          <Button bgColor={"brand.utama"} color={"white"} onClick={()=>navigate(-1)}>
            Kembali
          </Button>
        </Box>
      );
}

export default NotFound
