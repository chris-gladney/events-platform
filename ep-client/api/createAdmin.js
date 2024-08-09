import axios from "axios";


const ADMIN_URL = "http://localhost:5000/admin/register"

const createAdmin = async (args) => {
  const user = args[2];
  const pwd = args[3];

  try {
    const response = await axios.post(
      ADMIN_URL,
      JSON.stringify({ user, pwd }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );

  } catch (err) {
    console.log(err);
  }
};

createAdmin(process.argv);
