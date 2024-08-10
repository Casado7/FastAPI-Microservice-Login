import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { urls } from '../../constants/urls';
import { Card, Typography } from "@material-tailwind/react";
import { useAxios } from '../../hooks/useAxios';

const TABLE_HEAD = ["Username", "Email", "First Name", "Last Name", "Disabled", ""];


export default function ListUsersPage() {
    const { fetchData, data, loading, error } = useAxios();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchData({
            url: urls.api_url + "users",
            method: 'GET',
        })
    }, []);

    useEffect(() => {
        if (error) {
            toast.error('Error al cargar los usuarios');
        } else {
            if (data && !loading) {
                setUsers(data);
            }
        }
    }, [data, loading, error]);



    return (
        <div className="p-4">
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(({ _id, username, email, first_name, last_name, disabled }, index) => {
                            const isLast = index === users.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={_id}>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {username}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {first_name}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {last_name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {disabled ? 'Yes' : 'No'}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} bg-blue-gray-50/50`}>
                                        <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                                            Edit
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
