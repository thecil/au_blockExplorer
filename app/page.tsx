import HomePageController from "@/components/HomePageController";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "thecil - Ethereum Block Explorer"
};

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <HomePageController />
    </main>
  );
}
