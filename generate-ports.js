const { promises: fs } = require('fs');
const path = require('path');
const child_process = require('child_process');

const [, vcpkgDir, portsDir, overlayDir] = process.argv;

const exec = (cmd, cwd) => new Promise((resolve, reject) => {
  const cp = child_process.execSync(cmd, { stdio: 'inherit', cwd });
  cp.on('exit', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`Command failed: ${cmd}`));
    }
  });
});

const cpr = async (src, dst) => {
  await fs.mkdir(dst, { recursive: true });
  for (const file of await fs.readdir(src)) {
    if ((await fs.stat(file)).isDirectory()) {
      await cp(path.join(src, file), path.join(dst, file));
    } else {
      await fs.copyFile(path.join(src, file), path.join(dst, file));
    }
  }
}

(async () => {
  for (const patchFile of await fs.readdir(portsDir)) {
    console.log(`Applying ${patchFile}`);
    const portname = path.basename(patchFile, path.extname(patchFile));
    await exec(`git apply ${path.join(portsDir, patchFile)}`, vcpkgDir);
    await cpr(path.join(vcpkgDir, 'ports', portname), path.join(overlayDir, portname));
    await exec(`git reset --hard`, vcpkgDir);
  }

  console.log('Patches applied successfully');
})();
