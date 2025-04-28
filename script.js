document.addEventListener('DOMContentLoaded', () => {
  // --- State Management ---
  let currentScreen = 'login-screen'; // Initial screen
  const screens = document.querySelectorAll('.screen'); // Get all screen elements
  const bottomNavButtons = document.querySelectorAll('.bottom-nav .nav-button'); // Get all bottom nav buttons

  // Mock Data (replace with actual data fetching in a real app)
  const mockUserData = {
    name: 'Edgar "Agu" A',
    id: '1565990',
    isPremium: true,
  };

  const mockRecordsSummary = {
    totalExpenses: 1191779,
    totalIncome: 4239000,
    balance: 3047221,
  };

  const mockTransactions = [
    {
      id: 1,
      date: '2025-04-27T10:00:00Z',
      type: 'Expense',
      amount: -29500,
      description: 'colectivo',
      category: { name: 'Transportation', icon: 'truck' },
    },
    {
      id: 2,
      date: '2025-04-26T15:00:00Z',
      type: 'Expense',
      amount: -250000,
      description: 'gifts',
      category: { name: 'Gifts', icon: 'gift' },
    },
    {
      id: 3,
      date: '2025-04-26T10:00:00Z',
      type: 'Income',
      amount: 527000,
      description: 'teaching',
      category: { name: 'Teaching', icon: 'book-open' },
    },
    {
      id: 4,
      date: '2025-04-26T08:00:00Z',
      type: 'Expense',
      amount: -60400,
      description: 'Uber',
      category: { name: 'Car', icon: 'car' },
    },
    {
      id: 5,
      date: '2025-04-26T07:00:00Z',
      type: 'Expense',
      amount: -10400,
      description: 'uber',
      category: { name: 'Car', icon: 'car' },
    },
    {
      id: 6,
      date: '2025-04-23T18:00:00Z',
      type: 'Expense',
      amount: -26777,
      description: 'uber',
      category: { name: 'Car', icon: 'car' },
    },
    {
      id: 7,
      date: '2025-04-23T10:00:00Z',
      type: 'Expense',
      amount: -22000,
      description: 'uber',
      category: { name: 'Car', icon: 'car' },
    },
    {
      id: 8,
      date: '2025-04-23T09:00:00Z',
      type: 'Expense',
      amount: -43000,
      description: 'uber',
      category: { name: 'Car', icon: 'car' },
    },
    {
      id: 9,
      date: '2025-04-22T20:00:00Z',
      type: 'Expense',
      amount: -170000,
      description: 'ara',
      category: { name: 'Groceries', icon: 'shopping-bag' },
    },
    // Add more mock data to simulate scrolling
    {
      id: 10,
      date: '2025-04-22T18:00:00Z',
      type: 'Expense',
      amount: -5000,
      description: 'bus',
      category: { name: 'Transportation', icon: 'truck' },
    },
    {
      id: 11,
      date: '2025-04-21T10:00:00Z',
      type: 'Income',
      amount: 150000,
      description: 'freelance',
      category: { name: 'Freelance', icon: 'briefcase' },
    },
    {
      id: 12,
      date: '2025-04-21T09:00:00Z',
      type: 'Expense',
      amount: -30000,
      description: 'coffee',
      category: { name: 'Food', icon: 'coffee' },
    },
  ];

  const mockAccounts = [
    {
      id: 1,
      name: 'Default',
      description: 'Personal cash book',
      type: 'Cash',
      isVIP: false,
      isLocked: false,
      isSelected: true,
    }, // Mark default as selected
    {
      id: 2,
      name: 'Team cash book',
      description: 'Share with multiple people',
      type: 'Shared',
      isVIP: true,
      isLocked: true,
      isSelected: false,
    },
    {
      id: 3,
      name: 'Business cash book',
      description: 'Suitable for business use',
      type: 'Business',
      isVIP: true,
      isLocked: true,
      isSelected: false,
    },
    {
      id: 4,
      name: 'Savings Account',
      description: 'Bank savings',
      type: 'Bank',
      isVIP: false,
      isLocked: false,
      isSelected: false,
    },
  ];
  let selectedAccountId = mockAccounts.find((acc) => acc.isSelected)?.id || null;

  const mockCategories = {
    Expense: [
      { id: 1, name: 'Shopping', icon: 'shopping-cart', type: 'Expense' },
      { id: 2, name: 'Food', icon: 'coffee', type: 'Expense' },
      { id: 3, name: 'Phone', icon: 'phone', type: 'Expense' },
      { id: 4, name: 'Entertainment', icon: 'film', type: 'Expense' },
      { id: 5, name: 'Education', icon: 'book', type: 'Expense' },
      { id: 6, name: 'Beauty', icon: 'scissors', type: 'Expense' },
      { id: 7, name: 'Sports', icon: 'activity', type: 'Expense' },
      { id: 8, name: 'Social', icon: 'users', type: 'Expense' },
      { id: 9, name: 'Transportation', icon: 'truck', type: 'Expense' },
      { id: 10, name: 'Clothing', icon: 'watch', type: 'Expense' },
      { id: 11, name: 'Car', icon: 'car', type: 'Expense' },
      { id: 12, name: 'Alcohol', icon: 'droplet', type: 'Expense' },
      { id: 13, name: 'Cigarettes', icon: 'gitlab', type: 'Expense' },
      { id: 14, name: 'Electronics', icon: 'hard-drive', type: 'Expense' },
      { id: 15, name: 'Travel', icon: 'globe', type: 'Expense' },
      { id: 16, name: 'Health', icon: 'heart', type: 'Expense' },
      { id: 17, name: 'Pets', icon: 'github', type: 'Expense' },
      { id: 18, name: 'Repairs', icon: 'tool', type: 'Expense' },
      { id: 19, name: 'Housing', icon: 'home', type: 'Expense' },
      { id: 20, name: 'Homes', icon: 'home', type: 'Expense' },
      { id: 21, name: 'Gifts', icon: 'gift', type: 'Expense' },
      { id: 22, name: 'Donations', icon: 'heart', type: 'Expense' },
      { id: 23, name: 'Lottery', icon: 'aperture', type: 'Expense' },
      { id: 24, name: 'Snacks', icon: 'chevrons-right', type: 'Expense' },
      { id: 25, name: 'Kids', icon: 'smile', type: 'Expense' },
      { id: 26, name: 'Vegetables', icon: 'carrot', type: 'Expense' },
      { id: 27, name: 'Fruits', icon: 'feather', type: 'Expense' },
      { id: 'add', name: 'Settings', icon: 'plus', type: 'Action' }, // Special '+' item
    ],
    Income: [
      { id: 101, name: 'Salary', icon: 'dollar-sign', type: 'Income' },
      { id: 102, name: 'Freelance', icon: 'briefcase', type: 'Income' },
      { id: 103, name: 'Interest', icon: 'percent', type: 'Income' },
      { id: 104, name: 'Gift', icon: 'gift', type: 'Income' },
      { id: 'add', name: 'Settings', icon: 'plus', type: 'Action' },
    ],
    Transfer: [
      { id: 201, name: 'Between My Accounts', icon: 'repeat', type: 'Transfer' },
      // No '+' for Transfer categories based on screenshot/common sense
    ],
  };

  // --- Helper Functions ---

  // Function to show a specific screen and hide others
  function showScreen(screenId) {
    screens.forEach((screen) => {
      screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;

    // Update bottom nav active state
    bottomNavButtons.forEach((button) => {
      if (button.dataset.screen === screenId) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });

    // Re-replace Feather icons on the new screen content
    feather.replace();

    // Trigger screen-specific rendering/updates
    updateScreenContent(screenId);
  }

  // Function to update content of screens when they become active
  function updateScreenContent(screenId) {
    // Hide all placeholder messages initially
    document
      .querySelectorAll('.loading-indicator, .error-message, .no-data-message')
      .forEach((el) => el.classList.add('hidden'));

    switch (screenId) {
      case 'login-screen':
        // Clear form/error on showing login
        document.getElementById('login-form').reset();
        document.getElementById('login-error').textContent = '';
        break;
      case 'register-screen':
        // Clear form/error on showing register
        document.getElementById('register-form').reset();
        document.getElementById('register-error').textContent = '';
        break;
      case 'records-screen':
        // Fetch/Render Records data (mock data here)
        renderRecordsScreen(mockTransactions, mockRecordsSummary);
        break;
      case 'charts-screen':
        // Fetch/Render Charts data (mock data here)
        // Note: Period logic isn't fully implemented here, just initial render
        renderChartsScreen('Expense', 'Month', new Date(2025, 1, 1)); // Example: Feb 2025
        break;
      case 'reports-screen':
        // Fetch/Render Reports data (mock data here)
        renderReportsScreen(mockAccounts); // Pass mock accounts for Accounts tab
        // Default to Accounts tab
        showReportTab('accounts');
        break;
      case 'profile-screen':
        // Render Profile data (mock data here)
        renderProfileScreen(mockUserData);
        break;
      case 'add-transaction-screen':
        // Render categories for the default type (Expense)
        renderCategories('Expense');
        // Reset segmented control to Expense
        document.querySelectorAll('#add-transaction-screen .segmented-control .segment').forEach((segment) => {
          if (segment.dataset.transactionType === 'Expense') {
            segment.classList.add('active');
          } else {
            segment.classList.remove('active');
          }
        });
        break;
      case 'account-selection-screen':
        // Render account list for selection
        renderAccountSelection(mockAccounts, selectedAccountId);
        break;
      // Add cases for other screens like TransactionForm, AddCategory etc.
      default:
        console.log(`Screen ${screenId} needs rendering logic.`);
        break;
    }
  }

  // Format numbers with commas
  function formatAmount(amount) {
    return Math.abs(amount).toLocaleString();
  }

  // Group transactions by date (simplified)
  function groupTransactionsByDate(txns) {
    const sectionsMap = txns.reduce((acc, txn) => {
      const date = new Date(txn.date).toISOString().split('T')[0]; // Use date string as key
      if (!acc[date]) {
        acc[date] = {
          title: date,
          data: [],
          dailyExpenses: 0,
          dailyIncome: 0,
        };
      }
      acc[date].data.push(txn);
      if (txn.type === 'Expense') acc[date].dailyExpenses += Math.abs(txn.amount);
      if (txn.type === 'Income') acc[date].dailyIncome += Math.abs(txn.amount);
      return acc;
    }, {});

    // Convert map to array of sections, sorted by date descending
    return Object.keys(sectionsMap)
      .sort((a, b) => new Date(b) - new Date(a))
      .map((date) => ({
        title: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }),
        data: sectionsMap[date].data.sort((a, b) => new Date(b.date) - new Date(a.date)),
        dailySummary:
          `Expenses: ${formatAmount(sectionsMap[date].dailyExpenses)}` +
          (sectionsMap[date].dailyIncome > 0 ? ` Income: ${formatAmount(sectionsMap[date].dailyIncome)}` : ''),
      }));
  }

  // --- Render Functions for Each Screen ---

  function renderRecordsScreen(transactions, summary) {
    const summaryValuesEl = document.querySelector('#records-screen .summary-values');
    if (summary) {
      summaryValuesEl.querySelector('.summary-value.expense').textContent = `-${formatAmount(summary.totalExpenses)}`;
      summaryValuesEl.querySelector('.summary-value.income').textContent = `+${formatAmount(summary.totalIncome)}`;
      summaryValuesEl.querySelector('.summary-value:not(.expense):not(.income)').textContent = `${
        summary.balance >= 0 ? '+' : '-'
      }${formatAmount(summary.balance)}`;
    } else {
      // Handle no summary data
    }

    const transactionListEl = document.querySelector('#records-screen .transaction-list');
    transactionListEl.innerHTML = ''; // Clear current list

    if (!transactions || transactions.length === 0) {
      document.getElementById('records-no-data').classList.remove('hidden');
      return;
    }

    const sections = groupTransactionsByDate(transactions);

    sections.forEach((section) => {
      const sectionHeaderHtml = `
                <div class="list-section-header">
                    <span class="section-date">${section.title}</span>
                    <span class="section-summary">${section.dailySummary}</span>
                </div>
            `;
      transactionListEl.insertAdjacentHTML('beforeend', sectionHeaderHtml);

      section.data.forEach((txn) => {
        const isExpense = txn.type === 'Expense';
        const itemHtml = `
                     <div class="list-item transaction-item" data-transaction-id="${txn.id}">
                         <div class="item-icon"><i data-feather="${txn.category?.icon || 'help-circle'}"></i></div>
                         <span class="item-description">${txn.description || txn.category?.name || 'Unknown'}</span>
                         <span class="item-amount ${isExpense ? 'expense' : 'income'}">
                             ${isExpense ? '-' : '+'}${formatAmount(txn.amount)}
                         </span>
                     </div>
                 `;
        transactionListEl.insertAdjacentHTML('beforeend', itemHtml);
      });
    });

    // Replace icons after injecting new HTML
    feather.replace();

    // Add click listeners to transaction items (example)
    transactionListEl.querySelectorAll('.transaction-item').forEach((item) => {
      item.addEventListener('click', () => {
        const transactionId = item.dataset.transactionId;
        alert(`Navigate to transaction details for ID: ${transactionId}`);
        // In a real app: showScreen('transaction-details-screen', { transactionId: transactionId });
      });
    });
  }

  function renderChartsScreen(chartType, periodType, date) {
    // Update header title (simplified)
    document.querySelector(
      '#charts-screen .header-title'
    ).innerHTML = `${chartType} <i data-feather="chevron-down" class="dropdown-arrow"></i>`;
    feather.replace(); // Update icon

    // Update period text
    const periodTextEl = document.getElementById('charts-current-period');
    if (periodType === 'Month') {
      periodTextEl.textContent = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    } else {
      // Year
      periodTextEl.textContent = date.getFullYear();
    }

    // --- Simulate Chart Data & Rendering ---
    // In a real app, fetch data based on chartType, periodType, date
    // For this example, we'll just use fixed mock data from screenshot 3
    const mockChartData = {
      total: 1191000,
      categories: [
        { name: 'Shopping', amount: 398000, percentage: 33.39, color: '#FF6384', icon: 'shopping-cart' },
        { name: 'Car', amount: 269279, percentage: 22.59, color: '#36A2EB', icon: 'car' },
        { name: 'Electronics', amount: 228000, percentage: 19.13, color: '#FFCE56', icon: 'hard-drive' },
        { name: 'Vegetables', amount: 223000, percentage: 18.71, color: '#4BC0C0', icon: 'carrot' },
        { name: 'Transportation', amount: 29500, percentage: 2.47, color: '#9966CC', icon: 'truck' },
        { name: 'Food', amount: 24000, percentage: 2.01, color: '#FF9F40', icon: 'coffee' },
        // Note: Percentages in screenshot sum to > 100%. Using adjusted amounts/percentages here.
      ].sort((a, b) => b.amount - a.amount),
    };

    // Update chart center text
    document.getElementById('charts-total-amount').textContent = `+${formatAmount(mockChartData.total)}`; // Screenshot shows '+', keep it

    // Render category list
    const categoryListEl = document.querySelector('#charts-screen .category-list');
    categoryListEl.innerHTML = ''; // Clear list

    if (!mockChartData.categories || mockChartData.categories.length === 0) {
      document.getElementById('charts-no-data').classList.remove('hidden');
      return;
    }

    mockChartData.categories.forEach((cat) => {
      const itemHtml = `
                 <div class="list-item category-item">
                      <span class="color-dot" style="background-color: ${cat.color || '#ccc'};"></span>
                      <span class="category-label">${cat.name}</span>
                      <span class="category-percentage">${cat.percentage}%</span>
                      <span class="category-amount">${formatAmount(cat.amount)}</span>
                 </div>
            `;
      categoryListEl.insertAdjacentHTML('beforeend', itemHtml);
    });
  }

  function renderReportsScreen(accounts) {
    // Update Accounts tab summary (mock data)
    const summaryCardEl = document.querySelector('#accounts-report-content .summary-card');
    if (summaryCardEl) {
      // Ensure element exists
      document.getElementById('net-worth-value').textContent = formatAmount(0); // Mock value
      document.getElementById('assets-value').textContent = formatAmount(0); // Mock value
      document.getElementById('liabilities-value').textContent = formatAmount(0); // Mock value
    }

    // Render Account List for Account Selection Overlay (This is rendered separately)
    // renderAccountSelection(accounts, selectedAccountId); // Call this when showing the overlay
  }

  function renderProfileScreen(userData) {
    // Update profile details
    const profileNameEl = document.querySelector('.profile-name');
    const profileIdEl = document.querySelector('.profile-id');
    const premiumStatusEl = document.querySelector('.premium-status-row .item-description');
    const blockAdsItem = document.getElementById('menu-block-ads');

    if (userData) {
      profileNameEl.textContent = userData.name;
      profileIdEl.textContent = `ID:${userData.id}`;
      premiumStatusEl.textContent = userData.isPremium ? 'Premium Member' : 'Free Member';
      // Visually indicate premium status on the row (optional, CSS handles color)

      // Hide/show Block Ads based on premium status (example)
      if (blockAdsItem) {
        if (userData.isPremium) {
          blockAdsItem.style.display = 'none'; // Hide if premium
        } else {
          blockAdsItem.style.display = 'flex'; // Show if not premium (default is flex from list-item)
        }
      }
    } else {
      // Handle no user data state
    }
  }

  function renderCategories(type) {
    const categoryGridEl = document.getElementById('category-grid');
    categoryGridEl.innerHTML = ''; // Clear current grid

    const categories = mockCategories[type]; // Get categories for the type

    if (!categories || categories.length === 0) {
      document.getElementById('add-transaction-no-data').classList.remove('hidden');
      return;
    }

    categories.forEach((cat) => {
      const itemHtml = `
                <div class="category-grid-item" data-category-id="${cat.id}" data-category-type="${
        cat.type
      }" data-category-name="${cat.name}">
                    <div class="icon-container"><i data-feather="${cat.icon || 'help-circle'}"></i></div>
                    <span class="category-label-text">${cat.name}</span>
                </div>
            `;
      categoryGridEl.insertAdjacentHTML('beforeend', itemHtml);
    });

    // Replace icons after injecting new HTML
    feather.replace();

    // Add click listeners to category items
    categoryGridEl.querySelectorAll('.category-grid-item').forEach((item) => {
      item.addEventListener('click', () => {
        const categoryId = item.dataset.categoryId;
        const categoryType = item.dataset.categoryType;
        const categoryName = item.dataset.categoryName;

        if (categoryId === 'add') {
          alert(`Navigate to Add Category screen for type: ${categoryType}`);
          // In a real app: showScreen('add-category-screen', { type: categoryType });
        } else {
          alert(`Navigate to Transaction Form for ${categoryType}: ${categoryName} (ID: ${categoryId})`);
          // In a real app: showScreen('transaction-form-screen', { type: categoryType, categoryId: categoryId });
        }
      });
    });
  }

  function renderAccountSelection(accounts, currentSelectedId) {
    const accountListEl = document.getElementById('account-list');
    accountListEl.innerHTML = ''; // Clear list

    if (!accounts || accounts.length === 0) {
      document.getElementById('account-selection-no-data').classList.remove('hidden');
      return;
    }

    accounts.forEach((account) => {
      const isSelected = account.id === currentSelectedId;
      const isLocked = account.isLocked;

      const itemHtml = `
                 <div class="list-item account-item ${isLocked ? 'disabled' : ''}" data-account-id="${account.id}">
                     <div class="item-icon"><i data-feather="dollar-sign"></i></div>
                     <div class="account-text-container">
                         <span class="account-name ${isLocked ? 'locked-text' : ''}">${account.name}</span>
                         <span class="account-description ${isLocked ? 'locked-text' : ''}">${
        account.description
      }</span>
                     </div>
                     ${account.isVIP ? '<span class="vip-label">VIP</span>' : ''}
                     ${isLocked ? '<i data-feather="lock" class="locked-icon"></i>' : ''}
                     ${isSelected && !isLocked ? '<i data-feather="check" class="selected-icon"></i>' : ''}
                 </div>
             `;
      accountListEl.insertAdjacentHTML('beforeend', itemHtml);
    });

    // Replace icons after injecting new HTML
    feather.replace();

    // Add click listeners to account items
    accountListEl.querySelectorAll('.account-item').forEach((item) => {
      item.addEventListener('click', () => {
        const accountId = parseInt(item.dataset.accountId, 10); // Get ID
        const account = accounts.find((acc) => acc.id === accountId);

        if (account && account.isLocked) {
          alert('This is a VIP feature. Please upgrade.');
          // In a real app: showScreen('premium-screen');
        } else if (account) {
          selectedAccountId = accountId; // Update the global state
          // Update UI to show checkmark on selected item
          accountListEl.querySelectorAll('.account-item').forEach((accItem) => accItem.classList.remove('selected'));
          item.classList.add('selected'); // Add a class for visual selection if needed

          // Re-render Records screen with the new account filter (simulated)
          alert(`Account selected: ${account.name}. Re-rendering Records screen.`);
          // In a real app: fetch and render transactions for selectedAccountId
          // For this mock, we'll just close the modal and state is updated
          showScreen('records-screen'); // Go back to records
          // Call updateScreenContent('records-screen') if you wanted to re-render the list immediately
        }
      });
    });
  }

  // --- Event Listeners ---

  // Login Form Submission
  document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent actual form submission

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');

    // Simple mock validation
    if (email === 'test@example.com' && password === 'password') {
      errorElement.textContent = ''; // Clear error
      alert('Login successful!'); // Simulate success
      showScreen('records-screen'); // Navigate to Records screen
    } else {
      errorElement.textContent = 'Invalid email or password.'; // Show error
    }
  });

  // Register Link Click
  document.getElementById('show-register').addEventListener('click', (event) => {
    event.preventDefault();
    showScreen('register-screen');
  });

  // Login Link Click (from Register)
  document.getElementById('show-login').addEventListener('click', (event) => {
    event.preventDefault();
    showScreen('login-screen');
  });

  // Bottom Navigation Clicks
  bottomNavButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const screenId = button.dataset.screen;
      // Special handling for Add Transaction FAB (shows overlay)
      if (screenId === 'add-transaction') {
        showScreen('add-transaction-screen');
        // Don't mark FAB as 'active' in bottom nav, keep the previous screen active
        document.querySelector('.bottom-nav .nav-button.fab').classList.remove('active'); // Remove active class from FAB
        // Revert active class to the screen that was active before the modal
        document.querySelector(`.bottom-nav .nav-button[data-screen="${currentScreen}"]`).classList.add('active');
      } else {
        showScreen(screenId);
      }
    });
  });

  // Records Screen Header Icon Clicks (Mock actions)
  document
    .querySelector('#records-screen .header i[data-feather="menu"]')
    .parentElement.addEventListener('click', () => {
      // Simulate showing the Account Selection overlay
      showScreen('account-selection-screen');
    });
  document
    .querySelector('#records-screen .header i[data-feather="search"]')
    .parentElement.addEventListener('click', () => {
      alert('Search functionality not implemented.');
    });
  document
    .querySelector('#records-screen .header i[data-feather="calendar"]')
    .parentElement.addEventListener('click', () => {
      alert('Calendar/Date Picker not implemented.');
    });

  // Records Screen Month/Year Select Click (Mock dropdown)
  document.querySelector('#records-screen .month-year-select').addEventListener('click', () => {
    alert('Month/Year selection dropdown not implemented.');
    // In a real app, show a modal or custom dropdown to select month/year
  });

  // Records Screen Ad Close Button
  document.querySelector('#records-screen .ad-banner .ad-close').addEventListener('click', (event) => {
    event.target.closest('.ad-banner').style.display = 'none'; // Hide the ad banner
  });

  // Charts Screen Segmented Control (Month/Year)
  document.querySelectorAll('#charts-screen .segmented-control .segment').forEach((segment) => {
    segment.addEventListener('click', () => {
      document
        .querySelectorAll('#charts-screen .segmented-control .segment')
        .forEach((s) => s.classList.remove('active'));
      segment.classList.add('active');
      const periodType = segment.dataset.period;
      alert(`Switched to ${periodType} view.`);
      // In a real app: Re-fetch/re-render chart data for the new period type
      renderChartsScreen('Expense', periodType, new Date()); // Example: use current date for new period type
    });
  });

  // Charts Screen Date Navigation Arrows
  document.querySelectorAll('#charts-screen .date-navigation .nav-arrow').forEach((arrow) => {
    arrow.addEventListener('click', () => {
      const direction = parseInt(arrow.dataset.direction, 10);
      const currentPeriodText = document.getElementById('charts-current-period').textContent;
      const activeSegment = document.querySelector('#charts-screen .segmented-control .segment.active');
      const periodType = activeSegment ? activeSegment.dataset.period : 'month'; // Default to month

      let currentDate;
      if (periodType === 'month') {
        // Parse month and year from text (basic parsing)
        const [monthStr, yearStr] = currentPeriodText.split(' ');
        const monthIndex = new Date(Date.parse(monthStr + ' 1, 2012')).getMonth(); // Parse month name
        currentDate = new Date(parseInt(yearStr, 10), monthIndex, 1);
        currentDate.setMonth(currentDate.getMonth() + direction);
      } else {
        // Year
        currentDate = new Date(parseInt(currentPeriodText, 10), 0, 1);
        currentDate.setFullYear(currentDate.getFullYear() + direction);
      }

      alert(
        `Navigating ${direction === 1 ? 'forward' : 'backward'} to ${currentDate.toLocaleString('en-US', {
          month: 'short',
          year: 'numeric',
        })} (simulated)`
      );
      // In a real app: Re-fetch/re-render chart data for the new date
      renderChartsScreen('Expense', periodType, currentDate);
    });
  });

  // Charts Screen Period Shortcuts (This Month/Last Month)
  document.querySelectorAll('#charts-screen .date-navigation .period-shortcut').forEach((shortcut) => {
    shortcut.addEventListener('click', () => {
      document
        .querySelectorAll('#charts-screen .date-navigation .period-shortcut')
        .forEach((s) => s.classList.remove('active'));
      shortcut.classList.add('active');
      const shortcutType = shortcut.dataset.shortcut;
      alert(`Selecting ${shortcutType} (simulated).`);

      // In a real app, calculate the start date for This Month or Last Month
      const now = new Date();
      let targetDate = new Date();
      if (shortcutType === 'last-month') {
        targetDate.setMonth(now.getMonth() - 1);
      }
      // For 'this-month', targetDate is already current month

      // In a real app: Re-fetch/re-render chart data for the new period
      renderChartsScreen('Expense', 'Month', targetDate); // Assume shortcut is always for Month
      // Also ensure the Month/Year segmented control is set to Month
      document.querySelector('#charts-screen .segmented-control .segment[data-period="month"]').click(); // Simulate click
    });
  });

  // Reports Screen Segmented Control (Analytics/Accounts)
  document.querySelectorAll('#reports-screen .segmented-control .segment').forEach((segment) => {
    segment.addEventListener('click', () => {
      document
        .querySelectorAll('#reports-screen .segmented-control .segment')
        .forEach((s) => s.classList.remove('active'));
      segment.classList.add('active');
      const reportTab = segment.dataset.reportTab;
      showReportTab(reportTab);
      alert(`Switched to ${reportTab} tab.`);
      // In a real app: Fetch/render data specific to the selected tab
    });
  });

  // Helper to show content for the selected report tab
  function showReportTab(tabName) {
    document.getElementById('accounts-report-content').classList.add('hidden');
    document.getElementById('analytics-report-content').classList.add('hidden');

    if (tabName === 'accounts') {
      document.getElementById('accounts-report-content').classList.remove('hidden');
      // In a real app, call render function for accounts report
      renderReportsScreen(mockAccounts); // Re-render account summary on tab switch
    } else if (tabName === 'analytics') {
      document.getElementById('analytics-report-content').classList.remove('hidden');
      // In a real app, call render function for analytics report
    }
  }

  // Reports Screen Action Buttons (Mock actions)
  document.getElementById('add-account-button').addEventListener('click', () => {
    alert('Navigate to Add Account screen.');
    // In a real app: showScreen('add-account-screen');
  });
  document.getElementById('manage-accounts-button').addEventListener('click', () => {
    alert('Navigate to Manage Accounts screen.');
    // In a real app: showScreen('manage-accounts-screen');
  });

  // Profile Screen Menu Item Clicks (Mock actions)
  document.getElementById('menu-recommend').addEventListener('click', () => alert('Recommend to friends action.'));
  document.getElementById('menu-rate').addEventListener('click', () => alert('Rate the app action.'));
  document.getElementById('menu-block-ads').addEventListener('click', () => alert('Block Ads action.'));
  document.getElementById('menu-settings').addEventListener('click', () => alert('Navigate to Settings screen.'));

  // Add Transaction Screen Segmented Control
  document.querySelectorAll('#add-transaction-screen .segmented-control .segment').forEach((segment) => {
    segment.addEventListener('click', () => {
      document
        .querySelectorAll('#add-transaction-screen .segmented-control .segment')
        .forEach((s) => s.classList.remove('active'));
      segment.classList.add('active');
      const transactionType = segment.dataset.transactionType;
      alert(`Switched to ${transactionType} categories.`);
      renderCategories(transactionType); // Render categories for the selected type
    });
  });

  // Add Transaction Screen Cancel Button
  document.getElementById('add-transaction-cancel').addEventListener('click', () => {
    showScreen('records-screen'); // Go back to Records screen
  });

  // Account Selection Screen Close Button
  document.getElementById('account-selection-close').addEventListener('click', () => {
    showScreen('records-screen'); // Go back to Records screen
  });

  // Account Selection Screen Action Buttons (Mock actions)
  document.getElementById('add-vip-button').addEventListener('click', () => {
    alert('Navigate to Premium/Add VIP screen.');
    // In a real app: showScreen('premium-screen');
  });
  document.getElementById('join-account-button').addEventListener('click', () => {
    alert('Navigate to Join Account flow.');
    // In a real app: showScreen('join-account-screen');
  });

  // --- Initial Setup ---
  // Hide all screens except the initial one
  screens.forEach((screen) => {
    if (screen.id !== currentScreen) {
      screen.classList.remove('active');
    } else {
      screen.classList.add('active');
    }
  });

  // Ensure initial screen content is rendered
  updateScreenContent(currentScreen);
});
