import { readFileSync, writeFileSync } from "node:fs";

const [cookieJarPath, storageStatePath] = process.argv.slice(2);
if (!cookieJarPath || !storageStatePath) {
  throw new Error("Usage: node scripts/create-preview-storage.mjs <cookie-jar> <storage-state>");
}

const cookies = readFileSync(cookieJarPath, "utf8")
  .split("\n")
  .filter((line) => line && (!line.startsWith("#") || line.startsWith("#HttpOnly_")))
  .map((line) => {
    const [rawDomain, , path, secure, expires, name, value] = line.split("\t");
    const httpOnly = rawDomain.startsWith("#HttpOnly_");
    const domain = rawDomain.replace("#HttpOnly_", "");
    return {
      domain,
      expires: Number(expires),
      httpOnly,
      name,
      path,
      sameSite: "Lax",
      secure: secure === "TRUE",
      value,
    };
  });

writeFileSync(storageStatePath, JSON.stringify({ cookies, origins: [] }));
