# FS Ride - Travel Billing System

A beautiful, animated offline travel billing system built with pure HTML, CSS, and JavaScript.

## Features

- **Animated Dashboard** - Beautiful cards with smooth transitions and floating elements
- **Client Management** - Add and manage client information
- **Invoice Generation** - Create professional invoices with GST calculations (CGST, SGST, IGST)
- **Expense Tracking** - Monitor travel expenses by category
- **Dark/Light Theme** - Toggle between themes with smooth transitions
- **Responsive Design** - Works perfectly on all devices
- **Offline Capability** - All data stored locally in browser

## Getting Started

1. Extract the zip file to your desired location
2. Open `index.html` in any modern web browser
3. Start managing your travel billing!

## File Structure

```
fs-ride/
├── index.html          # Main HTML file
├── styles.css          # Beautiful animations and styling
├── script.js           # Full functionality and interactions
└── README.md           # This file
```

## How to Use

### Dashboard
- View key statistics with animated counters
- Quick access to add clients and expenses
- Beautiful floating animations and responsive cards

### Adding Clients
1. Click "Add Client" button
2. Fill in client details (name, contact, GSTIN, etc.)
3. Save to store locally

### Creating Invoices
1. Select a client from the dropdown
2. Add invoice items with description, quantity, and rate
3. GST is automatically calculated based on type (CGST+SGST or IGST)
4. Save or generate PDF (demo feature)

### Adding Expenses
1. Click "Add Expense" button
2. Enter expense details and category
3. Track all your travel-related costs

### Theme Toggle
- Click the moon/sun icon in sidebar to switch themes
- All animations work seamlessly in both modes

## Features Overview

### Animations
- **Slide-in animations** for sidebar navigation
- **Staggered card animations** on dashboard load
- **Floating background shapes** with continuous motion
- **Hover effects** on all interactive elements
- **Smooth transitions** for theme switching
- **Modal animations** with scale and fade effects
- **Button interactions** with scaling and shadow effects

### Data Storage
- All data is stored locally using localStorage
- No server required - fully offline
- Data persists between browser sessions

### Responsive Design
- Mobile-friendly layout
- Adaptive grid system
- Touch-friendly interactions

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

You can easily customize the design by modifying the CSS variables in `styles.css`:

```css
:root {
    --primary: hsl(211, 100%, 50%);
    --blue: hsl(221, 83%, 53%);
    --green: hsl(142, 76%, 36%);
    --purple: hsl(262, 83%, 58%);
    --amber: hsl(32, 95%, 44%);
}
```

## Development

This is a standalone application that doesn't require any build process or dependencies. Simply edit the files and refresh your browser to see changes.

### Key Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Advanced animations and grid layouts
- **JavaScript ES6+** - Modern functionality
- **Font Awesome** - Beautiful icons
- **Local Storage API** - Data persistence

## License

This project is open source and available under the MIT License.

## Support

For any issues or questions, please check the code comments in the JavaScript file for detailed explanations of functionality.

---

**Enjoy using FS Ride for your travel billing needs!** 🚗✨