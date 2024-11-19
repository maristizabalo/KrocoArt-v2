import { useEffect, useState } from "react";
import Message from "../../components/Message";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";

// ⚠️⚠️⚠️ don't forget this ⚠️⚠️⚠️⚠️
// import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <div>loading</div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div>
          {/* <AdminMenu /> */}
          <table>
            <thead>
              <tr>
                <th >ID</th>
                <th >NAME</th>
                <th >EMAIL</th>
                <th >ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td >{user._id}</td>
                  <td >
                    {editableUserId === user._id ? (
                      <div >
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                        >
                          <p>facheck</p>
                        </button>
                      </div>
                    ) : (
                      <div >
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <p>faedit</p>
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    {editableUserId === user._id ? (
                      <div >
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                        >
                          <p>facheck</p>
                        </button>
                      </div>
                    ) : (
                      <div >
                        <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.name, user.email)
                          }
                        >
                          <p>Faedit</p>
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <p>Color verde faCheck</p>
                    ) : (
                      <p>Color rojo faTimes</p>
                    )}
                  </td>
                  <td>
                    {!user.isAdmin && (
                      <div>
                        <button
                          onClick={() => deleteHandler(user._id)}
                        >
                          BORRAR
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
