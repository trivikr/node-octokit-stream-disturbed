import { createReadStream, statSync } from "fs";
import { Octokit } from "@octokit/rest";

const auth = process.env.OCTOKIT_AUTH_TOKEN;
const owner = "trivikr"; // Replace with your username
const repo = "node-octokit-stream-disturbed"; // Replace with your fork name, if different.
const tag = "v0.0.1"; // Replace with the tag you want to edit.
const name = "hello_world.zip";

const octokit = new Octokit({ auth });

const release = await octokit.rest.repos.getReleaseByTag({ owner, repo, tag });

const asset_id = release.data.assets.filter((a) => a.name === name)[0]?.id;
if (asset_id) {
  await octokit.rest.repos.deleteReleaseAsset({ owner, repo, asset_id });
}

const release_id = release.data.id;

const data = createReadStream(name);
const dataLength = statSync(name).size;

await octokit.rest.repos.uploadReleaseAsset({
  owner,
  repo,
  release_id,
  name,
  headers: {
    "content-length": dataLength,
    "content-type": "application/zip",
  },
  data,
});
