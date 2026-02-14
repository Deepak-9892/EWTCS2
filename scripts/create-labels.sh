#!/bin/bash

# GitHub Labels Creation Script
# This script creates all necessary labels for the EWTCS project
# Usage: ./create-labels.sh OWNER REPO

OWNER=$1
REPO=$2

if [ -z "$OWNER" ] || [ -z "$REPO" ]; then
  echo "Usage: ./create-labels.sh OWNER REPO"
  echo "Example: ./create-labels.sh myorg EWTCS"
  exit 1
fi

echo "Creating labels for $OWNER/$REPO..."

# Priority Labels
gh label create "priority: high" --color "d73a4a" --description "High priority issue" --repo "$OWNER/$REPO" --force
gh label create "priority: medium" --color "fbca04" --description "Medium priority issue" --repo "$OWNER/$REPO" --force
gh label create "priority: low" --color "0e8a16" --description "Low priority issue" --repo "$OWNER/$REPO" --force

# Type Labels
gh label create "frontend" --color "1d76db" --description "Frontend related" --repo "$OWNER/$REPO" --force
gh label create "backend" --color "5319e7" --description "Backend related" --repo "$OWNER/$REPO" --force
gh label create "bug" --color "d73a4a" --description "Something isn't working" --repo "$OWNER/$REPO" --force
gh label create "enhancement" --color "a2eeef" --description "New feature or request" --repo "$OWNER/$REPO" --force
gh label create "documentation" --color "0075ca" --description "Improvements or additions to documentation" --repo "$OWNER/$REPO" --force

# Status Labels
gh label create "ready" --color "0e8a16" --description "Ready to be worked on" --repo "$OWNER/$REPO" --force
gh label create "in progress" --color "fbca04" --description "Currently being worked on" --repo "$OWNER/$REPO" --force
gh label create "review needed" --color "d876e3" --description "Needs review" --repo "$OWNER/$REPO" --force
gh label create "blocked" --color "d73a4a" --description "Blocked by dependencies" --repo "$OWNER/$REPO" --force

# Helper Labels
gh label create "good first issue" --color "7057ff" --description "Good for newcomers" --repo "$OWNER/$REPO" --force
gh label create "help wanted" --color "008672" --description "Extra attention is needed" --repo "$OWNER/$REPO" --force

echo "✅ All labels created successfully!"
