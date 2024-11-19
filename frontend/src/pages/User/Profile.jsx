import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        console.log("Profile updated successfully");
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div>
          <h2>Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div>
              <input
                type="text"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
              >
                Update
              </button>

              <Link
                to="/user-orders"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <div>Loading... componente loader deberia ir aqui</div>}
          </form>
        </div>
  );
};

export default Profile;
