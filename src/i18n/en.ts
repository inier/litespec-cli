export default {
  cli: {
    unknownCommand: "\n❌ Unknown command: ",
    usage: "\nUsage: bun run litespec <command>",
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
    agentsContent: `# Project Constitution (Single Source of Truth)\n\n## Core Philosophy\n- **SDD First**: All code must be driven by a specification.\n- **No Implicit Rules**: Everything must be documented.\n\n## Workflow\n1. Run \`/litespec-specify\` to define requirements.\n2. Run \`/litespec-plan\` to architect the solution.\n3. Handoff to Superpowers for TDD execution.\n`,
    agentsLegacyContent: `# Project Constitution (Single Source of Truth)\n\n## Core Philosophy\n- **SDD First**: All code must be driven by a specification.\n- **No Implicit Rules**: Everything must be documented.\n- **Legacy Safe**: Always use ADDED/MODIFIED/REMOVED tags for impact analysis.\n- **Break Mechanism**: Every refactor plan MUST include a deprecation strategy.\n\n## Workflow\n1. Run \`/litespec-specify\` to define requirements.\n2. Run \`/litespec-plan\` to architect the solution.\n3. Handoff to Superpowers for TDD execution.\n`,
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
    specifyTemplate: `# Feature Specification\n\n## User Story\n<!-- As a [user], I want to [action] so that [benefit] -->\n\n## Acceptance Criteria (DoD)\n- [ ] Criterion 1\n- [ ] Criterion 2\n\n## Technical Constraints\n- \n`,
    planTemplate: `# Architecture Plan\n\n## Related Spec\n<!-- Link to the specification document -->\n\n## Technical Approach\n- \n\n## Break Mechanism (Legacy Only)\n<!-- How to safely deprecate or isolate old code -->\n- \n`,
    validateTemplate: `# Validation Checklist\n\n## Spec Validation\n- [ ] DoD keywords are present\n- [ ] Format is correct\n\n## Plan Validation\n- [ ] Break mechanism is defined (if legacy)\n- [ ] Architecture aligns with constitution\n`,
    reverseTemplate: `# Reverse Engineering (Current State)\n\n## Module Overview\n- \n\n## Hidden Rules & Implicit Constraints\n- \n\n## Refactor Risks\n- \n`,
  }
};
