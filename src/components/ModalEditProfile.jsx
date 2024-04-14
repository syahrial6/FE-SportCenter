import {Box,Modal,ModalBody,useDisclosure,Image,Center,ModalOverlay,ModalCloseButton,ModalHeader,ModalContent,FormControl,FormLabel,Input,Button,ModalFooter} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { MyContext } from "../Context/Context"
import axios from "axios"
import { API_ENDPOINT } from "../Context/Config"
import swal from "sweetalert"
import PropTypes from "prop-types";

const ModalEditProfile = (props) => {
  const {dataUser,fetchData} = props
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {data} = useContext(MyContext);
  const [nama,setNama] = useState(dataUser.nama)
  const [nohp,setNohp] = useState(dataUser.nohp)
  const [password,setPassword] = useState("")
  const [confPassword,setConfPassword] = useState("")
  const [avatar, setAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  


  const editProfile = async (e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("image", selectedFile);
    formData.append("nohp", nohp);
    formData.append("password", password);
    formData.append("confPassword", confPassword);
    formData.append("role", "user");
    try {
      const response = await axios.patch(`${API_ENDPOINT}/users/${data.id}`,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      swal({
        title: "Good job!",
        text: `${response.data.msg}`,
        icon: "success",
      });
      console.log(response.data)
      onClose()
      fetchData()
    } catch (error) {
      console.log(error.response.data)
      swal({
        title: "Maaf",
        text: `${error.response.data.msg}`,
        icon: "warning",
      });
    }
   
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInBytes = 5 * 1024 * 1024; // Contoh batas ukuran 5MB

    if (!allowedTypes.includes(file.type)) {
      swal({
        title: "Maaf",
        text: `Jenis File Harus Foto`,
        icon: "warning",
      });
      e.target.value = null; // Mengosongkan input file
      if (file.size > maxSizeInBytes) {
        swal({
          title: "Maaf",
          text: `Ukuran Foto Terlalu Besar Max 5MB`,
          icon: "warning",
        });
        e.target.value = null; // Mengosongkan input file

        return;
      }
    }
    setSelectedFile(file);
    setAvatar(URL.createObjectURL(file));
  };
  return (
    <Box mb={"8"}>
        <Button onClick={()=> onOpen()} bgColor={"brand.utama"} color={"white"} _hover={{bgColor:"brand.second"}}>Edit Profile</Button>
      <Modal
      isOpen={isOpen} onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={editProfile}>
        <ModalContent>
          <ModalHeader>Edit Profil</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <Center>
                    <Image
                     src={avatar ? avatar : dataUser.url}
                      borderRadius="full"
                      boxSize="150px"
                    />
                  </Center>
                  <FormControl>
                    <FormLabel>Foto</FormLabel>

                    <Input type="file" onChange={handleFileChange} />
                  </FormControl>
            <FormControl>
              <FormLabel>Nama</FormLabel>
              <Input value={nama}  onChange={(e)=> setNama(e.target.value)} />
            </FormControl>

           
            <FormControl mt={4}>
              <FormLabel>No Hp</FormLabel>
              <Input value={nohp} placeholder='No HP' type="number" onChange={(e)=> setNohp(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Konfirmasi Password</FormLabel>
              <Input type="password"  placeholder='Password' onChange={(e)=> setConfPassword(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={()=> onClose()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
    </Box>
  )
}

ModalEditProfile.propTypes = {
  fetchData: PropTypes.func.isRequired,
  dataUser: PropTypes.object.isRequired,
};

export default ModalEditProfile
