import axios from "axios";
import { useEffect } from "react";
import qs from "qs";

const Test = () => {
  const data = {
    trx_id: "1190",
    id_jenis_billing: "o",
    trx_amount: 0,
    customer_name: "UNTAN SEWA SEPAKBOLA COBA 2",
    customer_email: "heri.setiawan@untan.ac.id",
    customer_phone: "08115701771",
    datetime_expired: "2029-12-31 00:00:00",
    description: "Setoran Sewa lapangan sepakbola Untan",
    virtual_account: "9882201900000011",
  };

  const getData = async () => {
    try {
      const response = await axios.post(
        "http://kerjasama.keuangan.untan.ac.id/createva.2024baru.php",
        {
          headers: {
            "Content-Type": "x-www-form-urlencoded",
          },
        },
        qs.stringify(data)
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    getData();
  }, []);

  return <h1>Halo</h1>;
};

export default Test;
