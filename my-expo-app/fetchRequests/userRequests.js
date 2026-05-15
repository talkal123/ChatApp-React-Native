import axios from 'axios';



export const registerUser = async (user) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', user);
    console.log('User created:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "שגיאת שרת כללית";
    console.error('Error fetching data:', errorMessage);
    throw errorMessage;
  }

}



