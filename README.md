
# 🪙 PennyPath

PennyPath is a smart budgeting assistant designed to help users make informed and intentional decisions about how they spend their money. By blending modern design, AI insights, and user-friendly interfaces, PennyPath empowers individuals to break down their budgets and explore meaningful financial goals.

---

## 🔍 Problem We’re Solving

Many people struggle to manage their budgets efficiently and make intentional spending decisions. Most budgeting tools are either overly complex or too rigid, lacking personalization or guidance.

PennyPath provides:
- A guided budgeting experience
- AI-generated suggestions tailored to your goals
- Flexible category selection
- A clean, modern interface that’s easy to use

---

## 🧰 Tech Stack

### 🔹 Frontend
- **Framework:** React  
- **Styling:** Tailwind CSS  
- **Language:** JavaScript  
- **Hosting:** Firebase  

### 🔹 Backend
- **Framework:** Flask  
- **Language:** Python  
- **Hosting:** (To be determined — possibly Heroku)

### 🧠 AI/ML
- **Model Type:** Gemini API (for generating budget recommendations based on user input)
  
### 🗄️ Database (Future)
- **Preference TBD:** MySQL or MongoDB
- **ORM:** SQLAlchemy (if using SQL)

### 🎨 Design
- **Tool:** Figma

---

## ⚙️ How It Works

1. The user visits the site and enters their total budget.
2. They select spending categories (like Food, Travel, Subscriptions, etc.) or create custom ones.
3. The frontend sends this data to a Flask backend using `Fetch API`.
4. The backend loads the trained AI model (Gemini) and generates budget recommendations.
5. These suggestions are sent back to the frontend and displayed to the user.

---

## ✅ Current Features

- Responsive UI with category selection
- Budget input and validation
- Custom category addition
- AI-generated suggestions based on entered budget using Gemini
- Clear form error handling
- Deployed live frontend: [PennyPath Live](https://pennypath-bd3cd.web.app/)

---

## 🔮 Planned Features

- Connect to real financial accounts (banks, credit cards)
- Let users choose how much of their budget to allocate or save
- Real-time chart visualizations of allocations
- Progress tracking toward goals (e.g., saving for a trip)
- Notifications when user goes over budget
- “Smart Save” suggestions from Gemini AI
- Option to split funds across multiple goals
- Dark mode 🌙
- Medicaid and medical insurance support
- Budgeting tools for managing illness and disability-related expenses

---

## 🔐 Security Considerations

- All user inputs are validated and sanitized
- CORS handled with `flask-cors`
- **Future Updates**:
  - Rate limiting to prevent abuse of public API
  - Sensitive data encrypted if using user accounts in future
