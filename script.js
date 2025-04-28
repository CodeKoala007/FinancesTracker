document.addEventListener('DOMContentLoaded', () => {
  // --- Element References ---
  const loginScreen = document.getElementById('login-screen');
  const registerScreen = document.getElementById('register-screen');
  const mainApp = document.getElementById('main-app');
  const authScreens = document.querySelectorAll('.auth-screen');
  const tabScreens = document.querySelectorAll('.tab-screen');
  const bottomNavButtons = document.querySelectorAll('.bottom-nav .nav-button');
  const overlayScreens = document.querySelectorAll('.overlay-screen');

  // --- State Management ---
  let isLoggedIn = false; // Track login state
  let currentTabScreen = 'records-screen'; // Track active main tab screen
  let activeOverlay = null; // Track active overlay screen ID

  // Mock Data (Same as before)
  const mockUserData = { name: 'Edgar "Agu" A', id: '1565990', isPremium: true };
  const mockRecordsSummary = { totalExpenses: 1191779, totalIncome: 4239000, balance: 3047221 };
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
    { id: 1, name: 'Default', description: 'Personal cash book', type: 'Cash', isVIP: false, isLocked: false },
    {
      id: 2,
      name: 'Team cash book',
      description: 'Share with multiple people',
      type: 'Shared',
      isVIP: true,
      isLocked: true,
    },
    {
      id: 3,
      name: 'Business cash book',
      description: 'Suitable for business use',
      type: 'Business',
      isVIP: true,
      isLocked: true,
    },
    { id: 4, name: 'Savings Account', description: 'Bank savings', type: 'Bank', isVIP: false, isLocked: false },
  ];
  let selectedAccountId = mockAccounts[0].id; // Default to the first account

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
      { id: 'add', name: 'Settings', icon: 'plus', type: 'Action' },
    ],
    Income: [
      { id: 101, name: 'Salary', icon: 'dollar-sign', type: 'Income' },
      { id: 102, name: 'Freelance', icon: 'briefcase', type: 'Income' },
      { id: 103, name: 'Interest', icon: 'percent', type: 'Income' },
      { id: 104, name: 'Gift', icon: 'gift', type: 'Income' },
      { id: 'add', name: 'Settings', icon: 'plus', type: 'Action' },
    ],
    Transfer: [{ id: 201, name: 'Between My Accounts', icon: 'repeat', type: 'Transfer' }],
  };

  // --- Navigation Functions ---

  // Show/Hide Auth Screens
  function showAuthScreen(screenId) {
    authScreens.forEach((screen) => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    mainApp.classList.add('hidden'); // Hide main app
    isLoggedIn = false;
    // Clear auth forms on switch
    document.getElementById('login-form').reset();
    document.getElementById('login-error').textContent = '';
    document.getElementById('register-form').reset();
    document.getElementById('register-error').textContent = '';
  }

  // Show Main App (after login)
  function showMainApp() {
    authScreens.forEach((screen) => screen.classList.remove('active'));
    mainApp.classList.remove('hidden'); // Show main app
    isLoggedIn = true;
    showTabScreen('records-screen'); // Default to Records tab after login
  }

  // Show a specific main tab screen
  function showTabScreen(screenId) {
    // Hide all tab screens
    tabScreens.forEach((screen) => screen.classList.remove('active'));
    // Show the target tab screen
    document.getElementById(screenId).classList.add('active');
    currentTabScreen = screenId; // Update state

    // Update bottom nav active state
    bottomNavButtons.forEach((button) => {
      // Check data-screen, but exclude the FAB which triggers overlay
      if (button.dataset.screen === screenId && !button.classList.contains('fab')) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });

    // Hide any active overlay when switching main tabs
    hideOverlay();

    // Trigger screen-specific rendering/updates
    updateScreenContent(screenId);
  }

  // Show an overlay screen
  function showOverlay(overlayId) {
    // Hide all overlays first (defensive)
    overlayScreens.forEach((overlay) => overlay.classList.remove('active'));
    // Show the target overlay
    document.getElementById(overlayId).classList.add('active');
    activeOverlay = overlayId; // Update state

    // Trigger screen-specific rendering for the overlay
    updateScreenContent(overlayId);
  }

  // Hide the active overlay
  function hideOverlay() {
    if (activeOverlay) {
      document.getElementById(activeOverlay).classList.remove('active');
      activeOverlay = null; // Clear state
    }
  }

  // Function to update content of screens when they become active
  function updateScreenContent(screenId) {
    // Hide all placeholder messages within this screen
    const screenElement = document.getElementById(screenId);
    if (screenElement) {
      screenElement
        .querySelectorAll('.loading-indicator, .error-message, .no-data-message')
        .forEach((el) => el.classList.add('hidden'));
    }

    switch (screenId) {
      case 'login-screen':
      case 'register-screen':
        // Forms are handled by reset/error message logic in showAuthScreen
        break;
      case 'records-screen':
        // Fetch/Render Records data (mock data here)
        renderRecordsScreen(mockTransactions, mockRecordsSummary);
        break;
      case 'charts-screen':
        // Fetch/Render Charts data (mock data here)
        // Render with default/current chart state (e.g., Expense, Month, Feb 2025)
        // Note: Period logic isn't fully implemented here, just initial render
        renderChartsScreen('Expense', 'Month', new Date(2025, 1, 1)); // Example: Feb 2025
        break;
      case 'reports-screen':
        // Render Accounts Report content by default
        showReportTab('accounts');
        break;
      case 'profile-screen':
        // Render Profile data (mock data here)
        renderProfileScreen(mockUserData);
        break;
      case 'add-transaction-overlay':
        // Render categories for the default type (Expense)
        renderCategories('Expense');
        // Reset segmented control to Expense
        document.querySelectorAll('#add-transaction-overlay .segmented-control .segment').forEach((segment) => {
          if (segment.dataset.transactionType === 'Expense') {
            segment.classList.add('active');
          } else {
            segment.classList.remove('active');
          }
        });
        break;
      case 'account-selection-overlay':
        // Render account list for selection
        renderAccountSelection(mockAccounts, selectedAccountId);
        break;
      // Add cases for other screens like TransactionForm, AddCategory etc.
      default:
        console.log(`Screen ${screenId} needs rendering logic.`);
        break;
    }

    // Re-replace Feather icons on the active screen content
    feather.replace();
  }

  // Format numbers with commas (Same as before)
  function formatAmount(amount) {
    return Math.abs(amount).toLocaleString();
  }

  // Group transactions by date (Same as before)
  function groupTransactionsByDate(txns) {
    const sectionsMap = txns.reduce((acc, txn) => {
      const date = new Date(txn.date).toISOString().split('T')[0];
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

  // --- Render Functions --- (Mostly same as before, targeting specific IDs)

  function renderRecordsScreen(transactions, summary) {
    const summaryValuesEl = document.querySelector('#records-screen .summary-values');
    if (summary) {
      summaryValuesEl.querySelector('.summary-value.expense').textContent = `-${formatAmount(summary.totalExpenses)}`;
      summaryValuesEl.querySelector('.summary-value.income').textContent = `+${formatAmount(summary.totalIncome)}`;
      summaryValuesEl.querySelector('.summary-value:not(.expense):not(.income)').textContent = `${
        summary.balance >= 0 ? '+' : '-'
      }${formatAmount(summary.balance)}`;
    }

    const transactionListEl = document.getElementById('records-transaction-list');
    transactionListEl.innerHTML = '';

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

    // Add click listeners to transaction items
    transactionListEl.querySelectorAll('.transaction-item').forEach((item) => {
      item.addEventListener('click', () => {
        const transactionId = item.dataset.transactionId;
        alert(`Navigate to transaction details for ID: ${transactionId}`);
      });
    });
    feather.replace(); // Replace new icons
  }

  function renderChartsScreen(chartType, periodType, date) {
    document.querySelector(
      '#charts-screen .header-title'
    ).innerHTML = `${chartType} <i data-feather="chevron-down" class="dropdown-arrow"></i>`;
    feather.replace();

    const periodTextEl = document.getElementById('charts-current-period');
    if (periodType === 'Month') {
      periodTextEl.textContent = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    } else {
      periodTextEl.textContent = date.getFullYear();
    }

    const mockChartData = {
      total: 1191000,
      categories: [
        { name: 'Shopping', amount: 398000, percentage: 33.39, color: '#FF6384', icon: 'shopping-cart' },
        { name: 'Car', amount: 269279, percentage: 22.59, color: '#36A2EB', icon: 'car' },
        { name: 'Electronics', amount: 228000, percentage: 19.13, color: '#FFCE56', icon: 'hard-drive' },
        { name: 'Vegetables', amount: 223000, percentage: 18.71, color: '#4BC0C0', icon: 'carrot' },
        { name: 'Transportation', amount: 29500, percentage: 2.47, color: '#9966CC', icon: 'truck' },
        { name: 'Food', amount: 24000, percentage: 2.01, color: '#FF9F40', icon: 'coffee' },
      ].sort((a, b) => b.amount - a.amount),
    };

    document.getElementById('charts-total-amount').textContent = `+${formatAmount(mockChartData.total)}`;

    const categoryListEl = document.getElementById('charts-category-list');
    categoryListEl.innerHTML = '';

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
    const summaryCardEl = document.querySelector('#accounts-report-content .summary-card');
    if (summaryCardEl) {
      document.getElementById('net-worth-value').textContent = formatAmount(0);
      document.getElementById('assets-value').textContent = formatAmount(0);
      document.getElementById('liabilities-value').textContent = formatAmount(0);
    }
    // Account list rendering is handled by renderAccountSelection for the overlay
  }

  function renderProfileScreen(userData) {
    const profileNameEl = document.querySelector('.profile-name');
    const profileIdEl = document.querySelector('.profile-id');
    const premiumStatusEl = document.querySelector('.premium-status-row .item-description');
    const blockAdsItem = document.getElementById('menu-block-ads');

    if (userData) {
      profileNameEl.textContent = userData.name;
      profileIdEl.textContent = `ID:${userData.id}`;
      premiumStatusEl.textContent = userData.isPremium ? 'Premium Member' : 'Free Member';

      if (blockAdsItem) {
        if (userData.isPremium) {
          blockAdsItem.style.display = 'none';
        } else {
          blockAdsItem.style.display = 'flex';
        }
      }
    }
  }

  function renderCategories(type) {
    const categoryGridEl = document.getElementById('category-grid');
    categoryGridEl.innerHTML = '';

    const categories = mockCategories[type];

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

    // Add click listeners to category items
    categoryGridEl.querySelectorAll('.category-grid-item').forEach((item) => {
      item.addEventListener('click', () => {
        const categoryId = item.dataset.categoryId;
        const categoryType = item.dataset.categoryType;
        const categoryName = item.dataset.categoryName;

        if (categoryId === 'add') {
          alert(`Navigate to Add Category screen for type: ${categoryType}`);
        } else {
          alert(`Navigate to Transaction Form for ${categoryType}: ${categoryName} (ID: ${categoryId})`);
        }
        // In a real app, you would likely hide the overlay here: hideOverlay();
      });
    });
    feather.replace(); // Replace new icons
  }

  function renderAccountSelection(accounts, currentSelectedId) {
    const accountListEl = document.getElementById('account-list');
    accountListEl.innerHTML = '';

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

    // Add click listeners to account items
    accountListEl.querySelectorAll('.account-item').forEach((item) => {
      item.addEventListener('click', () => {
        const accountId = parseInt(item.dataset.accountId, 10);
        const account = mockAccounts.find((acc) => acc.id === accountId); // Use mockAccounts directly

        if (account && account.isLocked) {
          alert('This is a VIP feature. Please upgrade.');
        } else if (account) {
          selectedAccountId = accountId; // Update the global state
          // Update UI to show checkmark on selected item
          accountListEl.querySelectorAll('.account-item').forEach((accItem) => accItem.classList.remove('selected'));
          item.classList.add('selected'); // Add a class for visual selection if needed

          alert(`Account selected: ${account.name}. Transaction list would update.`);
          // In a real app: Re-fetch and render transactions for the new selectedAccountId on the Records screen
          hideOverlay(); // Close the overlay
          // You might need to call updateScreenContent('records-screen') here
          // if the records screen was already active and needs to refresh its list
        }
      });
    });
    feather.replace(); // Replace new icons
  }

  // Helper to show content for the selected report tab (Analytics/Accounts)
  function showReportTab(tabName) {
    document.getElementById('accounts-report-content').classList.add('hidden');
    document.getElementById('analytics-report-content').classList.add('hidden');

    // Update segmented control active state
    document.querySelectorAll('#reports-screen .segmented-control .segment').forEach((segment) => {
      if (segment.dataset.reportTab === tabName) {
        segment.classList.add('active');
      } else {
        segment.classList.remove('active');
      }
    });

    if (tabName === 'accounts') {
      document.getElementById('accounts-report-content').classList.remove('hidden');
      // In a real app, call render function for accounts report data
      renderReportsScreen(mockAccounts); // Re-render account summary on tab switch
    } else if (tabName === 'analytics') {
      document.getElementById('analytics-report-content').classList.remove('hidden');
      // In a real app, call render function for analytics report data
    }
  }

  // --- Event Listeners ---

  // Login Form Submission
  document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');

    // Simple mock validation
    if (email === 'test@example.com' && password === 'password') {
      errorElement.textContent = '';
      // Simulate successful login and show main app
      showMainApp();
    } else {
      errorElement.textContent = 'Invalid email or password.';
    }
  });

  // Register Link Click
  document.getElementById('show-register').addEventListener('click', (event) => {
    event.preventDefault();
    showAuthScreen('register-screen');
  });

  // Login Link Click (from Register)
  document.getElementById('show-login').addEventListener('click', (event) => {
    event.preventDefault();
    showAuthScreen('login-screen');
  });

  // Bottom Navigation Clicks
  bottomNavButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const screenId = button.dataset.screen;

      if (button.classList.contains('fab')) {
        // FAB button triggers an overlay
        showOverlay(screenId);
      } else {
        // Regular nav button triggers a main tab screen
        showTabScreen(screenId);
      }
    });
  });

  // Records Screen Header Icon Clicks (Mock actions)
  document
    .querySelector('#records-screen .header i[data-feather="menu"]')
    .parentElement.addEventListener('click', () => {
      showOverlay('account-selection-overlay'); // Show account selection overlay
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
  });

  // Records Screen Ad Close Button
  document.querySelector('#records-screen .ad-banner .ad-close').addEventListener('click', (event) => {
    event.target.closest('.ad-banner').style.display = 'none';
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
      renderChartsScreen('Expense', periodType, new Date()); // Re-render charts (simulated)
    });
  });

  // Charts Screen Date Navigation Arrows (Simplified mock)
  document.querySelectorAll('#charts-screen .date-navigation .nav-arrow').forEach((arrow) => {
    arrow.addEventListener('click', () => {
      const direction = parseInt(arrow.dataset.direction, 10);
      alert(`Navigating ${direction === 1 ? 'forward' : 'backward'} in time (simulated).`);
      // In a real app, update date state and re-render charts
    });
  });

  // Charts Screen Period Shortcuts (This Month/Last Month - Simplified mock)
  document.querySelectorAll('#charts-screen .date-navigation .period-shortcut').forEach((shortcut) => {
    shortcut.addEventListener('click', () => {
      document
        .querySelectorAll('#charts-screen .date-navigation .period-shortcut')
        .forEach((s) => s.classList.remove('active'));
      shortcut.classList.add('active');
      const shortcutType = shortcut.dataset.shortcut;
      alert(`Selecting ${shortcutType} (simulated).`);
      // In a real app, calculate date range and re-render charts
    });
  });

  // Reports Screen Segmented Control (Analytics/Accounts)
  document.querySelectorAll('#reports-screen .segmented-control .segment').forEach((segment) => {
    segment.addEventListener('click', () => {
      const reportTab = segment.dataset.reportTab;
      showReportTab(reportTab); // Use the helper function
      alert(`Switched to ${reportTab} tab.`);
    });
  });

  // Reports Screen Action Buttons (Mock actions)
  document.getElementById('add-account-button').addEventListener('click', () => {
    alert('Navigate to Add Account screen.');
  });
  document.getElementById('manage-accounts-button').addEventListener('click', () => {
    alert('Navigate to Manage Accounts screen.');
  });

  // Profile Screen Menu Item Clicks (Mock actions)
  document.getElementById('menu-recommend').addEventListener('click', () => alert('Recommend to friends action.'));
  document.getElementById('menu-rate').addEventListener('click', () => alert('Rate the app action.'));
  document.getElementById('menu-block-ads').addEventListener('click', () => alert('Block Ads action.'));
  document.getElementById('menu-settings').addEventListener('click', () => alert('Navigate to Settings screen.'));

  // Add Transaction Overlay Segmented Control
  document.querySelectorAll('#add-transaction-overlay .segmented-control .segment').forEach((segment) => {
    segment.addEventListener('click', () => {
      document
        .querySelectorAll('#add-transaction-overlay .segmented-control .segment')
        .forEach((s) => s.classList.remove('active'));
      segment.classList.add('active');
      const transactionType = segment.dataset.transactionType;
      alert(`Switched to ${transactionType} categories.`);
      renderCategories(transactionType); // Render categories for the selected type
    });
  });

  // Add Transaction Overlay Cancel Button
  document.getElementById('add-transaction-cancel').addEventListener('click', () => {
    hideOverlay(); // Hide the overlay
    // No need to showTabScreen here, the underlying tab remains active
  });

  // Account Selection Overlay Close Button
  document.getElementById('account-selection-close').addEventListener('click', () => {
    hideOverlay(); // Hide the overlay
    // No need to showTabScreen here, the underlying tab remains active
  });

  // Account Selection Overlay Action Buttons (Mock actions)
  document.getElementById('add-vip-button').addEventListener('click', () => {
    alert('Navigate to Premium/Add VIP screen.');
    // In a real app: hideOverlay(); showScreen('premium-screen');
  });
  document.getElementById('join-account-button').addEventListener('click', () => {
    alert('Navigate to Join Account flow.');
    // In a real app: hideOverlay(); showScreen('join-account-screen');
  });

  // --- Initial Setup ---
  // Start by showing only the login screen
  showAuthScreen('login-screen');
  // The rest of the app (#main-app) is hidden by default via CSS and showAuthScreen
});
