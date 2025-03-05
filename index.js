#!/usr/bin/env node

import toUppercase from '@ricciodev/create-simple-test/utils/toUppercase.js';
import { init } from '@ricciodev/create-simple-test/utils/createProject.js';
import inquirer from 'inquirer';
import { execSync } from 'node:child_process';

(() => inquirer
    .prompt([
        {
            type: "input",
            name: "projectName",
            message: "Enter your project name",
            default: "obi-wan-kenobi"
        }
    ])
    .then(async (answers) => {
        // await init(answers.projectName);
        execSync(`npm install @ricciodev/vue-starter-kit --prefix ${answers.projectName}`, { stdio: "inherit" });
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.error("Cannot render the prompt...");
        } else {
            console.error(error.message);
        }
    }))();