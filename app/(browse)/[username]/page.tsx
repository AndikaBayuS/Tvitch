import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface PageProps {
  params: {
    username: string;
  }
}

const Page = async ({ params }: PageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedByThisUser = await isBlockedByUser(user.id);

  if(isBlockedByThisUser) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>user: {user.username}</p>
      <p>user_id: {user.id}</p>
      <p>is_following: {`${isFollowing}`}</p>
      <p>is_blocked_by_user: {`${isBlockedByThisUser}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
   );
}

export default Page;
