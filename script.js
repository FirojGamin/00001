// FS Ride - Travel Billing System JavaScript

// Global state management
const state = {
    clients: JSON.parse(localStorage.getItem('fsride_clients')) || [],
    invoices: JSON.parse(localStorage.getItem('fsride_invoices')) || [],
    expenses: JSON.parse(localStorage.getItem('fsride_expenses')) || [],
    trips: JSON.parse(localStorage.getItem('fsride_trips')) || [],
    currentTheme: localStorage.getItem('fsride_theme') || 'light'
};

// Utility functions
function saveToLocalStorage(key, data) {
    localStorage.setItem(`fsride_${key}`, JSON.stringify(data));
}

function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(amount).replace('₹', '₹');
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN');
}

// Animation utilities
function animateElement(element, animation, duration = 300) {
    return new Promise((resolve) => {
        element.style.animation = `${animation} ${duration}ms ease-out`;
        setTimeout(() => {
            element.style.animation = '';
            resolve();
        }, duration);
    });
}

function staggerAnimation(elements, animation, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            animateElement(element, animation);
        }, index * delay);
    });
}

// DOM manipulation utilities
function createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content;
    return element;
}

function showNotification(message, type = 'success') {
    const notification = createElement('div', `notification ${type}`, message);
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Theme management
function initializeTheme() {
    document.body.classList.toggle('dark', state.currentTheme === 'dark');
    updateThemeIcon();
}

function toggleTheme() {
    state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark');
    localStorage.setItem('fsride_theme', state.currentTheme);
    updateThemeIcon();
    
    // Animate theme transition
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Animate icon change
    icon.style.transform = 'rotate(90deg) scale(0)';
    setTimeout(() => {
        icon.className = state.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        icon.style.transform = 'rotate(0deg) scale(1)';
    }, 150);
}

// Navigation management
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = item.dataset.page;
            navigateToPage(targetPage);
        });
    });
}

function navigateToPage(pageName) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page with animation
    const targetPage = document.getElementById(pageName);
    targetPage.classList.add('active');
    
    // Animate page transition
    targetPage.style.opacity = '0';
    targetPage.style.transform = 'translateY(20px)';
    setTimeout(() => {
        targetPage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        targetPage.style.opacity = '1';
        targetPage.style.transform = 'translateY(0)';
        setTimeout(() => {
            targetPage.style.transition = '';
        }, 300);
    }, 50);
}

// Statistics calculations
function calculateStats() {
    const stats = {
        totalInvoices: state.invoices.length,
        totalRevenue: state.invoices.reduce((sum, invoice) => sum + (invoice.total || 0), 0),
        totalDistance: state.trips.reduce((sum, trip) => sum + (trip.distance || 0), 0),
        activeClients: state.clients.length,
        totalExpenses: state.expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0)
    };
    
    return stats;
}

function updateDashboardStats() {
    const stats = calculateStats();
    
    // Animate stat updates
    Object.keys(stats).forEach((key, index) => {
        const element = document.getElementById(key);
        if (element) {
            setTimeout(() => {
                // Animate the value change
                element.style.transform = 'scale(1.1)';
                element.style.transition = 'transform 0.2s ease';
                
                setTimeout(() => {
                    if (key === 'totalRevenue') {
                        element.textContent = formatCurrency(stats[key]);
                    } else if (key === 'totalDistance') {
                        element.textContent = `${stats[key].toLocaleString()} km`;
                    } else {
                        element.textContent = stats[key].toLocaleString();
                    }
                    
                    element.style.transform = 'scale(1)';
                }, 100);
                
                setTimeout(() => {
                    element.style.transition = '';
                }, 300);
            }, index * 100);
        }
    });
}

// Modal management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    
    // Animate modal
    const content = modal.querySelector('.modal-content');
    content.style.transform = 'scale(0.9) translateY(-20px)';
    content.style.opacity = '0';
    
    setTimeout(() => {
        content.style.transition = 'all 0.3s ease';
        content.style.transform = 'scale(1) translateY(0)';
        content.style.opacity = '1';
        
        setTimeout(() => {
            content.style.transition = '';
        }, 300);
    }, 50);
    
    // Focus first input
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const content = modal.querySelector('.modal-content');
    
    // Animate out
    content.style.transition = 'all 0.3s ease';
    content.style.transform = 'scale(0.9) translateY(-20px)';
    content.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.remove('active');
        content.style.transition = '';
        
        // Reset form
        const form = modal.querySelector('form');
        if (form) form.reset();
    }, 300);
}

// Client management
function initializeClientForm() {
    const form = document.getElementById('clientForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveClient();
    });
}

function saveClient() {
    const client = {
        id: generateId(),
        name: document.getElementById('clientName').value,
        contactPerson: document.getElementById('contactPerson').value,
        email: document.getElementById('clientEmail').value,
        phone: document.getElementById('clientPhone').value,
        gstin: document.getElementById('clientGstin').value,
        address: document.getElementById('clientAddress').value,
        createdAt: new Date().toISOString()
    };
    
    state.clients.push(client);
    saveToLocalStorage('clients', state.clients);
    updateClientSelect();
    updateDashboardStats();
    closeModal('clientModal');
    showNotification('Client added successfully!');
}

function updateClientSelect() {
    const select = document.getElementById('clientSelect');
    select.innerHTML = '<option value="">Select a client</option>';
    
    state.clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.name;
        select.appendChild(option);
    });
}

// Expense management
function initializeExpenseForm() {
    const form = document.getElementById('expenseForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveExpense();
    });
}

function saveExpense() {
    const expense = {
        id: generateId(),
        title: document.getElementById('expenseTitle').value,
        amount: parseFloat(document.getElementById('expenseAmount').value),
        category: document.getElementById('expenseCategory').value,
        date: document.getElementById('expenseDate').value,
        description: document.getElementById('expenseDescription').value,
        createdAt: new Date().toISOString()
    };
    
    state.expenses.push(expense);
    saveToLocalStorage('expenses', state.expenses);
    updateDashboardStats();
    closeModal('expenseModal');
    showNotification('Expense added successfully!');
}

// Invoice management
function initializeInvoiceForm() {
    const form = document.getElementById('invoiceForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveInvoice();
    });
    
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
    
    // Initialize with one item row
    updateInvoiceCalculations();
    
    // Add event listeners for calculations
    document.addEventListener('input', (e) => {
        if (e.target.matches('.item-quantity, .item-rate')) {
            updateItemAmount(e.target);
            updateInvoiceCalculations();
        }
    });
}

function addItem() {
    const container = document.getElementById('itemsContainer');
    const itemRow = createElement('div', 'item-row', `
        <input type="text" placeholder="Description" class="item-description" required>
        <input type="number" placeholder="Qty" class="item-quantity" min="1" required>
        <input type="number" placeholder="Rate" class="item-rate" step="0.01" required>
        <input type="number" placeholder="Amount" class="item-amount" readonly>
        <button type="button" class="remove-item" onclick="removeItem(this)">
            <i class="fas fa-trash"></i>
        </button>
    `);
    
    container.appendChild(itemRow);
    
    // Animate new item
    itemRow.style.opacity = '0';
    itemRow.style.transform = 'translateY(20px)';
    setTimeout(() => {
        itemRow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        itemRow.style.opacity = '1';
        itemRow.style.transform = 'translateY(0)';
        setTimeout(() => {
            itemRow.style.transition = '';
        }, 300);
    }, 50);
    
    // Focus first input
    itemRow.querySelector('.item-description').focus();
}

function removeItem(button) {
    const itemRow = button.closest('.item-row');
    
    // Animate removal
    itemRow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    itemRow.style.opacity = '0';
    itemRow.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        itemRow.remove();
        updateInvoiceCalculations();
    }, 300);
}

function updateItemAmount(input) {
    const row = input.closest('.item-row');
    const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
    const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
    const amount = quantity * rate;
    
    row.querySelector('.item-amount').value = amount.toFixed(2);
}

function updateInvoiceCalculations() {
    const items = document.querySelectorAll('.item-row');
    let subtotal = 0;
    
    items.forEach(item => {
        const amount = parseFloat(item.querySelector('.item-amount').value) || 0;
        subtotal += amount;
    });
    
    const gstType = document.getElementById('gstType').value;
    let cgst = 0, sgst = 0, igst = 0;
    
    if (gstType === 'cgst_sgst') {
        cgst = subtotal * 0.09; // 9% CGST
        sgst = subtotal * 0.09; // 9% SGST
    } else if (gstType === 'igst') {
        igst = subtotal * 0.18; // 18% IGST
    }
    
    const total = subtotal + cgst + sgst + igst;
    
    // Update display with animation
    const elements = [
        { id: 'subtotal', value: formatCurrency(subtotal) },
        { id: 'cgst', value: formatCurrency(cgst) },
        { id: 'sgst', value: formatCurrency(sgst) },
        { id: 'total', value: formatCurrency(total) }
    ];
    
    elements.forEach((item, index) => {
        const element = document.getElementById(item.id);
        setTimeout(() => {
            element.style.transform = 'scale(1.05)';
            element.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                element.textContent = item.value;
                element.style.transform = 'scale(1)';
            }, 100);
            
            setTimeout(() => {
                element.style.transition = '';
            }, 200);
        }, index * 50);
    });
}

function saveInvoice() {
    const items = [];
    document.querySelectorAll('.item-row').forEach(row => {
        const description = row.querySelector('.item-description').value;
        const quantity = parseFloat(row.querySelector('.item-quantity').value);
        const rate = parseFloat(row.querySelector('.item-rate').value);
        const amount = parseFloat(row.querySelector('.item-amount').value);
        
        if (description && quantity && rate) {
            items.push({ description, quantity, rate, amount });
        }
    });
    
    if (items.length === 0) {
        showNotification('Please add at least one item', 'error');
        return;
    }
    
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const gstType = document.getElementById('gstType').value;
    let cgst = 0, sgst = 0, igst = 0;
    
    if (gstType === 'cgst_sgst') {
        cgst = subtotal * 0.09;
        sgst = subtotal * 0.09;
    } else {
        igst = subtotal * 0.18;
    }
    
    const invoice = {
        id: generateId(),
        invoiceNumber: `INV-${Date.now()}`,
        clientId: document.getElementById('clientSelect').value,
        date: document.getElementById('invoiceDate').value,
        dueDate: document.getElementById('dueDate').value,
        items,
        subtotal,
        cgst,
        sgst,
        igst,
        total: subtotal + cgst + sgst + igst,
        gstType,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    state.invoices.push(invoice);
    saveToLocalStorage('invoices', state.invoices);
    updateDashboardStats();
    showNotification('Invoice saved successfully!');
    
    // Reset form
    document.getElementById('invoiceForm').reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
    
    // Reset items to one row
    const container = document.getElementById('itemsContainer');
    container.innerHTML = `
        <div class="item-row">
            <input type="text" placeholder="Description" class="item-description" required>
            <input type="number" placeholder="Qty" class="item-quantity" min="1" required>
            <input type="number" placeholder="Rate" class="item-rate" step="0.01" required>
            <input type="number" placeholder="Amount" class="item-amount" readonly>
            <button type="button" class="remove-item" onclick="removeItem(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    updateInvoiceCalculations();
}

// PDF Generation (simplified)
function generatePDF() {
    showNotification('PDF generation feature requires a PDF library. This is a demo.', 'info');
}

// Enhanced animations for stats cards
function animateStatsCards() {
    const cards = document.querySelectorAll('.stat-card');
    
    // Add hover animations
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
            
            // Animate icon
            const icon = card.querySelector('.stat-icon');
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.6s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            
            // Reset icon
            const icon = card.querySelector('.stat-icon');
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 100);
        });
        
        // Add click animation
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            }, 100);
        });
    });
}

// Initialize floating shapes animation
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Random animation duration and delay
        const duration = 15 + Math.random() * 10; // 15-25 seconds
        const delay = Math.random() * 5; // 0-5 seconds delay
        
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
        
        // Add mouse interaction
        shape.addEventListener('mouseenter', () => {
            shape.style.animationPlayState = 'paused';
            shape.style.transform = 'scale(1.2)';
            shape.style.transition = 'transform 0.3s ease';
        });
        
        shape.addEventListener('mouseleave', () => {
            shape.style.animationPlayState = 'running';
            shape.style.transform = 'scale(1)';
        });
    });
}

// Initialize sidebar animations
function initializeSidebarAnimations() {
    const sidebar = document.getElementById('sidebar');
    const navItems = sidebar.querySelectorAll('.nav-item');
    
    // Stagger nav item animations on load
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                item.style.transition = '';
            }, 400);
        }, 600 + (index * 100));
    });
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-lg);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background: linear-gradient(135deg, var(--green), hsl(142, 76%, 40%));
        }
        
        .notification.error {
            background: linear-gradient(135deg, hsl(0, 84%, 60%), hsl(0, 84%, 50%));
        }
        
        .notification.info {
            background: linear-gradient(135deg, var(--blue), hsl(221, 83%, 60%));
        }
        
        @keyframes slideInStagger {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .stagger-1 { animation: slideInStagger 0.6s ease-out 0.1s both; }
        .stagger-2 { animation: slideInStagger 0.6s ease-out 0.2s both; }
        .stagger-3 { animation: slideInStagger 0.6s ease-out 0.3s both; }
        .stagger-4 { animation: slideInStagger 0.6s ease-out 0.4s both; }
    `;
    document.head.appendChild(style);
}

// Initialize application
function initializeApp() {
    console.log('🚀 Initializing FS Ride Application...');
    
    // Add dynamic styles
    addDynamicStyles();
    
    // Initialize theme
    initializeTheme();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize forms
    initializeClientForm();
    initializeExpenseForm();
    initializeInvoiceForm();
    
    // Load data and update UI
    updateClientSelect();
    updateDashboardStats();
    
    // Initialize animations
    setTimeout(() => {
        animateStatsCards();
        initializeFloatingShapes();
        initializeSidebarAnimations();
    }, 100);
    
    // Add event listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id;
            closeModal(modalId);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modal
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
    
    console.log('✅ FS Ride Application initialized successfully!');
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to FS Ride! 🚗', 'success');
    }, 1000);
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Global functions for HTML onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.addItem = addItem;
window.removeItem = removeItem;
window.generatePDF = generatePDF;