import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";

export const UserSignButton = () => {
  return (
    <>
      <div className="flex w-fit py-2">
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton
            userProfileMode="modal"
            afterSignOutUrl="/"
          />
        </SignedIn>

        <SignedOut>
          {/* Signed out users get sign up & sign in button */}
          <div className="flex space-x-2">
            <div className="w-fit mx-auto rounded-lg p-2 border border-cyan-400 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold">
              <SignUpButton mode="modal" />
            </div>
            <div className="w-fit mx-auto rounded-lg p-2 border border-cyan-400 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold">
              <SignInButton mode="modal" />
            </div>
          </div>
        </SignedOut>
      </div>
    </>
  );
};
