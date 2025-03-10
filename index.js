#!/usr/bin/env node

import { init } from '@ricciodev/create-simple-test/utils/createProject.js';
import { allowedPackages, starterKits, scope } from '@ricciodev/create-simple-test/utils/allowedPackages.js';
import inquirer from 'inquirer';

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

        if (!allowedPackages().includes(requestedPackage)) {
            throw new Error("Invalid package");
        }

        init(answers.projectName, requestedPackage);
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error("Cannot render the prompt...");
        } else {
            console.error(error.message);
        }
    }))();