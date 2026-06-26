export default {
  cli: {
    unknownCommand: "\n Unknown command: ",
    usage: "\nUsage: litespec <command>",
    helpTitle: "\n LiteSpec CLI - Spec-Driven Development Tool",
    initDesc: "  init [--legacy] [--lang zh]  Initialize project and sync IDEs",
    linkDesc: "  link                     Sync context to all supported AI tools",
    specifyDesc: "  specify [name]           Generate requirement spec template",
    planDesc: "  plan [name]              Generate architecture plan template",
    validateDesc: "  validate [name]          Generate validation checklist template",
    reverseDesc: "  reverse [name]           Generate reverse-engineering template",
    aiWorkflow: (cmd: string) => `\n⚠️  '${cmd}' is an AI-driven workflow.`,
    aiWorkflowHint: "   Please open your AI IDE and use the /litespec- command.",
  },
  init: {
    start: "\n🚀 Initializing LiteSpec v2.0...",
    legacyMode: "⚠️  Legacy Mode Enabled: Enforcing Delta Specs & Reverse Engineering.",
    createdAgents: "✅ Created AGENTS.md",
    createdDocs: "✅ Created docs/ directory",
    createdTemplates: (count: number) => `✅ Created ${count} initial templates`,
    agentsContent: `# Project Constitution (Single Source of Truth)

## Core Philosophy
- **SDD First**: All code must be driven by a specification.
- **No Implicit Rules**: Everything must be documented.

## Workflow
1. Run \`/litespec-specify\` to define requirements.
2. Run \`/litespec-plan\` to architect the solution.
3. Handoff to Superpowers for TDD execution.
`,
    agentsLegacyContent: `# Project Constitution (Single Source of Truth)

## Core Philosophy
- **SDD First**: All code must be driven by a specification.
- **No Implicit Rules**: Everything must be documented.
- **Legacy Safe**: Always use ADDED/MODIFIED/REMOVED tags for impact analysis.
- **Break Mechanism**: Every refactor plan MUST include a deprecation strategy.

## Workflow
1. Run \`/litespec-specify\` to define requirements.
2. Run \`/litespec-plan\` to architect the solution.
3. Handoff to Superpowers for TDD execution.
`,
    specifyTemplate: `# Feature Specification

## User Story
<!-- As a [user], I want to [action] so that [benefit] -->

## Acceptance Criteria (DoD)
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Constraints
- 
`,
    specifyLegacyTemplate: `# Feature Specification (Legacy)

## User Story
<!-- As a [user], I want to [action] so that [benefit] -->

## Impact Analysis
- **ADDED**: 
- **MODIFIED**: 
- **REMOVED**: 

## Acceptance Criteria (DoD)
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Constraints
- 
`,
    planTemplate: `# Architecture Plan

## Related Spec
<!-- Link to the specification document -->

## Technical Approach
- 

## Break Mechanism (Legacy Only)
<!-- How to safely deprecate or isolate old code -->
- 
`,
    planLegacyTemplate: `# Architecture Plan (Legacy)

## Related Spec
<!-- Link to the specification document -->

## Technical Approach
- 

## Break Mechanism
<!-- MUST define how to safely deprecate or isolate old code -->
- **Phase 1 (Compat)**: 
- **Phase 2 (Deprecate)**: 
- **Phase 3 (Remove)**: 
`,
    validateTemplate: `# Validation Checklist

## Spec Validation
- [ ] DoD keywords are present
- [ ] Format is correct

## Plan Validation
- [ ] Break mechanism is defined (if legacy)
- [ ] Architecture aligns with constitution
`,
    reverseTemplate: `# Reverse Engineering (Current State)

## Module Overview
- 

## Hidden Rules & Implicit Constraints
- 

## Refactor Risks
- 
`,
    reverseLegacyTemplate: `# Reverse Engineering (Current State - Legacy)

## Module Overview
- 

## Hidden Rules & Implicit Constraints
- 

## Refactor Risks
- 

## Impact Assessment
- **ADDED**: 
- **MODIFIED**: 
- **REMOVED**: 
`,
  },
  link: {
    start: "\n🔗 Syncing LiteSpec Context to AI IDEs & Agents...",
    skipped: "\n⚠️  All IDE/Agent configurations already exist. Skipping to prevent overwrites.",
    success: (count: number) => `\n🎉 Successfully synced ${count} configurations!`,
    successHint1: "   ✅ All tools are now pointing to the same AGENTS.md (Single Source of Truth).",
    successHint2: "   🚀 Available Slash Commands: /litespec-init, specify, plan, validate, reverse",
  },
  workflows: {
    fileExists: "File already exists, skipping to prevent overwrites:",
    created: "Created workflow template:",
    nextStep: "Next step: Open your AI IDE and run the corresponding /litespec-* command.",
    specifyTemplate: `# Feature Specification

## User Story
<!-- As a [user], I want to [action] so that [benefit] -->

## Acceptance Criteria (DoD)
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Constraints
- 
`,
    planTemplate: `# Architecture Plan

## Related Spec
<!-- Link to the specification document -->

## Technical Approach
- 

## Break Mechanism (Legacy Only)
<!-- How to safely deprecate or isolate old code -->
- 
`,
    validateTemplate: `# Validation Checklist

## Spec Validation
- [ ] DoD keywords are present
- [ ] Format is correct

## Plan Validation
- [ ] Break mechanism is defined (if legacy)
- [ ] Architecture aligns with constitution
`,
    reverseTemplate: `# Reverse Engineering (Current State)

## Module Overview
- 

## Hidden Rules & Implicit Constraints
- 

## Refactor Risks
- 
`,
  }
};
