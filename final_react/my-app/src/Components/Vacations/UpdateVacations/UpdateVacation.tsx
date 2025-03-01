import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCountries } from "../../../api/ctrApi";
import { getVacationById } from "../../../api/vctApi";
import { format } from 'date-fns';
import { updateVacations } from "../../../api/vctApi";
import { useNavigate } from "react-router-dom";
import CSS from "./update.module.css";

export function UpdateVacation() {
    const { id } = useParams();
    const [countries, setCountries] = useState<any[]>([]);
    const Navigate = useNavigate();
    const [formData, setFormData] = useState<{
        country_id: string;
        description: string;
        since: string;
        till: string;
        price: string;
        foldername: string;
        img: string; 
        country_name:string
    }>({
        country_id: "",
        description: "",
        since: "",
        till: "",
        price: "",
        foldername: "",
        img: "",
        country_name:""
    });

    useEffect(() => {
        fetchCountries().then((data) => setCountries(data));
        // Fetch vacation data if ID exists
        if (id) {
            getVacationById(+id).then((vacation) => {
                if (vacation) {
                    setFormData({
                        country_id: vacation.country_id,
                        description: vacation.description,
                        since: format(new Date(vacation.since), 'yyyy-MM-dd'),
                        till: format(new Date(vacation.till), 'yyyy-MM-dd'),
                        price: vacation.price.toString(),
                        foldername: vacation.foldername,
                        img: vacation.img || "", 
                        country_name: vacation.country_name
                    });
                }
                
            });
        }
        else{
            alert("There's no vacation to update")
            Navigate('/Vacations')
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    img: reader.result as string, 
                }));
            };
            reader.readAsDataURL(file); 
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formattedSince = format(new Date(formData.since), 'MM-dd-yyyy');
        const formattedTill = format(new Date(formData.till), 'MM-dd-yyyy');
        const priceValue = parseFloat(formData.price);
        if (formData.since>formData.till){
            alert("Error: You must return after you go not before.");
            return;
        }
        if (priceValue <= 0 || priceValue > 10000) {
            alert("Error: Price must be greater than 0 and less than or equal to 10,000.");
            return; 
        }
    
        if (id) {
            updateVacations(
                +id,
                +formData.country_id,
                formData.description,
                formattedSince,
                formattedTill,
                priceValue, 
                formData.foldername,
                formData.img 
            );
            console.log("Vacation updated successfully");
        } else {
            console.error("ID is undefined");
        }
    
        Navigate("/Vacations");
    };
    

    return (
        <div className={CSS.cardcontainer}>
            <div className={CSS.updcard}>
                <h2>Update Vacation</h2>
                <form onSubmit={handleSubmit}>
                    <div className={CSS.formgroup}>
                        <label htmlFor="country_id">Country:</label>
                        <select
                            id="country_id"
                            name="country_id"
                            value={formData.country_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={CSS.formgroup}>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={CSS.formgroup}>
                        <label htmlFor="since">From:</label>
                        <input
                            type="date"
                            id="since"
                            name="since"
                            value={formData.since}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={CSS.formgroup}>
                        <label htmlFor="till">Until:</label>
                        <input
                            type="date"
                            id="till"
                            name="till"
                            value={formData.till}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={CSS.formgroup}>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="any"
                            required
                        />
                    </div>

                    <div className={CSS.formgroup}>
                        <label htmlFor="foldername">Folder Name:</label>
                        <input
                            type="text"
                            id="foldername"
                            name="foldername"
                            value={formData.foldername}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={CSS.formgroup}>
                        {formData.img && (
                            <div>
                                <p>Current image:</p>
                                <img src={formData.img} alt="Current" width="200" />
                            </div>
                        )}
                    </div>


                    <div className={CSS.formgroup}>
                        <label htmlFor="img">Select Image:</label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <p>Click to select one.</p>
                    </div>

                    <button className={CSS.btn} type="submit">Update Vacation</button>
                    <br/>
                </form>
                <button className={CSS.btn1} onClick={()=>Navigate('/Vacations')}>Cancel</button>
            </div>
        </div>
    );
}
