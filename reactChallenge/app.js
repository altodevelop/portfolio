document.addEventListener('DOMContentLoaded', function() {
  const transactionForm = document.getElementById('transactionForm');
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const dateInput = document.getElementById('date');
  const transactionsList = document.getElementById('transactionsList');
  const balanceElement = document.getElementById('balance');
  
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
  // Initialize the app
  function init() {
    transactionForm.addEventListener('submit', addTransaction);
    updateBalance();
    renderTransactions();
  }
  
  // Add new transaction
  function addTransaction(e) {
    e.preventDefault();
    
    if (!descriptionInput.value.trim() || !amountInput.value || !dateInput.value) {
      alert('Please fill in all fields');
      return;
    }
    
    const transaction = {
      id: generateID(),
      description: descriptionInput.value,
      amount: +amountInput.value,
      date: dateInput.value
    };
    
    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();
    updateBalance();
    
    // Clear form
    transactionForm.reset();
  }
  
  // Generate random ID
  function generateID() {
    return Math.floor(Math.random() * 100000000);
  }
  
  // Render transactions list
  function renderTransactions() {
    transactionsList.innerHTML = '';
    
    if (transactions.length === 0) {
      transactionsList.innerHTML = '<p>No transactions yet</p>';
      return;
    }
    
    // Sort by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedTransactions.forEach(transaction => {
      const transactionElement = document.createElement('div');
      transactionElement.classList.add('transaction');
      transactionElement.classList.add(transaction.amount > 0 ? 'income' : 'expense');
      
      transactionElement.innerHTML = `
        <div class="transaction-text">
          <h4>${transaction.description}</h4>
          <small>${formatDate(transaction.date)}</small>
        </div>
        <span class="transaction-amount">${transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}</span>
        <div class="buttons-container">
          <button class="edit-btn" data-id="${transaction.id}">✏️</button>
          <button class="delete-btn" data-id="${transaction.id}">❌</button>
        </div>
      `;
      
      transactionsList.appendChild(transactionElement);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', deleteTransaction);
    });
    
    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', editTransaction);
    });
  }
  
  // Format date for display
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  // Delete transaction
  function deleteTransaction(e) {
    const id = +e.target.getAttribute('data-id');
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    renderTransactions();
    updateBalance();
  }
  
  // Edit transaction
  function editTransaction(e) {
    const id = +e.target.getAttribute('data-id');
    const transaction = transactions.find(t => t.id === id);
    
    if (!transaction) return;
    
    // Fill form with transaction data
    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    dateInput.value = transaction.date;
    
    // Remove the transaction being edited
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    renderTransactions();
    updateBalance();
  }
  
  // Update balance
  function updateBalance() {
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    balanceElement.textContent = `$${total.toFixed(2)}`;
    balanceElement.style.color = total >= 0 ? 'var(--income-color)' : 'var(--expense-color)';
  }
  
  // Update localStorage
  function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
  // Initialize the app
  init();
});