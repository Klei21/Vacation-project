import { useState, useEffect } from "react";
import { fetchCountries } from "../../../api/ctrApi";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import CSS from "../NewVacation/NewVacation.module.css";
import { newVacation } from "../../../api/vctApi";

export function NewVacation() {
    const [countries, setCountries] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCountries().then((data) => setCountries(data));
    }, []);

    const [formData, setFormData] = useState({
        country_id: "",
        description: "",
        since: "",
        till: "",
        price: "",
        foldername: "",
        img: null as File | null // Aquí almacenamos la imagen seleccionada
    });

    // Maneja los cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Maneja el cambio de la imagen seleccionada
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                img: file // Almacena la imagen en el estado
            }));
        }
    };

    // Maneja el evento de arrastrar y soltar la imagen
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]; // Obtener el archivo arrastrado
        if (file && file.type.startsWith("image/")) {
            setFormData((prevData) => ({
                ...prevData,
                img: file // Almacena la imagen en el estado
            }));
        }
    };

    // Previene el comportamiento por defecto para el evento dragover
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const reader = new FileReader()
        const priceValue = parseFloat(formData.price);
        if (priceValue <= 0 || priceValue > 10000) {
            alert("Error: Price must be greater than 0 and less than or equal to 10,000.");
            return;}
        const formattedSince = format(new Date(formData.since), 'MM-dd-yyyy');
        const formattedTill = format(new Date(formData.till), 'MM-dd-yyyy');
        if (formData.since>formData.till){
            alert("Error: You must return after you go not before.");
            return;
        }
        const imgUrl = reader.result as string;
        newVacation(+formData.country_id,formData.description,formattedSince,formattedTill,+formData.price,formData.foldername,imgUrl)
        navigate('/Vacations')
        alert('Vacation added succesfully!')
    };

    return (
        <div className={CSS.cardcontainer}>
            <div className={CSS.updcard}>
                <h2>New Vacation</h2>
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

                    {/* Aquí es donde puedes arrastrar y soltar la imagen */}
                    <div
                        className={CSS.dragDropArea}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <label htmlFor="img">Image:</label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                        />
                        <p>Drag and drop an image here or click to select one.</p>
                    </div>

                    <button className={CSS.btn} type="submit">Add Vacation</button>
                </form>
            </div>
        </div>
    );
}
