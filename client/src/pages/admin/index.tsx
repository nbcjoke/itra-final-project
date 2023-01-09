import react, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserModel } from "../../models/userModel";
import { UserService } from "../../services/userService";
import { Typography } from "@mui/material";

import styles from "./style.module.css";

export const Admin: FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response: any = await UserService.fetchUsers();
    setUsers(response);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4">Admin</Typography>
      <div className={styles.linksContainer}>
        {users.map((user) => {
          return (
            <Link to={`/profile/${user._id}`} key={user._id}>
              <div className={styles.link}>{user.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
