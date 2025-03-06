import fs from 'fs/promises';
import path from "node:path";
import chalk from 'chalk';
import { execSync } from 'node:child_process';

const updatePackageJson = async (projectPath, requestedPackage, projectName) => {
    const packagePath = path.join(projectPath, 'package.json');
    const stat = await fs.lstat(packagePath);

    if (stat.isFile()) {
        const currentPackageJson = await fs.readFile(packagePath, 'utf8');
        const newFileContent = currentPackageJson.replace(requestedPackage, projectName);
        await fs.writeFile(packagePath, newFileContent, 'utf8');
    }
}

export const init = async (projectName, requestedPackage) => {

    try {

        const currentDir = process.cwd();
        const destination = path.join(currentDir, projectName);
        const fullURL = `https://github.com/${requestedPackage}.git`

        console.log('📑  Copying files...');

        await fs.mkdir(destination);

        execSync(`git clone ${fullURL} .`, { stdio: "inherit", cwd: destination });

        await updatePackageJson(destination, requestedPackage, projectName);

        console.log('📑  Files copied...');

        console.log(chalk.green(`\ncd ${projectName}\nnpm install\nnpm run dev`));
    } catch (error) {
        console.log(error);
    }
};