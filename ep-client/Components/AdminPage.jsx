import AdminHeader from "./AdminHeader";
import Events from "./Events";

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <Events admin={true} />
    </>
  );
};

export default AdminPage;
