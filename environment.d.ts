declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ALCHEMY_API_KEY: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
      NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
      NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string;
      NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string;
    // NEXT_PUBLIC_SUPPORTED_CHAINS: string;
    // NEXT_PUBLIC_WALLET_CONNECT_ID: string;
  }
}
  }

export { };