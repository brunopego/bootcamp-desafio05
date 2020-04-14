import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface AllTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): AllTransactions {
    const allTransactions: AllTransactions = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return allTransactions;
  }

  public getBalance(): Balance {
    const income = this.getTotalIncome();
    const outcome = this.getTotalOutcome();
    const total = income - outcome;
    const balance: Balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }

  private getTotalIncome(): number {
    const initialValue = 0;
    const income = this.transactions.reduce(function red(accum, curr) {
      return curr.type === 'income' ? accum + curr.value : accum;
    }, initialValue);
    return income || 0;
  }

  private getTotalOutcome(): number {
    const initialValue = 0;
    const outcome = this.transactions.reduce(function red(accum, curr) {
      return curr.type === 'outcome' ? accum + curr.value : accum;
    }, initialValue);
    return outcome || 0;
  }
}

export default TransactionsRepository;
