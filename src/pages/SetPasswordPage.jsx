import { useSelector } from "react-redux";
import DocumentTitle from "../components/DocumentTitle";
import { ResetPassword } from "../components/ResetPassword/ResetPassword";
import { selectIsPasswordSet } from "../redux/auth/selectors";
import { useEffect } from "react";
import { useNavigate, useLocation  } from "react-router-dom";

export default function ForgotPasswordPage() {
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");
  const navigate = useNavigate();
  const isPassword = useSelector(selectIsPasswordSet);

  useEffect(() => {
    if (!token || isPassword === true) navigate("/");
  }, [isPassword, navigate, token]);

  return (
    <div>
      <DocumentTitle>Set Password</DocumentTitle>
      <ResetPassword setPasswordReason={true} />
    </div>
  );
}
