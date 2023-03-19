import { Octokit } from "@octokit/core";

import getFileContent from "./getFileContent.js";
import {
  appendFileContent,
  prependFileContent,
  updateFileContent,
} from "./updateFileContent.js";

type UpdateMode = "append" | "prepend" | "replace";

export type Args<T extends UpdateMode> = {
  /**
   * Owner of the GitHub repository.
   */
  owner: string;
  /**
   * Name of the GitHub repository.
   */
  repo: string;
  /**
   * File path of the content to be updated.
   */
  path: string;
  /**
   * GitHub personal access token.
   */
  accessToken: string;
  /**
   * Mode of updating the content.
   */
  updateMode: T;
  /**
   * Content to be appended, prepended, or replaced to the corresponding file.
   */
  content: string;
  /**
   * Whether a new line should be added before (when appending) or after (when prepending) the content.
   * @default false
   */
  addNewLine: T extends "append" | "prepend" ? boolean : undefined;
};

const isAppendPrependMode = (
  args: Args<UpdateMode>
): args is Args<"append" | "prepend"> =>
  ["prepend", "append"].includes(args.updateMode);

/**
 * Updates a single file's content in a GitHub repository via the GitHub API.
 * @throws Native errors from GitHub's `@octokit/core` library.
 * @returns A boolean value, indicating whether the file was updated successfully.
 */
const githubUpdateFile = async <T extends UpdateMode>(
  args: Args<T>
): Promise<boolean> => {
  const { owner, repo, path, accessToken, updateMode, content } = args;

  const octokit = new Octokit({
    auth: accessToken,
  });

  const fileContent = await getFileContent(octokit, { owner, repo, path });
  if (fileContent) {
    const { sha } = fileContent;
    const updateFileGithubArgs = { owner, repo, path, sha };

    if (isAppendPrependMode(args)) {
      const { addNewLine } = args;

      const options = {
        addNewLine,
        fileContent: fileContent.content,
        newContent: content,
      };

      await updateFileContent(
        octokit,
        updateFileGithubArgs,
        updateMode === "append"
          ? appendFileContent(options)
          : prependFileContent(options)
      );
    } else {
      // eslint-disable-next-line
      console.warn("Replacing file content, please make sure that you know what you're doing..");
      await updateFileContent(octokit, updateFileGithubArgs, content);
    }

    return true;
  }

  return false;
};

export { githubUpdateFile };
