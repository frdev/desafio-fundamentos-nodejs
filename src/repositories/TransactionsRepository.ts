import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateAppointmentDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const getValue = (type: 'income' | 'outcome'): number => {
      const transactions: Transaction[] = this.transactions.filter(
        t => t.type === type,
      );
      const valuesTransactions: number[] = transactions.map(t => t.value);
      const reduceValues = valuesTransactions.length
        ? valuesTransactions.reduce((accumulator, value) => accumulator + value)
        : 0;

      return reduceValues;
    };

    const income = getValue('income');
    const outcome = getValue('outcome');
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateAppointmentDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
