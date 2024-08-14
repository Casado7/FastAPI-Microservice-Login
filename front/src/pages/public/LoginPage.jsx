import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { urls } from '../../constants/urls';
import { useAxios } from '../../hooks/useAxios';
import { Card, CardBody, CardHeader, Typography, Input, Button, Checkbox, CardFooter } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { fetchData, data, loading, error } = useAxios();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleUserChange = (e) => setUser(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    useEffect(() => {
        if (error) {
            toast.error(error.response.data.detail)
        } else {
            if (data && !loading) {
                toast.success('Inicio de Sesión Exitoso');
                login(data);
                navigate('/list_users');
            }
        }
    }, [data, loading, error, navigate, login]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', user);
        formData.append('password', password);
        fetchData({
            url: urls.api_url + "login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: formData
        })
    };


    return (
        <div className="flex justify-center" >
            <Card className="w-96 shadow-lg rounded-lg overflow-hidden border" >
                <CardHeader floated={false} shadow={false} className="text-center">
                    <Typography variant="h4" color="black" className="text-center">
                        Iniciar Sesión
                    </Typography>
                    <Typography className="mt-1 font-normal text-center">
                        Por favor ingresa tus datos.
                    </Typography>
                </CardHeader>
                <CardBody className="bg-white p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4 mb-4 flex flex-col gap-6">
                            <Input
                                label="Usuario"
                                size="lg"
                                value={user}
                                onChange={handleUserChange}
                                required
                            />
                            <Input
                                type="password"
                                label="Contraseña"
                                size="lg"                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <Button color="light-blue" className="mt-6 w-full" type="submit" disabled={loading}>
                            {loading ? 'Cargando...' : 'Iniciar Sesión'}
                        </Button>
                    </form>
                </CardBody>
                <CardFooter className="bg-white">
                    <Typography className="mt-1 text-center font-normal">
                        ¿No tienes una cuenta?{" "}
                        <a href="#" className="font-medium text-blue-500">
                            Regístrate
                        </a>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;