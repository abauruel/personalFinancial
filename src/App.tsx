
import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Globalstyle } from "./styles/global";
import Modal from 'react-modal'
import { NewTRansactionModal } from "./components/NewTransactionModal";
import { TransactionProvider } from "./hooks/useTransactions";
Modal.setAppElement("#root")

export function App() {
  const [isNewTransactionModal,setIsNewTransactionModal ] = useState(false)


  function handleOpenNewTransactionModal(){
      setIsNewTransactionModal(true)
  }
  function handleCloseNewTransactionModal(){
      setIsNewTransactionModal(false)
  }

  return (
    <TransactionProvider>
      <Header
      onOpenNewTransactionModal ={handleOpenNewTransactionModal}
      />
      <Dashboard />
      <Globalstyle />
        <NewTRansactionModal 
          isOpen={isNewTransactionModal}
          onRequestClose={handleCloseNewTransactionModal}
        />
    </TransactionProvider>
    )
}


