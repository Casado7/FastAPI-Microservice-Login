import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { urls } from '../../constants/urls';
import { useAxios } from '../../hooks/useAxios';
import { Card, CardBody, CardHeader, Typography, Input, Button, Checkbox } from '@material-tailwind/react';

const LoginPage = () => {
    const { fetchData, data, loading, error } = useAxios();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleUserChange = (e) => setUser(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    useEffect(() => {
        if (error) {
            toast.error("Error al Iniciar Sesión")
        } else {
            if (data && !loading) {
                    toast.success('Inicio de Sesión Exitoso');
            }
        }
    }, [data, loading, error, ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData= new FormData();
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
        <div>
            <Card color="transparent" shadow={false} className="w-full max-w-md">
                <Typography variant="h4" color="white" className="text-center">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-center">
                    Welcome back! Please enter your details.
                </Typography>
                <form className="mt-8 mb-2" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6">
                        <Typography variant="h6" color="white" className="-mb-3">
                            User
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="User"
                            className=" !border-t-gray-700 focus:!border-t-gray-300 text-white"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={user}
                            onChange={handleUserChange}
                            required
                        />
                        <Typography variant="h6" color="white" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-gray-700 focus:!border-t-gray-300 text-white"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <Button color="blue-gray" className="mt-6" fullWidth type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="font-medium text-white">
                            Sign Up
                        </a>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;