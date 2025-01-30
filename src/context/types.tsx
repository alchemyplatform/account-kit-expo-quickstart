import { User } from "@account-kit/signer";

export enum AuthenticatingState {
	UNAUTHENTICATED = "unauthenticated",
	AWAITING_OTP = "awaiting-otp",
	AUTHENTICATED = "authenticated",
}

export interface AlchemyAuthSessionContextType {
	user: User | null;
	authState: AuthenticatingState | null;
	loading: boolean;
	signInWithOTP: (email: string) => void;
	verifyUserOTP: (otp: string) => void;
	signOutUser: () => void;
}
