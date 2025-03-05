import fs from 'fs/promises';
import { fileURLToPath } from "node:url";
import path from "node:path";
import chalk from 'chalk';

export const copyTemplateFilesAndFolders = async (source, destination, projectName) => {
    const filesAndFolders = await fs.readdir(source);

    for (const entry of filesAndFolders) {

        const currentSource = path.join(source, entry);
        const currentDestination = path.join(destination, entry);

        const stat = await fs.lstat(currentSource);

        if (stat.isDirectory()) {

            if (/node_modules/.test(currentSource)) {
                return;
            }

            await fs.mkdir(currentDestination);
            await copyTemplateFilesAndFolders(currentSource, currentDestination);

        } else {

            // If the file is package.json we replace the default name with the one provided by the user
            if (/package.json/.test(currentSource)) {
                const currentPackageJson = await fs.readFile(currentSource, 'utf8');
                const newFileContent = currentPackageJson.replace(/custom-scaffolding/g, projectName);

                await fs.writeFile(currentDestination, newFileContent, 'utf8');
            } else {
                await fs.copyFile(currentSource, currentDestination);
            }

        }
    }
};

export const init = async (projectName, scope, prefix) => {

    const destination = path.join(process.cwd(), projectName);

    // const source = path.resolve(
    //     path.dirname(fileURLToPath(import.meta.url)),
    //     "../template/vue"
    // );
    const source = path.join(process.cwd(), projectName, `/node_modules/${scope}/${prefix}-starter-kit`);

    try {
        console.log('📑  Copying files...');

        await fs.mkdir(destination);
        await copyTemplateFilesAndFolders(source, destination, projectName);

        console.log('📑  Files copied...');
        console.log(chalk.green(`\ncd ${projectName}\nnpm install\nnpm run dev`));
    } catch (error) {
        console.log(error);
    }
};