import inquirer from "inquirer";
const users = [
    { pin: 4421, balance: 10000 },
    { pin: 1234, balance: 5000 },
    { pin: 5678, balance: 20000 }
];
console.log("Welcome to CLI ATM Machine!");
console.log("Your session is now secure.");
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter your pin",
        type: "number",
    }
]);
const currentUser = users.find(user => user.pin === pinAnswer.pin);
if (!currentUser) {
    console.log("Incorrect Pincode");
}
else {
    console.log("Correct Pincode!!");
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "What do you want to do?",
            type: "list",
            choices: ["withdraw", "Check balance", "Deposit Money", "Transfer Funds", "Change PIN", "Loan Request", "Log Out"],
        }
    ]);
    if (operationAns.operation === "withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter the amount to withdraw:",
                type: "number",
            },
        ]);
        if (amountAns.amount <= currentUser.balance) {
            currentUser.balance -= amountAns.amount;
            console.log(`Your remaining balance is: ${currentUser.balance}`);
        }
        else {
            console.log(`Insufficient balance. Please try again with a smaller amount.`);
        }
    }
    else if (operationAns.operation === "Check balance") {
        console.log(`Your balance is: ${currentUser.balance}$`);
    }
    else if (operationAns.operation === "Deposit Money") {
        let depositAmountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter Your Enter the amount to deposit:",
                type: "number",
            }
        ]);
        currentUser.balance += depositAmountAns.amount;
        console.log(`Your deposit of ${depositAmountAns.amount} has been successful. Your new balance is ${currentUser.balance}.`);
    }
    else if (operationAns.operation === "Transfer Funds") {
        let recipientAccountNumber = await inquirer.prompt([
            {
                name: "accounNumber",
                message: "Please enter the recipient's account number.",
                type: "number",
            }
        ]);
        let tranferAmount = await inquirer.prompt([
            {
                name: "amount",
                message: "Please enter the amount you want to transfer.",
                type: "number",
            }
        ]);
        currentUser.balance -= tranferAmount.amount;
        console.log(`${tranferAmount.amount} has been successfully transferred to account number ${recipientAccountNumber.accounNumber}. Your remaining balance is ${currentUser.balance}$.`);
    }
    else if (operationAns.operation === "Change PIN") {
        let currentPin = await inquirer.prompt([
            {
                name: "currentPincode",
                message: "Please enter your current PIN to verify your identity.",
                type: "number",
            }
        ]);
        if (currentPin.currentPincode !== pinAnswer.pin) {
            console.log(`Sorry, the PIN you entered is incorrect. Please try again.`);
        }
        else {
            let newPin = await inquirer.prompt([
                {
                    name: "updatedPin",
                    message: "Enter your new PIN.",
                    type: "number",
                }
            ]);
            currentUser.pin = newPin.updatedPin;
            console.log(`Your PIN has been successfully updated.`);
        }
    }
    else if (operationAns.operation === "Loan Request") {
        // Step 1: Loan Amount Input
        let pinNumber = await inquirer.prompt([
            {
                name: "Pin",
                message: "Please enter your current PIN to verify your identity.",
                type: "number",
            }
        ]);
        if (pinNumber.Pin === pinAnswer.pin) {
            let loan = await inquirer.prompt([
                {
                    name: "loanAmount",
                    message: "Enter the loan amount you would like to request:",
                    type: "number",
                }
            ]);
            if (loan.loanAmount <= 0) {
                console.log("Loan amount must be a positive number.");
            }
            else {
                currentUser.balance += loan.loanAmount; // Add loan amount to balance
                console.log(`Your loan of ${loan.loanAmount} has been approved`);
                console.log(`Your new balance is: ${currentUser.balance}`);
            }
        }
        else {
            console.log(`Incorrect Pin code`);
        }
        // Step 2: Check if loan amount is reasonable
    }
    else if (operationAns.operation === "Log Out") {
        console.log("Thank you for using the ATM. Goodbye!");
    }
}
