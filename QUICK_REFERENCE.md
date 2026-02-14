# 🚀 Quick Reference Card

**Emergency Ward Bed Status Monitoring & AI Daily Report System**

---

## 📋 Quick Start for Contributors

### 1. Fork & Clone
```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR-USERNAME/EWTCS.git
cd EWTCS
git remote add upstream https://github.com/ORIGINAL-ORG/EWTCS.git
```

### 2. Create Branch
```bash
git checkout -b feature/issue-<ID>-description
# Example: feature/issue-23-add-bed-grid
```

### 3. Make Changes
- Max 200 lines per file
- Small, focused functions
- Comment complex logic

### 4. Commit & Push
```bash
git add .
git commit -m "feat: add bed status grid (#23)"
git push origin feature/issue-23-add-bed-grid
```

### 5. Create PR
- Fill out template
- Link issue: `Closes #23`
- Wait for review

---

## 🏷️ Branch Naming

```
<type>/issue-<id>-<description>

Types:
  feature/   - New features
  bugfix/    - Bug fixes
  docs/      - Documentation
  refactor/  - Code refactoring
  test/      - Tests
  chore/     - Maintenance

Examples:
  feature/issue-23-add-bed-grid
  bugfix/issue-45-fix-timer-reset
  docs/issue-12-update-readme
```

---

## 💬 Commit Messages

```
<type>: <description> (#issue)

Types:
  feat:     New feature
  fix:      Bug fix
  docs:     Documentation
  refactor: Code refactoring
  test:     Tests
  chore:    Maintenance

Examples:
  feat: add color-coded bed status (#23)
  fix: resolve timer reset bug (#45)
  docs: update setup instructions (#12)
```

---

## 📏 Coding Standards

### File Size
- **Max 200 lines per file**
- Split large files into modules

### Naming
- **Files**: `kebab-case.ts`
- **Components**: `PascalCase.tsx`
- **Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`

### Code Quality
- Small, focused functions
- Descriptive names
- Comment complex logic
- No dead code
- Consistent formatting

---

## ✅ PR Checklist

Before submitting:
- [ ] No file exceeds 200 lines
- [ ] Code formatted
- [ ] Tested locally
- [ ] Complex logic commented
- [ ] No console.log
- [ ] PR template filled
- [ ] Issue linked
- [ ] Screenshots (if UI)

---

## 🏷️ GitHub Labels

### Priority
- `priority: high` - Urgent
- `priority: medium` - Important
- `priority: low` - Nice to have

### Type
- `frontend` - Frontend work
- `backend` - Backend work
- `bug` - Something broken
- `enhancement` - New feature
- `documentation` - Docs

### Status
- `ready` - Ready to work on
- `in progress` - Being worked on
- `review needed` - Needs review
- `blocked` - Waiting on something

### Helper
- `good first issue` - Beginner-friendly
- `help wanted` - Need help

---

## 👥 Roles

### Contributor
- Submit PRs
- Fix bugs
- Add features

### Reviewer
- Review code
- Provide feedback
- Approve PRs

### Maintainer
- Merge PRs
- Manage releases
- Set direction

---

## 📞 Where to Communicate

| What | Where |
|------|-------|
| Bug reports | GitHub Issues |
| Feature requests | GitHub Issues |
| Code review | PR comments |
| Questions | GitHub Discussions |
| Security | Email maintainer |

---

## ⚠️ Important Rules

1. ⛔ **No direct push to main**
2. 🎯 **One issue = One PR**
3. 📏 **Max 200 lines per file**
4. ✅ **1 approval required**
5. 💬 **Meaningful commits**

---

## 🔗 Quick Links

- [Full Contributing Guide](CONTRIBUTING.md)
- [Workflow Rules](docs/WORKFLOW_RULES.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Project Overview](README.md)

---

## 🆘 Need Help?

1. Check [CONTRIBUTING.md](CONTRIBUTING.md)
2. Search [GitHub Discussions](../../discussions)
3. Ask in issue comments
4. Contact maintainer

---

**Made with ❤️ by the EWTCS community**
