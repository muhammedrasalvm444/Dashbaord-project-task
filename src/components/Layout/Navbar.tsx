import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { GetProfileData } from "../../api/authApi";
import { ProfileType } from "../Types/Types";
import ProfileDetailMenu from "../ProfileDetailMenu";

const Navbar: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await GetProfileData();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const getUserInitials = (name: string) => {
    const [first, last] = name.split(" ");
    return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
  };

  return (
    <NavbarContainer>
      <MenuSection>
        <MenuIcon />
        <Title>Typography</Title>
      </MenuSection>
      <ProfileSection>
        <StarIcon />
        <Avatar
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          {profile?.avatar ? (
            <img src={profile.avatar} alt="User Avatar" />
          ) : (
            <Initials>
              {profile?.name ? getUserInitials(profile.name) : "OP"}
            </Initials>
          )}
        </Avatar>
      </ProfileSection>
      {open && <ProfileDetailMenu />}
    </NavbarContainer>
  );
};

export default Navbar;

// Styled Components
const NavbarContainer = styled.div`
  background-color: #007bff;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const MenuSection = styled.div`
  display: flex;
  gap: 0.85rem;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const MenuIcon = styled(IoMdMenu)`
  font-size: 1.5rem;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 0.85rem;
  align-items: center;
`;

const StarIcon = styled(FaStar)`
  font-size: 1.25rem;
`;

const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Initials = styled.span`
  color: white;
  font-size: 0.875rem;
  font-weight: bold;
`;
