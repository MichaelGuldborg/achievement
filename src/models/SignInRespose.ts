import Authorization from "./Authorization";
import User from "./User";

export interface SignInResponse {
    authorization: Authorization;
    user: Required<User>;
}

export default SignInResponse;