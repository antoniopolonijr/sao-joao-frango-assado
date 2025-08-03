# São João Frango Assado

[![GitHub](https://img.shields.io/badge/GitHub-antoniopolonijr%2Fsao--joao--frango--assado-blue?logo=github)](https://github.com/antoniopolonijr/sao-joao-frango-assado)

**Personal project by Antonio Poloni**  
Food ordering system for São João Frango Assado

---

## Overview

São João Frango Assado is a web-based food ordering system developed to streamline the process of selecting, customizing, and purchasing homemade meals. The project offers an intuitive interface for customers and a robust order management experience for the business.

## Features

- **Online Menu**: Browse a dynamic menu of homemade dishes, including rotating “Food of the Day.”
- **Customizable Orders**: Select food types and sizes (Pequeno, Médio, Grande) with real-time price updates.
- **Cart Management**: Add multiple dishes to your cart, review details, and see total cost in Brazilian Real (BRL).
- **Order Checkout**: Seamless checkout process integrated with backend API for order submission.
- **Order History**: View previous orders, including details, images, and totals.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Tech Stack

- **Frontend**: React (JSX), Context API for state management
- **Routing**: [`@tanstack/react-router`](https://tanstack.com/router)
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **API Integration**: Fetch API for communication with backend endpoints
- **Localization**: Currency formatting for Brazilian Real (pt-BR)
- **Styling**: CSS

## Structure

```
src/
  ├── App.jsx
  ├── routes/
  │    ├── order.lazy.jsx
  │    ├── past.lazy.jsx
  ├── Cart.jsx
  ├── Food.jsx
  ├── FoodOfTheDay.jsx
  ├── Header.jsx
  ├── contexts.js
  ├── useFoodOfTheDay.jsx
  └── api/
        └── getPastOrder.js
index.html
style.css
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/antoniopolonijr/sao-joao-frango-assado.git
   cd sao-joao-frango-assado
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set environment variables:**

   - Create a `.env` file and set `VITE_API_URL` to your backend API endpoint.

4. **Run the app locally:**
   ```bash
   npm run dev
   ```

## API Endpoints

- `/api/foods` — Fetches menu items
- `/api/order` — Submits current cart order
- `/api/food-of-the-day` — Gets today's featured dish
- `/api/past-order/:order` — Retrieves details of past orders

## Testing

Run unit and integration tests with Vitest:

```bash
npm test
```

## Contributing

Pull requests and suggestions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Contact

- **Developer**: Antonio Poloni
- **Email**: [antoniopolonijr@gmail.com](mailto:antoniopolonijr@gmail.com)
- **GitHub**: [@antoniopolonijr](https://github.com/antoniopolonijr)
- **LinkedIn**: [Antonio Poloni](https://www.linkedin.com/in/antonio-br%C3%A1s-poloni-j%C3%BAnior-27148390/)
- **Portfolio**: [antoniopolonijr.github.io](https://antoniopolonijr.github.io/index.html)
