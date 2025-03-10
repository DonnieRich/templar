import fs from 'fs/promises';
import path from "node:path";
import chalk from 'chalk';
import { execSync } from 'node:child_process';

const updatePackageJson = async (projectPath, requestedPackage, projectName) => {

    console.log(chalk.gray('Updating package.json...'));

    const packagePath = path.join(projectPath, 'package.json');
    const stat = await fs.lstat(packagePath);

    if (stat.isFile()) {
        const currentPackageJson = await fs.readFile(packagePath, 'utf8');
        const newFileContent = currentPackageJson.replace(requestedPackage, projectName);
        await fs.writeFile(packagePath, newFileContent, 'utf8');
    }
}

const removeGitFolder = async (projectPath) => {

    console.log(chalk.gray('Removing .git folder...'));

    const gitFolderPath = path.join(projectPath, '.git');
    const stat = await fs.lstat(gitFolderPath);

    if (stat.isDirectory()) {
        await fs.rm(gitFolderPath, {
            recursive: true
        });
    }
}

export const init = async (projectName, requestedPackage) => {

    try {

        const currentDir = process.cwd();
        const destination = path.join(currentDir, projectName);
        const fullURL = `https://github.com/${requestedPackage}.git`

        console.log(chalk.gray('📑  Copying files...'));

        await fs.mkdir(destination);
        execSync(`git clone --depth 1 ${fullURL} .`, { stdio: "inherit", cwd: destination });

        console.log(chalk.gray('📑  Files copied...'));

        await removeGitFolder(destination);
        await updatePackageJson(destination, requestedPackage, projectName);

        console.log(chalk.green(`\ncd ${projectName}\nnpm install\nnpm run dev`));
    } catch (error) {
        console.log(chalk.red(error));
    }
};