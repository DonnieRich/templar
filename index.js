#!/usr/bin/env node

import toUppercase from '@ricciodev/create-simple-test/utils/toUppercase.js';
import { init } from '@ricciodev/create-simple-test/utils/createProject.js';
import inquirer from 'inquirer';
import { execSync } from 'node:child_process';

const scope = '@ricciodev';
const starterKits = [
    'vue'
];

(() => inquirer
    .prompt([
        {
            type: "input",
            name: "projectName",
            message: "Enter your project name",
            default: "obi-wan-kenobi"
        },
        {
            type: "list",
            name: "prefix",
            message: "Select a starter kit",
            choices: [...starterKits]
        }
    ])
    .then(async (answers) => {
        execSync(`npm install ${scope}/${answers.prefix}-starter-kit --install-strategy=nested --prefix ${answers.projectName} --no-package-lock`, { stdio: "inherit" });
        await init(answers.projectName, scope, answers.prefix);
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error("Cannot render the prompt...");
        } else {
            console.error(error.message);
        }
    }))();