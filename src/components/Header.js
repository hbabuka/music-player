import React from "react";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import Button from "./shared/Button";

const Header = ({ libraryStatus, setLibraryStatus }) => {
  const handleButtonClick = () => {
    setLibraryStatus(!libraryStatus);
  };
  return (
    <header>
      <a href=".">
        <Logo className="logo" />
      </a>
      <Button
        label="My Library"
        icon={faHeadphones}
        onClick={handleButtonClick}
      />
    </header>
  );
};

export default Header;
