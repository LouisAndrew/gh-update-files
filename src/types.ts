import { Args } from ".";

export type GitHubOctokitArgs = Pick<Args, "owner" | "repo" | "path">;
