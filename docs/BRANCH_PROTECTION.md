# Branch Protection Policy

This document outlines the branch protection rules for the EWTCS repository.

## Main Branch Protection

The `main` branch is protected with the following rules:

### Required Settings

#### 1. Require Pull Request Before Merging

- ✅ **Enabled**: All changes must go through a pull request
- ❌ **Direct pushes to main**: Blocked for everyone (including admins)

#### 2. Require Approvals

- **Number of required approvals**: 1
- **Dismiss stale reviews**: Enabled (when new commits are pushed)
- **Require review from code owners**: Optional (if CODEOWNERS file exists)

#### 3. Require Status Checks

- **Require branches to be up to date**: Enabled
- **Required status checks**:
  - `File Size Check` (from GitHub Actions)
  - Any other CI/CD checks you add

#### 4. Require Conversation Resolution

- ✅ **Enabled**: All review comments must be resolved before merging

#### 5. Require Signed Commits

- ⚠️ **Optional**: Can be enabled for additional security

#### 6. Require Linear History

- ✅ **Enabled**: Prevents merge commits, enforces rebase or squash

#### 7. Block Force Pushes

- ✅ **Enabled**: Force pushes are blocked

#### 8. Block Deletions

- ✅ **Enabled**: The main branch cannot be deleted

### Who Can Push

- ❌ **No one** can push directly to main
- ✅ **Only maintainers** can merge approved PRs
- ⚠️ **Admins**: Should not bypass protection rules

## How to Configure (GitHub UI)

1. Go to your repository on GitHub
2. Click **Settings** → **Branches**
3. Under "Branch protection rules", click **Add rule**
4. Enter `main` as the branch name pattern
5. Enable the following:

   ```
   ☑ Require a pull request before merging
     ☑ Require approvals (1)
     ☑ Dismiss stale pull request approvals when new commits are pushed
   
   ☑ Require status checks to pass before merging
     ☑ Require branches to be up to date before merging
     - Add status check: "File Size Check"
   
   ☑ Require conversation resolution before merging
   
   ☑ Require linear history
   
   ☑ Do not allow bypassing the above settings
   
   ☑ Restrict who can push to matching branches
     - Add: Only maintainers (or leave empty to block everyone)
   
   ☑ Block force pushes
   
   ☑ Allow deletions: UNCHECKED
   ```

6. Click **Create** or **Save changes**

## How to Configure (GitHub CLI)

```bash
# Set repository variables
OWNER="your-org"
REPO="EWTCS"

# Enable branch protection
gh api repos/$OWNER/$REPO/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["File Size Check"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":false,"required_approving_review_count":1}' \
  --field restrictions=null \
  --field required_linear_history=true \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field required_conversation_resolution=true
```

## Workflow Impact

### For Contributors

- You **cannot** push directly to `main`
- You **must** create a feature branch
- You **must** open a pull request
- You **must** get 1 approval
- You **must** pass all status checks
- You **must** resolve all review comments

### For Maintainers

- You **can** approve pull requests
- You **can** merge approved PRs
- You **should not** bypass protection rules
- You **must** ensure quality before merging

## Exceptions

### Emergency Hotfixes

In rare emergency situations:

1. Create a `hotfix/` branch
2. Make minimal changes
3. Get expedited review
4. Merge with 1 approval
5. Document in post-mortem

**Do NOT bypass branch protection even for emergencies.**

## Verification

To verify branch protection is active:

```bash
gh api repos/$OWNER/$REPO/branches/main/protection
```

Or check in GitHub UI:
- Go to **Settings** → **Branches**
- Look for a green checkmark next to `main`

## Troubleshooting

### "Push declined due to branch protection"

✅ **This is correct behavior!** Create a PR instead.

### "Required status check is missing"

- Ensure GitHub Actions workflow is running
- Check that workflow name matches required check

### "Need 1 approval but have 0"

- Request review from a maintainer
- Wait for approval before merging

## Additional Resources

- [GitHub Branch Protection Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [Workflow Rules](WORKFLOW_RULES.md)

---

**Last Updated**: 2026-02-14  
**Maintained By**: EWTCS Maintainers
