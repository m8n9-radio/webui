"use server";

export async function likeAction(uid: string) {
  console.log(`Like action called for uid: ${uid}`);

  // TODO: Implement backend API call

  return { success: true, uid, reaction: "like" };
}
