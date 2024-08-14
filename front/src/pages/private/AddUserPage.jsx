import UserForm from '../../forms/private/UserForm';

const AddUserPage = () => {
    return (
        <div className="p-4 ">
            <div className="w-full p-6 bg-white rounded-lg">
                <h1 className="text-2xl font-semibold mb-6 text-center">Add User</h1>
                <UserForm></UserForm>
            </div>
        </div>
    );
};

export default AddUserPage;
