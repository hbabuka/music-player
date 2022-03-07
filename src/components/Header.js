import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faMusic } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import Button from "./shared/Button";

const Header = ({ libraryStatus, setLibraryStatus }) => {
  const handleButtonClick = () => {
    setLibraryStatus(!libraryStatus);
  };
  return (
    <header>
      <Logo className="logo" />
      <Button label="My Library" icon={faListUl} onClick={handleButtonClick} />
    </header>
  );
};

export default Header;
