export interface ReactionResult {
  success: boolean;
  error?: string;
}

export interface CheckReactionResult {
  hasReacted: boolean;
  reaction?: "like" | "dislike";
}
