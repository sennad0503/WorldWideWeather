import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled.nav`
background: #000;
height: 80px;
display: flex;

justify-content: flex-start;
padding: 0.5rem calc(100vw - 100px) /2);
z-index: 10;

`;
// justify-content: space-between;
export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  aligin-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absoulute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
export const NavMenu = styled.div`
  display: flex;
  aligin-items: center;
  // margin-right: -24px;
  width: 100vw;
  white-space: nowrap;

  @media screen and (max-width: 760px) {
    display: none;
  }
`;
export const NavBtn = styled.nav`
  display: flex;
  aligin-item: center;
  margin-right: 24px;
  justify-content: flex-end;
  width: 100vw;

  @media screen and (max-width: 760px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transtion: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
