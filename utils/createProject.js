import fs from 'fs/promises';
import path from "node:path";
import chalk from 'chalk';
import { execSync } from 'node:child_process';
import os from 'node:os';

// export const copyTemplateFilesAndFolders = async (source, destination, projectName, requestedPackage) => {
//     const filesAndFolders = await fs.readdir(source);

//     for (const entry of filesAndFolders) {

//         const currentSource = path.join(source, entry);
//         const currentDestination = path.join(destination, entry);

//         const stat = await fs.lstat(currentSource);

//         if (stat.isDirectory()) {

//             // Avoid overwriting temp node_modules folder
//             if (!/node_modules/.test(entry)) {
//                 await fs.mkdir(currentDestination);
//                 await copyTemplateFilesAndFolders(currentSource, currentDestination);
//             }

//         } else {

//             // If the file is package.json we replace the default name with the one provided by the user
//             if (/package.json/.test(currentSource)) {
//                 const currentPackageJson = await fs.readFile(currentSource, 'utf8');
//                 const newFileContent = currentPackageJson.replace(requestedPackage, projectName);

//                 await fs.writeFile(currentDestination, newFileContent, 'utf8');
//             } else {
//                 await fs.copyFile(currentSource, currentDestination);
//             }

//         }
//     }
// };

const updatePackageJson = async (path, requestedPackage, projectName) => {
    const packagePath = path.join(path, 'package.json');
    const stat = await fs.lstat(packagePath);

    if (stat.isFile()) {
        const currentPackageJson = await fs.readFile(packagePath, 'utf8');
        const newFileContent = currentPackageJson.replace(requestedPackage, projectName);
        await fs.writeFile(packagePath, newFileContent, 'utf8');
    }
}

export const init = async (projectName, fullURL) => {

    try {

        const currentDir = process.cwd();
        const destination = path.join(currentDir, projectName);

        console.log('📑  Copying files...');

        await fs.mkdir(destination);

        execSync(`git clone ${fullURL}`, { stdio: "inherit", cwd: destination });

        await updatePackageJson(destination, requestedPackage, projectName);
        // await copyTemplateFilesAndFolders(source, destination, projectName, requestedPackage);

        console.log('📑  Files copied...');

        console.log(chalk.green(`\ncd ${projectName}\nnpm install\nnpm run dev`));
    } catch (error) {
        console.log(error);
    }
};