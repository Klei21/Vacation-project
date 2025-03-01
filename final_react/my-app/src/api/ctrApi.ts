import axios from 'axios';

export const fetchCountries = async()=>{
    const response = await axios.get("http://127.0.0.1:5000/countries");
    return response.data;
}

export const addLike = async(user_id:number,vacation_id:number)=>{
    const response = await axios.post("http://127.0.0.1:5000/like", {user_id,vacation_id});
    return response.data;
}