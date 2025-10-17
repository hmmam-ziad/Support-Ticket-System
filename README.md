
# Support Ticket System 🎫

A modern, full-stack support ticket management system built with Next.js and .NET Core, featuring real-time updates, role-based access control, and a beautiful UI.



## ✨ Features

- 🔐 Secure authentication and authorization
- 👥 Role-based access (Admin/User)
- 🎫 Create, manage and track support tickets
- 💬 Real-time ticket updates and replies
- 🎨 Beautiful UI with dark/light mode
- 📱 Fully responsive design
- 🔍 Advanced ticket filtering and sorting
- ⚡ Fast and efficient performance


## 🛠️ Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Prisma](https://www.prisma.io/) - Database ORM
- [React Hook Form](https://react-hook-form.com/) - Form handling

### Backend
- [.NET Core 9](https://dotnet.microsoft.com/) - Backend framework
- [Entity Framework](https://docs.microsoft.com/ef/) - ORM
- [SQL Server](https://www.microsoft.com/sql-server) - Database
- [JWT](https://jwt.io/) - Authentication


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- .NET Core 9 SDK
- SQL Server
- MongoDB (for ticket storage)



##  Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/support-ticket-system.git

# Navigate to frontend directory
cd support-ticket-front-end

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```
## Backend Setup
```
# Navigate to backend directory
cd Support-Ticket-Back-end

# Restore packages
dotnet restore

# Update database
dotnet ef database update

# Run the application
dotnet run
```

## 🌟 Usage

1- User Registration/Login:
- Create a new account or login with existing credentials
- Different interfaces for admin and regular users
2- Creating Tickets
- Click "New Ticket" button
- Fill in ticket details (title, description, priority)
- Submit the ticket
3- Managing Tickets
- View all tickets in the dashboard
- Filter by status (Open, In Progress, Closed)
- Sort by priority or date
- Add replies and track updates
4- Admin Features
- Manage all user tickets
- Change ticket status and priority
- User management

## 📸 Screenshots

## 🤝 Contributing

`Contributions` are always welcome! Feel free to submit issues and enhancement requests.
```
1- Fork the repository
2-  Create your feature branch (git checkout -b feature/AmazingFeature)
3- Commit your changes (git commit -m 'Add some AmazingFeature')
4- Push to the branch (git push origin feature/AmazingFeature)
5- Open a Pull Request
```



## 📄 License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the LICENSE file for details.


## 📧 Contact
hmmamxxc@gmail.com.

Project Link - https://github.com/hmmam-ziad/Support-Ticket-System
## Badges

| Frontend | Backend | License |
|----------|--------|--------|
| ![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js) | ![.NET Core](https://img.shields.io/badge/.NET%20Core-9-blue?logo=dotnet) | ![License](https://img.shields.io/badge/License-MIT-green) |


