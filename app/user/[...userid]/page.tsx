import { auth, currentUser } from "@clerk/nextjs";
import { UserSignButton } from "@/components/UserSignButton";
import { redirect } from "next/navigation";

const UserIdPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();

  return (
    <div>
      <h1>UserIdPage</h1>
      <div className="flex flex-col w-fit border border-cyan-400 rounded-lg text-white font-semibold p-2">
        <p className="text-sm text-black">
          User : {user?.firstName} {user?.lastName}
        </p>
        <div>
          <UserSignButton />
        </div>
      </div>
    </div>
  );
};

export default UserIdPage;