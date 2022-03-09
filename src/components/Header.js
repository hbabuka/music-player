import React from "react";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Logo } from "../assets/logo.svg";
import IconButton from "./shared/IconButton";
import Button from "./shared/Button";
import ThemeToggle from "./ThemeToggle";

const Header = ({ libraryStatus, setLibraryStatus }) => {
  const handleButtonClick = () => {
    setLibraryStatus(!libraryStatus);
  };
  return (
    <header>
      <a href="." className="logo">
        <Logo />
      </a>
      <div className="header-buttons">
        <Button
          label="My Library"
          icon={faHeadphones}
          className="button library-button"
          onClick={handleButtonClick}
        />
        {/* Rendered only on phone screens */}
        <IconButton
          icon={faHeadphones}
          iconsize="xl"
          className="icon-button library-button-mobile"
          onClick={handleButtonClick}
        />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
