# gh-update-files

This library contains a single function that can be used to update a file in a GitHub repository programmatically using the GitHub API.

## Usage

```js
import { githubUpdateFile } from "@louisandrew3/gh-update-files";

(async () => {
  const successful = await githubUpdateFile({
    accessToken: "...YOUR ACCESS TOKEN",
    owner: "... YOUR GITHUB USERNAME",
    path: "...PATH/TO/FILE.md",
    repo: "...YOUR REPO NAME",
    content: "# Hello world from GitHub API!",
    updateMode: "append",
    addNewLine: true,
  });
})();
```

## Why?

I sync my obsidian files to a private repo in GitHub and I wanted the possibility to update the contents of my vault remotely from my phone, without having to set up Obsidian Sync or any git client. This library allows me to append / prepend any quick notes to markdown files via an API.
