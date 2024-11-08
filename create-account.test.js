const { createAccount } = require("./create-account");

describe("createAccount", function() {
  let account;
  let bigAccount;

  beforeEach(function() {
    account = createAccount("1234");
    bigAccount = createAccount("4321", 10000);
  });

  it("has four methods on it", function() {
    expect(account.checkBalance).toBeInstanceOf(Function);
    expect(account.deposit).toBeInstanceOf(Function);
    expect(account.withdraw).toBeInstanceOf(Function);
    expect(account.changePin).toBeInstanceOf(Function);
  });

  it("accepts an optional starting balance as a second argument", function() {
    expect(bigAccount.checkBalance("4321")).toBe("$10000");
  });

  describe("checkBalance", function() {
    it("returns 'invalid PIN' if the PIN doesn't match", function() {
      expect(account.checkBalance("nope")).toBe("invalid PIN");
    });

    it("returns the balance if the pin is correct", function() {
      expect(account.checkBalance("1234")).toBe("$0");
    });
  });

  describe("deposit", function() {
    it("returns 'invalid PIN' if the PIN doesn't match", function() {
      expect(account.deposit("nope", 100)).toBe("invalid PIN");
    });

    it("adds the amount to the account balance", function() {
      expect(account.deposit("1234", 100)).toBe(
        "deposited $100, new balance is $100"
      );
      expect(account.deposit("1234", 200)).toBe(
        "deposited $200, new balance is $300"
      );
      expect(account.checkBalance("1234")).toBe("$300");
    });
  });

  describe("withdraw", function() {
    it("returns 'invalid PIN' if the PIN doesn't match", function() {
      expect(bigAccount.withdraw("nope", 100)).toBe("invalid PIN");
    });

    it("subtracts the amount from the account balance", function() {
      expect(bigAccount.withdraw("4321", 250)).toBe(
        "withdrew $250, new balance is $9750"
      );
      expect(bigAccount.withdraw("4321", 1000)).toBe(
        "withdrew $1000, new balance is $8750"
      );
    });

    it("prohibits you from withdrawing more than you have", function() {
      expect(account.withdraw("1234", 50)).toBe(
        "withdrawl exceeds balance, transaction cancelled"
      );
    });
  });

  describe("changePin", function() {
    it("returns 'invalid PIN' if the PIN doesn't match", function() {
      expect(bigAccount.withdraw("nope", 100)).toBe("invalid PIN");
    });

    it("changes the PIN with a success message if the PIN matches", function() {
      expect(account.changePin("1234", "5678")).toBe(
        "PIN successfully changed"
      );
      expect(account.checkBalance("1234")).toBe("invalid PIN");
      expect(account.checkBalance("5678")).toBe("$0");
    });
  });
});
