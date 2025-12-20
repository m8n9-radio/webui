"use server";

export async function dislikeAction(uid: string) {
  console.log(`Dislike action called for uid: ${uid}`);

  // TODO: Implement backend API call

  return { success: true, uid, reaction: "dislike" };
}
