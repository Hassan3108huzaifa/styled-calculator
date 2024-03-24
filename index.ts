#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";

async function typeWelcomeMessage(message: string) {
    for (let i = 0; i < message.length; i++) {
        process.stdout.write(message[i]);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    console.log(); // Add a newline after the message is fully typed
}

async function animateAddition(num1: number, num2: number) {
    const spinner = ora(chalk.bold.yellow("Calculating...")).start();
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    spinner.stop();
    return num1 + num2;
}

async function animateSubtraction(num1: number, num2: number) {
    const spinner = ora(chalk.bold.yellow("Calculating...")).start();
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    spinner.stop();
    return num1 - num2;
}

async function animateMultiplication(num1: number, num2: number) {
    const spinner = ora(chalk.bold.yellow("Calculating...")).start();
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    spinner.stop();
    return num1 * num2;
}

async function animateDivision(num1: number, num2: number) {
    const spinner = ora(chalk.bold.yellow("Calculating...")).start();
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    spinner.stop();
    if (num2 === 0) {
        console.log(chalk.red.bold("Error: Division by zero is not allowed."));
        return;
    }
    return num1 / num2;
}

async function animateExponentiation(base: number, exponent: number) {
    const spinner = ora(chalk.bold.yellow("Calculating...")).start();
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    spinner.stop();
    return Math.pow(base, exponent);
}

async function animateSquareRoot(number: number) {
    const spinner = ora(chalk.bold.yellow("Calculating...")).start();
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    spinner.stop();
    if (number < 0) {
        console.log(chalk.red.bold("Error: Cannot calculate square root of a negative number."));
        return;
    }
    return Math.sqrt(number);
}

async function calculator() {
    await typeWelcomeMessage(chalk.bold.yellow("Welcome to Simple Calculator"));
    await typeWelcomeMessage(chalk.gray("-------------------------------"));

    const numbers = await inquirer.prompt([
        {
            message: chalk.cyan("Enter your first number: "),
            type: "number",
            name: "num1",
        },
        {
            message: chalk.cyan("Enter your second number (leave blank if not needed): "),
            type: "number",
            name: "num2",
            default: null,
            when: answers => answers.num1 !== undefined,
        },
        {
            message: chalk.cyan("Please choose an operation"),
            type: "list",
            name: "operator",
            choices: [
                { name: "Add", value: "add" },
                { name: "Subtract", value: "subtract" },
                { name: "Multiply", value: "multiply" },
                { name: "Divide", value: "divide" },
                { name: "Exponentiate", value: "exponentiate" },
                { name: "Square Root", value: "squareRoot" },
            ],
            pageSize: 9,
        }
    ]);

    await typeWelcomeMessage(chalk.gray("-------------------------------"));

    let result;
    switch (numbers.operator) {
        case "add":
            result = await animateAddition(numbers.num1, numbers.num2);
            break;
        case "subtract":
            result = await animateSubtraction(numbers.num1, numbers.num2);
            break;
        case "multiply":
            result = await animateMultiplication(numbers.num1, numbers.num2);
            break;
        case "divide":
            result = await animateDivision(numbers.num1, numbers.num2);
            break;
        case "exponentiate":
            result = await animateExponentiation(numbers.num1, numbers.num2);
            break;
        case "squareRoot":
            result = await animateSquareRoot(numbers.num1);
            break;
        default:
            console.log(chalk.red.bold("Error: Please choose a valid operation."));
            return;
    }

    if (result !== undefined) {
        console.log(chalk.bold.green(`Result: ${result}`));
    }
}

calculator();
