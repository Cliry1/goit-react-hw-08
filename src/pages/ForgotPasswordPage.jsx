import DocumentTitle from '../components/DocumentTitle';
import { ResetPassword } from '../components/ResetPassword/ResetPassword';

export default function ForgotPasswordPage(){
    return (
      <div>
        <DocumentTitle>Reset Password</DocumentTitle>
        <ResetPassword />
      </div>
    );
}