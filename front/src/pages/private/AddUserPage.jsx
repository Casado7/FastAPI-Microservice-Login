import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { urls } from '../../constants/urls';
import { Button, Input } from '@material-tailwind/react';
import { useAxios } from '../../hooks/useAxios';

const AddUserPage = () => {
    const { fetchData, data, loading, error } = useAxios();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: ''
    });

    useEffect(() => {
        if (error) {
            toast.error(error.response.data.detail)
        } else {
            if (data && !loading) {
                toast.success('Registro Exitoso de Usuario');
            }
        }
    }, [data, loading, error,]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData({
            url: urls.api_url + "users",
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: formData
        })
    };
    return (
        <div className="p-4 ">
            <div className="w-full p-6 bg-white rounded-lg">
                <h1 className="text-2xl font-semibold mb-6 text-center">Crear Usuario</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label='Username'
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full"
                        required
                    />
                    <Input
                        label='Password'
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full"
                        required
                    />
                    <Input
                        label='Email'
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                        required
                    />
                    <Input
                        label='Nombre'
                        type="text"
                        placeholder="Nombre"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full"
                        required
                    />
                    <Input
                        label='Apellido'
                        type="text"
                        placeholder="Apellido"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full"
                        required
                    />
                    <Button type="submit" color="blue" className="w-full">
                        Crear Usuario
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddUserPage;
