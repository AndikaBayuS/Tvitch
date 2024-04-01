"use server";

import { blockUser, unBlockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  try {
    const blockedUser = await blockUser(id);

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`);
    }

    return blockedUser;
  } catch {
    throw new Error("Internal Error");
  }
};

export const unBlock = async (id: string) => {
  try {
    const unblockedUser = await unBlockUser(id);

    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
  } catch {
    throw new Error("Internal Error");
  }
};
