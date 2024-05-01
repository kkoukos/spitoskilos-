import { loadEnvConfig } from "@next/env";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

const { execSync } = require("child_process");
const port = process.env.DEV_PORT || 3000;
console.log(port);

// Start the development server
execSync(`next dev -p ${port}`, { stdio: "inherit" });
