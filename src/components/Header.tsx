import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Button, { ButtonVariant } from "./Button";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [showBackButton, setShowBackButton] = React.useState(false);
  const { removeToken } = useAuth();
  const navigate = useNavigate();

  const rootPageMatch = useMatch("/");
  const rootPageWithUrlMatch = useMatch("LiteStockManagement");
  const isUserOnTheHomepage = () =>
    Boolean(rootPageMatch) || Boolean(rootPageWithUrlMatch);

  useEffect(() => {
    if (isUserOnTheHomepage()) {
      setShowBackButton(false);
    } else {
      setShowBackButton(true);
    }
  }, [isUserOnTheHomepage]);

  const removeLocalData = () => {
    localStorage.clear();
    removeToken();
  };

  return (
    <>
      <div>
        {showBackButton && (
          <Button
            type="button"
            variant={ButtonVariant.Icon}
            className="absolute left-6 bottom-4"
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-2xl"
            ></FontAwesomeIcon>
          </Button>
        )}
      </div>

      <h1 className="text-xl text-gray-500">{title}</h1>
      <div
        className="w-15 absolute"
        onClick={removeLocalData}
        style={{ right: "2px" }}
      >
        <Button
          type="button"
          variant={ButtonVariant.Secondary}
          className="self-end"
          style={{
            paddingLeft: "6px",
            paddingRight: "6px",
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
        >
          Log out
        </Button>
      </div>
    </>
  );
}
