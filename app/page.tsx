import HomePage from "@/components/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "thecil - Ethereum Block Explorer"
};

export default function Home() {
  return <HomePage />;
}
