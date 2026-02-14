# Workflow Rules

This document defines the complete development workflow for the EWTCS project.

## Branch Naming Convention

All branches must follow this naming pattern:

```
<type>/issue-<id>-<short-description>
```

### Types

- `feature/` - New features or enhancements
- `bugfix/` - Bug fixes
- `hotfix/` - Emergency production fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### Examples

✅ **Good:**
```
feature/issue-23-add-bed-grid
bugfix/issue-45-fix-timer-reset
docs/issue-12-update-readme
refactor/issue-67-split-large-file
```

❌ **Bad:**
```
my-feature
fix-bug
john-dev
update
```

### Rules

- Always include issue number
- Use lowercase
- Use hyphens, not underscores
- Keep description short (2-4 words)
- Be descriptive but concise

## Development Workflow

### Complete Flow Diagram

```
┌─────────────────┐
│  Browse Issues  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Comment on      │
│ Issue to Claim  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Wait for        │
│ Assignment      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Fork Repository │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Clone Your Fork │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Branch   │
│ (naming conv.)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Make Changes    │
│ (follow rules)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Test Locally    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Commit Changes  │
│ (good messages) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Push to Fork    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create PR       │
│ (fill template) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Link Issue      │
│ (Closes #XX)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Wait for Review │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Address         │
│ Feedback        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Get Approval    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Maintainer      │
│ Merges PR       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Issue Closed    │
│ 🎉 Success!     │
└─────────────────┘
```

## Detailed Steps

### 1. Issue Selection

**Before starting any work:**

1. Browse [open issues](../../issues)
2. Look for:
   - `good first issue` (if you're new)
   - `help wanted`
   - Issues matching your skills
3. Read the issue completely
4. Comment: "I'd like to work on this"
5. Wait for maintainer assignment

**⚠️ Do NOT start work on unassigned issues**

### 2. Fork and Setup

```bash
# Fork on GitHub (click Fork button)

# Clone your fork
git clone https://github.com/YOUR-USERNAME/EWTCS.git
cd EWTCS

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL-ORG/EWTCS.git

# Verify remotes
git remote -v
```

### 3. Create Branch

```bash
# Ensure you're on main
git checkout main

# Pull latest changes
git pull upstream main

# Create and switch to new branch
git checkout -b feature/issue-23-add-bed-grid
```

### 4. Make Changes

Follow these rules:

- ✅ **Max 200 lines per file**
- ✅ **Small, focused functions**
- ✅ **Clear, descriptive names**
- ✅ **Comment complex logic**
- ✅ **Remove debug code**
- ✅ **Format code properly**

### 5. Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests (if available)
npm test

# Check formatting
npm run format

# Check linting
npm run lint
```

**Verify everything works before committing!**

### 6. Commit Changes

```bash
# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: add bed status grid component (#23)"
```

**Commit message format:**

```
<type>: <description> (#issue-number)

[optional body]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

**Examples:**

```
feat: add color-coded bed status grid (#23)
fix: resolve timer reset bug on page refresh (#45)
docs: update setup instructions in README (#12)
refactor: split BedGrid component into smaller files (#67)
```

### 7. Push to Your Fork

```bash
# Push to your fork
git push origin feature/issue-23-add-bed-grid
```

### 8. Create Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. **Fill out the PR template completely**
4. Link the issue: `Closes #23`
5. Add screenshots if UI changes
6. Click "Create pull request"

### 9. PR Review Process

**What happens next:**

1. **Automated checks run** (file size, tests, etc.)
2. **Maintainer reviews** within 48 hours
3. **Feedback provided** if changes needed
4. **You address feedback** and push updates
5. **Re-review** after updates
6. **Approval** when ready
7. **Merge** by maintainer

**Your responsibilities:**

- Respond to feedback promptly
- Make requested changes
- Ask questions if unclear
- Be patient and respectful

### 10. After Merge

```bash
# Switch to main
git checkout main

# Pull latest (includes your changes!)
git pull upstream main

# Delete your feature branch
git branch -d feature/issue-23-add-bed-grid

# Push updated main to your fork
git push origin main
```

## One Issue = One PR Rule

### ✅ Correct

- Issue #23: Add bed grid
- PR #24: Adds bed grid (closes #23)

### ❌ Incorrect

- Issue #23: Add bed grid
- Issue #24: Add color coding
- PR #25: Adds bed grid AND color coding (closes #23, #24)

**Why?** 
- Easier to review
- Easier to revert if needed
- Clearer git history
- Better collaboration

## File Size Rule

### The 200-Line Limit

**Every file must be ≤ 200 lines**

### How to Split Large Files

**Before (250 lines):**
```
components/BedGrid.tsx (250 lines)
```

**After:**
```
components/BedGrid/
  ├── index.tsx (50 lines)
  ├── BedCard.tsx (80 lines)
  ├── BedStatus.tsx (60 lines)
  └── types.ts (30 lines)
```

### Exceptions

These files are exempt:
- `package-lock.json`
- `*.md` (documentation)
- `*.json` (config files)
- Lock files
- Generated files

## Commit Message Best Practices

### Good Commits

✅ **Descriptive:**
```
feat: add real-time bed status updates (#23)
```

✅ **Specific:**
```
fix: prevent timer reset on page refresh (#45)
```

✅ **With context:**
```
refactor: split BedGrid into smaller components

- Extracted BedCard component
- Created separate types file
- Improved readability
```

### Bad Commits

❌ **Vague:**
```
update
fix bug
changes
```

❌ **Too long:**
```
feat: add bed grid and color coding and timer and status updates and...
```

## Communication Guidelines

### Where to Communicate

| Topic | Platform |
|-------|----------|
| Bug reports | GitHub Issues |
| Feature requests | GitHub Issues |
| Task discussions | Issue comments |
| Code review | PR comments |
| General questions | GitHub Discussions |
| Security issues | Email maintainers |

### Response Times

- **Issues**: Acknowledged within 48 hours
- **PRs**: Reviewed within 48 hours
- **Comments**: Responded within 72 hours

## Roles and Responsibilities

### Contributor

**Can:**
- Fork repository
- Create branches
- Submit PRs
- Comment on issues

**Cannot:**
- Push to main
- Merge PRs
- Close issues (except their own)
- Assign labels

### Reviewer

**Can:**
- Everything contributors can
- Review PRs
- Request changes
- Approve PRs

**Cannot:**
- Merge PRs
- Manage repository settings

### Maintainer

**Can:**
- Everything reviewers can
- Merge PRs
- Close/reopen issues
- Assign issues
- Manage labels
- Create releases

**Responsibilities:**
- Review PRs within 48 hours
- Provide constructive feedback
- Ensure code quality
- Maintain project direction
- Support contributors

## Emergency Procedures

### Hotfix Process

For critical production bugs:

1. Create `hotfix/issue-XX-description` branch
2. Make **minimal** changes
3. Test thoroughly
4. Create PR with `priority: high` label
5. Request expedited review
6. Merge after 1 approval
7. Document in post-mortem

**Still requires PR and approval!**

## Quality Checklist

Before submitting PR:

- [ ] Code follows style guide
- [ ] No file exceeds 200 lines
- [ ] All functions are small and focused
- [ ] Complex logic is commented
- [ ] No console.log or debug code
- [ ] Tested locally
- [ ] No breaking changes
- [ ] PR template filled out
- [ ] Issue linked
- [ ] Screenshots added (if UI)

## Common Mistakes to Avoid

1. ❌ Working on unassigned issues
2. ❌ Pushing directly to main
3. ❌ Creating PRs without linked issues
4. ❌ Submitting files over 200 lines
5. ❌ Ignoring review feedback
6. ❌ Including unrelated changes
7. ❌ Poor commit messages
8. ❌ Not testing locally

## Resources

- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/)
- [CONTRIBUTING.md](../CONTRIBUTING.md)

---

**Questions?** Ask in [GitHub Discussions](../../discussions)
