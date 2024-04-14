import {Box,FormControl,Input,FormLabel} from "@chakra-ui/react"

const FormBuatTim = () => {
  return (
    <Box>
      <FormControl>
        <FormLabel>Nama Tim</FormLabel>
        <Input
        placeHolder="Masukkan Nama Tim"
        type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Nama Tim</FormLabel>
        <Input
        placeHolder="Logo Tim"
        type="file" />
      </FormControl>
    </Box>
  );
};

export default FormBuatTim;
