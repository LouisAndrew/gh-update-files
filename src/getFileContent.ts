import type { Octokit } from "@octokit/core";

import type { GitHubOctokitArgs } from "./types";
import { convertBase64ToUtf } from "./utf.js";

export default async (octokit: Octokit, githubArgs: GitHubOctokitArgs) => {
  const { owner, repo, path } = githubArgs;

  const { data: fileContentResponse } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner,
      path,
      repo,
    }
  );

  return fileContentResponse
    ? {
        content: convertBase64ToUtf(
          (fileContentResponse as { content: string }).content
        ),
        sha: (fileContentResponse as { sha: string }).sha,
      }
    : null;
};
