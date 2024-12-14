import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation(); // Get current location

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to check if a path is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarContainer>
      {/* Logo */}
      <LogoSection>
        <Avatar>
          <img
            src="https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Logo"
            style={{ marginRight: "0.5rem" }}
          />
        </Avatar>
        <span>Logoipsum</span>
      </LogoSection>

      {/* Collapsible List */}
      <ListContainer>
        <ListItem onClick={toggleExpand}>
          <FaStar />
          <span>List item</span>
          {isExpanded ? <IoChevronUp /> : <IoChevronDown />}
        </ListItem>

        {isExpanded && (
          <NestedList>
            <NestedItem active={isActive("/players")}>
              <Link to="/players">
                <FaStar />
                <span>Players</span>
              </Link>
            </NestedItem>
            <NestedItem active={isActive("/player/create")}>
              <FaStar />
              <span>List item</span>
            </NestedItem>
            <NestedItem active={isActive("/clubs")}>
              <FaStar />
              <span>List item</span>
            </NestedItem>
          </NestedList>
        )}
      </ListContainer>
    </SidebarContainer>
  );
};

export default Sidebar;

// Styled Components
const SidebarContainer = styled.div`
  width: 12rem;
  height: 100vh;
  background-color: #f8f9fa;
  color: #343a40;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: Arial, sans-serif;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  color: #212529;
  gap: 0.3rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #e9ecef;
  }

  svg {
    margin-right: 0.5rem;
    color: #6c757d;
  }
`;

const NestedList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
`;

const NestedItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#e9ecef" : "transparent")};

  a {
    text-decoration: none;
    color: ${({ active }) => (active ? "#007bff" : "#343a40")};
    display: flex;
    align-items: center;
    width: 100%;
  }

  svg {
    margin-right: 0.5rem;
    color: #6c757d;
  }

  &:hover {
    background-color: #e9ecef;
  }
`;

const Avatar = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
