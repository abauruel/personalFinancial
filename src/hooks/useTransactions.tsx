import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

type TransactionsContextData = { 
    transactions: Transaction[],
    createTransaction(transaction: TransactionInput): Promise<void>
}

type Transaction ={
    id: number,
    title: string,
    createdAt: string,
    category: string,
    amount: number,
    type: string
}

type TransactionProviderProps = { 
    children: React.ReactNode,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> ;


const TransactionContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionProvider({ children}: TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])
    useEffect(()=>{
        api.get('/transactions')
            .then(response => {
                console.log(response.data)
                setTransactions(response.data.transactions)
            }
            )
    },[])

    async function createTransaction (transactionInput : TransactionInput){
        const response = await api.post('/transactions', {
            ...transactionInput, createdAt: new Date()
        })
        const { transaction } = response.data;
        setTransactions([
            ...transactions,
            transaction
        ])
    }
    
    return (
        <TransactionContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
} 

export function useTransactions(){
    const context = useContext(TransactionContext)

    return context
}