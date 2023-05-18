import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {
    authState: { userData, isAuth },
  } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const {
    authState: {
      userData: { accountType },
      isAuth,
    },
  } = useAuth();
  if (!isAuth || accountType != "ADMIN") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const ReviewerProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const {
    authState: {
      userData: { accountType },
      isAuth,
    },
  } = useAuth();
  if (!isAuth || accountType != "REVIEWER") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const ChairProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const {
    authState: {
      userData: { accountType },
      isAuth,
    },
  } = useAuth();
  if (!isAuth || accountType != "CHAIR") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const AuthorProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const {
    authState: {
      userData: { accountType },
      isAuth,
    },
  } = useAuth();
  if (!isAuth || accountType != "AUTHOR") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
