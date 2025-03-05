#!/usr/bin/env node

import { init } from '@ricciodev/create-simple-test/utils/createProject.js';
import inquirer from 'inquirer';

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
    .then((answers) => {
        const requestedPackage = `${scope}/${answers.prefix}-starter-kit`;
        init(answers.projectName, requestedPackage);
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error("Cannot render the prompt...");
        } else {
            console.log(error);
            console.error(error.message);
        }
    }))();