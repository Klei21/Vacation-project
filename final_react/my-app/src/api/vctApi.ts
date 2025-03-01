import axios from "axios";

export const get_my_vacations = async(user_id:number)=>{
    const response = await axios.get(`http://127.0.0.1:5000/my-vacations/${user_id}`);
    console.log(response.data)
    return response.data 
}
export const fetchVacations = async()=>{
    const response = await axios.get("http://127.0.0.1:5000/get-vacations");
    return response.data;
}

export const addLike = async(user_id:number,vacation_id:number)=>{
    const response = await axios.post("http://127.0.0.1:5000/like", {user_id,vacation_id});
    return response.data;
}

export const delLike = async(user_id:number,vacation_id:number)=>{
    const response = await axios.delete(`http://127.0.0.1:5000/like`, { data: { user_id, vacation_id } });
    return response.data;
}

export const newVacation = async(country_id:number,description:String,since:string,till:string,price:number,foldername:string,img:string)=>{
    const response = await axios.post(`http://127.0.0.1:5000/add-vacation`, { country_id,description,since, till, price, foldername,img });
    return response.data;
}

export const updateVacations = async(vct_id:number,country_id:number,description:String,since:string,till:string,price:number,foldername:string,img:string)=>{
    const response = await axios.patch(`http://127.0.0.1:5000/upd-vacation/`+vct_id, { country_id,description,since, till, price, foldername,img });
    return response.data;
}

export const deleteVacations = async(vct_id:number)=>{
    const response = await axios.delete(`http://127.0.0.1:5000/del-vacation/`+vct_id);
    console.log("Vacation deleted")
    return response.data;
}

export const getVacationById = async(vid:number)=>{
    const response = await axios.get(`http://127.0.0.1:5000/vacation/`+vid);
    return response.data;
}

export const getVacationStatus = async()=>{
    const response = await axios.get(`http://127.0.0.1:5000/vacationstatus`);
    console.log(response.data)
    return response.data;
}
