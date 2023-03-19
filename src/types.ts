import { Args } from ".";

export type GitHubOctokitArgs = Pick<Args<"append">, "owner" | "repo" | "path">;
