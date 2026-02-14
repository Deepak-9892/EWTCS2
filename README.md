# Emergency Ward Bed Status Monitoring & AI Daily Report System

> A nurse desk dashboard that shows real-time bed status with color coding and generates automatic daily AI performance reports for hospital management.

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-purple.svg)](CODE_OF_CONDUCT.md)

## 📋 Project Overview

This system provides a simple, real-time digital dashboard for emergency ward bed status monitoring at JMCH Medical College & Hospital. It enables one-click updates, automatic time tracking, visual color-coded monitoring, and AI-generated daily performance reports.

**Focus:** Visibility, discipline, and reporting — not replacing existing hospital systems.

## 🎯 Key Features

- **Real-time Bed Monitoring**: Visual grid dashboard showing all emergency beds
- **One-Click Status Updates**: Nurses can update bed stages with a single click
- **Automatic Time Tracking**: System tracks patient time at each stage
- **Color-Coded Alerts**: Visual indicators for bed status and delays
- **AI Daily Summaries**: Automated performance reports for management
- **Role-Based Access**: Separate views for nurses, supervisors, and administrators

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.1.6, shadcn/ui, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL
- **AI Engine**: Rule-based analytics + AI language model
- **Hosting**: Cloud/On-premise deployment

## 🚀 How to Run Locally

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/EWTCS.git
   cd EWTCS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

4. **Set up the database**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

## 🤝 Contributing

We welcome contributions from developers of all skill levels! This is a beginner-friendly project.

### Quick Start for Contributors

1. **Fork** this repository
2. **Create a branch** following our naming convention
3. **Make your changes** following our coding standards
4. **Submit a pull request** linking to the relevant issue

### Important Rules

- ⛔ **No direct push to `main`** — all changes via Pull Requests
- 🎯 **One issue = One PR** — keep changes focused
- 📏 **Max 200 lines per file** — keep files small and maintainable
- 🧩 **Small functions** — single responsibility principle
- 💬 **Meaningful commits** — clear, descriptive commit messages
- 📝 **Comment complex logic** — help others understand your code

### Branch Naming Convention

```
feature/issue-<id>-short-description
bugfix/issue-<id>-short-description
docs/issue-<id>-short-description
```

**Examples:**
- `feature/issue-12-add-bed-grid`
- `bugfix/issue-45-fix-timer-reset`
- `docs/issue-8-update-setup-guide`

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📚 Documentation

- [Product Requirements Document](PRD.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [API Documentation](docs/API.md) *(coming soon)*
- [Database Schema](docs/DATABASE.md) *(coming soon)*

## 👥 Team Roles

- **Maintainer**: Reviews PRs, manages releases, sets project direction
- **Reviewers**: Review code, provide feedback, ensure quality
- **Contributors**: Submit PRs, fix bugs, add features, improve docs

## 📊 Project Status

This project is currently in **active development** (MVP phase).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built for JMCH Medical College & Hospital to improve emergency ward efficiency.

## 📞 Support

- **Issues**: Use [GitHub Issues](../../issues) for bug reports and feature requests
- **Discussions**: Use [GitHub Discussions](../../discussions) for questions and ideas
- **Security**: Report security vulnerabilities to [security@example.com](mailto:security@example.com)

---

**Made with ❤️ by the EWTCS community**
