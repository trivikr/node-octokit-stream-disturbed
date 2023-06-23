import { Octokit } from "@octokit/rest";

const auth = process.env.OCTOKIT_AUTH_TOKEN;
const owner = "trivikr"; // Replace with your username
const repo = "node-octokit-stream-disturbed"; // Replace with your fork name, if different.
const tag = "v0.0.1"; // Replace with the tag you want to edit.
const name = "test";

const octokit = new Octokit({ auth });

const release = await octokit.rest.repos.getReleaseByTag({ owner, repo, tag });

const asset_id = release.data.assets.filter((a) => a.name === name)[0]?.id;
if (asset_id) {
  await octokit.rest.repos.deleteReleaseAsset({ owner, repo, asset_id });
}

const release_id = release.data.id;
const chunks = ["hello", "world"];
const data = new ReadableStream({
  start(controller) {
    chunks.forEach((chunk) => controller.enqueue(chunk));
    controller.close();
  },
});

await octokit.rest.repos.uploadReleaseAsset({
  owner,
  repo,
  release_id,
  name: "test",
  headers: {
    "content-length": chunks.join("").length,
    "content-type": "text",
  },
  data,
});
