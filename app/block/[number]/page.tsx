"use client";

const Page = ({ params }: { params: { number: string } }) => {
  return <div className="p-12 min-h-screen">Block#: {params.number}</div>;
};

export default Page;
