import axios from "axios";
import dayjs from "dayjs";

const API_ENDPOINT = "http://localhost:5000";

export { API_ENDPOINT };

// dipanggil di dashboard
export const getUser = async (search) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/users?search=${search}`);
    return response.data;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const getReservasi = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/reservasi`);
    const array2 = response.data.map((item) => ({
      title: item.judul || "Match Day",
      Tim1: item.Tim1 || "",
      Tim2: item.Tim2 || "",
      createdAt: item.createdAt,
      fotographer: item.fotographer || "",
      id: item.id,
      score: item.score || "",
      urlFoto: item.urlFoto || "",
      idTim1: item.idTim1 || "",
      idTim2: item.idTim2 || "",
      isPending: item.isPending,
      isVerified: item.isVerified,
      updatedAt: item.updatedAt,
      trxId:item.trxId,
      pembayaran:item.pembayaran || null,
      virtualAccount:item.virtualAccount,
      waktuMulaitgl: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
        "D MMMM YYYY"
      ),
      waktuSelesaitgl: dayjs(
        new Date(item.waktuSelesai).toLocaleString()
      ).format("D MMMM YYYY"),
      waktuMulaijam: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
        "HH:mm:ss"
      ),
      waktuSelesaijam: dayjs(
        new Date(item.waktuSelesai).toLocaleString()
      ).format("HH:mm:ss"),
      wasit: item.wasit || "",
    }));
      return array2;
  } catch (error) {
    return error.response.data.msg;
  }
};

// jika sudah membayar dan sudah diverifikasi
export const getReservasiComplete = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/reservasi`);
    const array2 = response.data.map((item) => ({
      title: item.judul || "Match Day",
      Tim1: item.Tim1 || "",
      Tim2: item.Tim2 || "",
      createdAt: item.createdAt,
      fotographer: item.fotographer || "",
      id: item.id,
      score: item.score || "",
      urlFoto: item.urlFoto || "",
      idTim1: item.idTim1 || "",
      idTim2: item.idTim2 || "",
      isPending: item.isPending,
      isVerified: item.isVerified,
      updatedAt: item.updatedAt,
      trxId:item.trxId,
      pembayaran:item.pembayaran || null,
      virtualAccount:item.virtualAccount,
      waktuMulaitgl: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
        "D MMMM YYYY"
      ),
      waktuSelesaitgl: dayjs(
        new Date(item.waktuSelesai).toLocaleString()
      ).format("D MMMM YYYY"),
      waktuMulaijam: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
        "HH:mm:ss"
      ),
      waktuSelesaijam: dayjs(
        new Date(item.waktuSelesai).toLocaleString()
      ).format("HH:mm:ss"),
      wasit: item.wasit || "",
    }));
    const array3 = array2.filter((item) => item.pembayaran? item.pembayaran.datetime_payment !== null : null);
    return array3
  } catch (error) {
    return error.response;
  }
};



export const getTim = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/tim`);
    return response.data;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const getTimSaya = async (id) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/tim/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const getReservasiEvent = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/reservasievent`);
    const array2 = response.data.map((item) => ({
      judul: item.judul,
      waktuMulaitgl: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
        "D MMMM YYYY"
      ),
      waktuSelesaitgl: dayjs(
        new Date(item.waktuSelesai).toLocaleString()
      ).format("D MMMM YYYY"),
      waktuMulaijam: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
        "HH:mm:ss"
      ),
      waktuSelesaijam: dayjs(
        new Date(item.waktuSelesai).toLocaleString()
      ).format("HH:mm:ss"),
    }));
    return array2;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const getTimByIdTim = async (idTim) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/tims/${idTim}`);
    return response.data;
  } catch (error) {
    return error.response.data.msg;
  }
};

// pengambilan data tim berdasarkan id user
export const getTimByIdUser = async (id) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/tim/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/users/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const getJamMain = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/jam`);
    return response.data;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const getHariLibur = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/libur`);
    const array2 = response.data.filter((item) => item.is_national_holiday == true);
    return array2;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const getTarif = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/tariflapangan`);
    return response.data;
  } catch (error) {
    return error.response.data
  }
};

