# Project Governance

This document defines the governance structure, roles, and decision-making processes for the EWTCS project.

## Project Structure

```
┌─────────────────────────────────────┐
│          Maintainer (1)             │
│  - Final decisions                  │
│  - Repository management            │
│  - Release management               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         Reviewers (2-3)             │
│  - Code review                      │
│  - PR approval                      │
│  - Quality assurance                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       Contributors (8+)             │
│  - Submit PRs                       │
│  - Fix bugs                         │
│  - Add features                     │
│  - Improve docs                     │
└─────────────────────────────────────┘
```

## Roles and Responsibilities

### Maintainer

**Count**: 1 (can expand to 2-3 as project grows)

**Responsibilities:**
- Set project vision and direction
- Review and merge pull requests
- Manage releases and versioning
- Triage and prioritize issues
- Assign issues to contributors
- Manage repository settings
- Enforce code of conduct
- Make final decisions on disputes
- Mentor reviewers and contributors
- Ensure project health and sustainability

**Permissions:**
- Admin access to repository
- Merge pull requests
- Manage issues and labels
- Create releases
- Modify repository settings

**Time Commitment**: 5-10 hours/week

**How to Become a Maintainer:**
- Demonstrated long-term commitment (6+ months)
- Significant contributions to codebase
- Active in code reviews
- Community trust and respect
- Appointed by current maintainer(s)

### Reviewer

**Count**: 2-3

**Responsibilities:**
- Review pull requests thoroughly
- Provide constructive feedback
- Approve or request changes
- Ensure code quality standards
- Help contributors improve
- Test changes locally when needed
- Participate in technical discussions

**Permissions:**
- Write access to repository
- Approve pull requests
- Label issues and PRs
- Request changes on PRs

**Time Commitment**: 3-5 hours/week

**How to Become a Reviewer:**
- Active contributor for 3+ months
- 10+ merged pull requests
- Demonstrated code quality
- Helpful in issue discussions
- Nominated by maintainer

### Contributor

**Count**: Unlimited (target: 8+ active)

**Responsibilities:**
- Submit quality pull requests
- Follow contribution guidelines
- Respond to review feedback
- Test changes locally
- Help other contributors
- Report bugs
- Suggest improvements

**Permissions:**
- Fork repository
- Create pull requests
- Comment on issues and PRs
- Participate in discussions

**Time Commitment**: Flexible (as available)

**How to Become a Contributor:**
- Submit your first pull request!
- No formal process required
- All contributors welcome

## Decision-Making Process

### Code Changes

**Process:**
1. Contributor submits PR
2. Automated checks run
3. Reviewer(s) review code
4. Feedback provided if needed
5. Contributor addresses feedback
6. Reviewer approves
7. Maintainer merges

**Approval Requirements:**
- 1 reviewer approval minimum
- All automated checks passing
- No unresolved conversations
- Maintainer final merge decision

### Feature Proposals

**For small features:**
1. Create GitHub issue
2. Describe feature and rationale
3. Wait for maintainer feedback
4. If approved, implement and submit PR

**For large features:**
1. Create GitHub Discussion
2. Gather community feedback
3. Maintainer reviews and decides
4. If approved, create implementation issues
5. Break into smaller PRs

### Breaking Changes

**Process:**
1. Discuss in GitHub Discussions
2. Gather community input
3. Maintainer makes final decision
4. Plan migration path
5. Document thoroughly
6. Announce in advance

**Requirements:**
- Strong justification
- Migration guide
- Deprecation period (if possible)
- Community consensus

### Disputes

**Resolution process:**
1. Discuss respectfully in relevant thread
2. Seek reviewer input
3. Escalate to maintainer if needed
4. Maintainer makes final decision
5. Decision is documented

**Principles:**
- Assume good intentions
- Focus on project goals
- Be respectful and professional
- Maintainer has final say

## Communication Channels

### GitHub Issues
- **Purpose**: Bug reports, feature requests, tasks
- **Response Time**: 48 hours
- **Who Monitors**: Maintainer, reviewers

### GitHub Pull Requests
- **Purpose**: Code review, implementation discussion
- **Response Time**: 48 hours for initial review
- **Who Monitors**: Reviewers, maintainer

### GitHub Discussions
- **Purpose**: General questions, ideas, community chat
- **Response Time**: 72 hours
- **Who Monitors**: All community members

### Email
- **Purpose**: Security issues, code of conduct violations
- **Address**: [maintainer@example.com](mailto:maintainer@example.com)
- **Response Time**: 24-48 hours
- **Who Monitors**: Maintainer only

## Issue Triage Process

### Maintainer Responsibilities

**Daily:**
- Review new issues
- Add appropriate labels
- Assign priority
- Request clarification if needed
- Close duplicates or invalid issues

**Weekly:**
- Review open issues
- Update priorities
- Assign to contributors
- Close stale issues

### Issue Labels

**Priority:**
- `priority: high` - Critical bugs, urgent features
- `priority: medium` - Important but not urgent
- `priority: low` - Nice to have

**Status:**
- `ready` - Ready to be worked on
- `in progress` - Someone is working on it
- `review needed` - PR submitted, needs review
- `blocked` - Waiting on dependencies

**Type:**
- `bug` - Something broken
- `enhancement` - New feature
- `documentation` - Docs improvement
- `good first issue` - Beginner-friendly
- `help wanted` - Need assistance

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

### Release Cycle

- **Patch releases**: As needed for bug fixes
- **Minor releases**: Every 2-4 weeks
- **Major releases**: As needed for breaking changes

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] Git tag created
- [ ] Release notes written
- [ ] Deployed to production (if applicable)
- [ ] Announced to community

### Who Can Release

- **Maintainer only** creates official releases
- Reviewers can prepare release PRs
- Contributors can suggest releases

## Code of Conduct Enforcement

### Maintainer Responsibilities

- Monitor community interactions
- Respond to reports within 24 hours
- Investigate violations fairly
- Take appropriate action
- Document decisions
- Protect reporter privacy

### Enforcement Actions

**Warning:**
- First minor violation
- Private communication
- Explanation of violation

**Temporary Ban:**
- Repeated violations
- Serious single violation
- 7-30 day ban from participation

**Permanent Ban:**
- Severe violations
- Pattern of bad behavior
- Permanent removal from community

### Appeal Process

1. Email maintainer within 7 days
2. Explain your perspective
3. Maintainer reviews
4. Decision communicated within 7 days
5. Decision is final

## Contributor Recognition

### Hall of Fame

All contributors are recognized in:
- GitHub Contributors page
- Release notes
- Annual summary post

### Special Recognition

- **Top Contributor**: Most merged PRs in a quarter
- **Helpful Reviewer**: Most thorough reviews
- **Bug Hunter**: Most bugs reported/fixed
- **Documentation Hero**: Best docs contributions

### Promotion Path

```
Contributor → Reviewer → Maintainer
    ↓            ↓           ↓
  3 months    6 months   12 months
  10 PRs      Active      Trusted
             reviews     leader
```

## Project Health Metrics

### Tracked Metrics

- Open issues count
- PR merge time (target: <7 days)
- Issue response time (target: <48 hours)
- Active contributors (target: 8+)
- Code coverage (target: >80%)
- Documentation coverage

### Monthly Review

Maintainer reviews:
- Project velocity
- Contributor activity
- Issue backlog
- Code quality trends
- Community health

## Amendments to Governance

### Process

1. Propose change in GitHub Discussion
2. Community feedback period (14 days)
3. Maintainer reviews feedback
4. Decision announced
5. Document updated

### Who Can Propose

- Anyone in the community
- Maintainer has final decision

## Succession Planning

### If Maintainer Becomes Inactive

1. Reviewers attempt to contact (30 days)
2. If no response, senior reviewer takes over
3. Community notified
4. New maintainer appointed

### Criteria for New Maintainer

- Most active reviewer
- Community trust
- Technical competence
- Communication skills
- Long-term commitment

## Resources

- [Code of Conduct](../CODE_OF_CONDUCT.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Workflow Rules](WORKFLOW_RULES.md)

---

**Last Updated**: 2026-02-14  
**Current Maintainer**: [Name/GitHub Handle]  
**Current Reviewers**: [Names/GitHub Handles]
