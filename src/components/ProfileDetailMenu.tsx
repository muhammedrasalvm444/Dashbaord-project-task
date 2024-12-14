import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setMode } from "../redux/playersSlice";

const ProfileDetailMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Menu>
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        <MenuItem
          onClick={() => {
            dispatch(logout());
            toast.success("Logged out successfully");
            navigate("/login");
            dispatch(setMode("view"));
          }}
        >
          Logout
        </MenuItem>
      </ul>
    </Menu>
  );
};

export default ProfileDetailMenu;

const Menu = styled.div`
  position: absolute;
  top: 43px;
  right: 158px;
  background-color: white;
  border: 0.0625rem solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  z-index: 100;
  box-shadow: 0rem 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  min-width: 8rem;

  transform: translateX(calc(100% + 1rem)); /* Adjust as per layout */
  @media screen and (max-width: 768px) {
    left: -1rem; /* Ensure proper alignment on smaller screens */
  }
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  gap: 0.625rem;
  cursor: pointer;
  color: black;
  &:hover {
    background-color: #f5f5f5;
  }

  svg {
    margin-right: 0.5rem;
  }
`;
