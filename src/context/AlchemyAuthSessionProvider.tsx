import {
	useContext,
	createContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import { signer } from "../utils/signer";
import { User } from "@account-kit/signer";
import { AlchemyAuthSessionContextType, AuthenticatingState } from "./types";
import { AppLoadingIndicator } from "@/components/app-loading";

const AlchemyAuthSessionContext = createContext<AlchemyAuthSessionContextType>(
	null!
);

export const AlchemyAuthSessionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [authState, setAuthState] = useState<AuthenticatingState>(
		AuthenticatingState.UNAUTHENTICATED
	);
	const [isAuthDetailsLoading, setAuthDetailsLoading] =
		useState<boolean>(false);

	useEffect(() => {
		if (!user) {
			signer.getAuthDetails().then((user) => {
				setUser(user);
				setAuthState(AuthenticatingState.AUTHENTICATED);
			});
		}
	}, []);

	const verifyUserOTP = useCallback(
		async (otpCode: string) => {
			setAuthDetailsLoading(true);
			try {
				const user = await signer.authenticate({
					otpCode,
					type: "otp",
				});

				setUser(user);
				setAuthState(AuthenticatingState.AUTHENTICATED);
			} catch (e) {
				console.error(
					"Unable to verify otp. Check logs for more details: ",
					e
				);
				setAuthState(AuthenticatingState.UNAUTHENTICATED);
			} finally {
				setAuthDetailsLoading(false);
			}
		},
		[user]
	);

	const signInWithOTP = useCallback(async (email: string) => {
		setAuthDetailsLoading(true);
		try {
			signer.authenticate({
				email,
				type: "email",
				emailMode: "otp",
			});

			setAuthState(AuthenticatingState.AWAITING_OTP);
		} catch (e) {
			console.error(
				"Unable to request user OTP. See logs for more details: ",
				e
			);

			setAuthState(AuthenticatingState.UNAUTHENTICATED);
		} finally {
			setAuthDetailsLoading(false);
		}
	}, []);

	const signOutUser = useCallback(async () => {
		await signer.disconnect();
		setUser(null);
		setAuthState(AuthenticatingState.UNAUTHENTICATED);
	}, []);

	return (
		<AlchemyAuthSessionContext.Provider
			value={{
				user,
				authState,
				signOutUser,
				signInWithOTP,
				verifyUserOTP,
				loading: isAuthDetailsLoading,
			}}
		>
			{isAuthDetailsLoading && <AppLoadingIndicator />}
			{children}
		</AlchemyAuthSessionContext.Provider>
	);
};

export const useAlchemyAuthSession = () => {
	const val = useContext(AlchemyAuthSessionContext);

	if (!val) {
		throw new Error(
			"This hook can't be used outside the AlchemyAuthSessionProvider."
		);
	}

	return val;
};
