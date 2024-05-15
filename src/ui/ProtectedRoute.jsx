/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  if (user?.role !== "authenticated") {
    navigate("/login");
  }

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (user?.role === "authenticated") return children;
}
