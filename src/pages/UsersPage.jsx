import UserForm from "@components/users/UserForm";
import UserTable from "@components/users/UserTable";

const UsersPage = () => {
  return (
    <div className="mx-auto max-w-screen-xl space-y-4">
      <UserForm />
      <UserTable />
    </div>
  );
};
export default UsersPage;
