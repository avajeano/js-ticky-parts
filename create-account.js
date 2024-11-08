function createAccount(pin, amount=0) {
    return {
        // if correct pin show account balance   
        checkBalance(inputPin) {
            if (inputPin !== pin) return "invalid PIN";
            return `$${amount}`;
        },
        // if correct pin add to account balance
        deposit(inputPin, depositAmount){
            if (inputPin !== pin) return "invalid PIN";
            amount += depositAmount;
            return `deposited $${depositAmount}, new balance is $${amount}`;
        },
        // if correct pin withdraw from <= balance 
        withdraw(inputPin, withdrawlAmount) {
            if (inputPin !== pin) return "invalid PIN";
            if(withdrawlAmount > amount) return "withdrawl exceeds balance, transaction cancelled";
            amount -= withdrawlAmount;
            return `withdrew $${withdrawlAmount}, new balance is $${amount}`;
        },
        // if correct pin can change pin
        changePin(oldPin, newPin) {
            if (oldPin !== pin) return "invalid PIN";
            pin = newPin;
            return "PIN successfully changed";
        }
    };
}

module.exports = { createAccount };
