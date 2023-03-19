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
  githubArgs: GitHubOctokitArgs & { sha: string },
  content: string
) => {
  const { owner, path, repo, sha } = githubArgs;

  console.log(content);
  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    repo,
    owner,
    path,
    sha,
    content: convertUtfToBase64(content),
    message: "@louisandrew3/gh-update-files: Append file content",
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
