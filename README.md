# Postman Clone (Frontend)

A real-time collaborative API testing tool with Postman-like features, built with React, MUI, and Socket.io.

## ✨ Features

- **Real-time collaboration** (shared request editing via Socket.io)
- **Collections & saved requests** (MongoDB persistence)
- **API request builder** (URL/headers/body with all HTTP methods)
- **Response history viewer** with time-travel debugging
- **Material UI** interface with dark/light mode

## 🛠 Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 | Node.js |
| Material-UI | Express |
| Zustand | MongoDB |
| Socket.io-client | Socket.io |
| react-split-pane | Axios |

## 🚀 Quick Start

```bash
git clone https://github.com/your-username/postman-clone-frontend.git
cd postman-clone-frontend
npm install
npm start
```

⚙ Configuration
Create `.env`:

`env`

```json
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```
