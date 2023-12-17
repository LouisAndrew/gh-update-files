import type { Octokit } from "@octokit/core";

import type { GitHubOctokitArgs } from "./types";
import { convertUtfToBase64 } from "./utf.js";

type GetNewFileContentArgs = {
  fileContent: string;
  newContent: string;
  addNewLine?: boolean;
};

export const updateFileContent = async (
  octokit: Octokit,
  githubArgs: GitHubOctokitArgs & { sha: string | null },
  content: string
) => {
  const { owner, path, repo, sha } = githubArgs;

  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    repo,
    owner,
    path,
    content: convertUtfToBase64(content),
    message: "@louisandrew3/gh-update-files: Append file content",
    ...(sha && { sha }),
  });
};

export const appendFileContent = ({
  fileContent,
  newContent,
  addNewLine,
}: GetNewFileContentArgs) =>
  `${fileContent}${addNewLine ? "\n\n" : ""}${newContent}`;

export const prependFileContent = ({
  fileContent,
  newContent,
  addNewLine,
}: GetNewFileContentArgs) =>
  `${newContent}${addNewLine ? "\n\n" : ""}${fileContent}`;

export const replaceFileContent = ({ newContent }: GetNewFileContentArgs) =>
  `${newContent}`;
