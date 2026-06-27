# Project Constitution (Single Source of Truth)

## Core Philosophy
- **SDD First**: All code must be driven by a specification.
- **No Implicit Rules**: Everything must be documented.
- **Legacy Safe**: Always use ADDED/MODIFIED/REMOVED tags for impact analysis.
- **Break Mechanism**: Every refactor plan MUST include a deprecation strategy.

## Workflow
1. Run `/litespec-specify` to define requirements.
2. Run `/litespec-plan` to architect the solution.
3. Handoff to Superpowers for TDD execution.
