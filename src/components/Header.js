import React from "react";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import Button from "./shared/Button";
import ThemeToggle from "./ThemeToggle";

const Header = ({ libraryStatus, setLibraryStatus }) => {
  const handleButtonClick = () => {
    setLibraryStatus(!libraryStatus);
  };
  return (
    <header>
      <a href=".">
        <Logo className="logo" />
      </a>
      <div className="header-buttons">
        <Button
          label="My Library"
          icon={faHeadphones}
          onClick={handleButtonClick}
        />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
