import { init } from "./commands/init";
import { link } from "./commands/link";
import { runWorkflow, WorkflowType } from "./commands/workflows";
import { log, colors } from "./utils";
import { i18n } from "./i18n";

const args = process.argv.slice(2);

// Parse --lang: support both `--lang=zh` and `--lang zh`
function parseLang(): string {
  const eqArg = args.find(a => a.startsWith("--lang="));
  if (eqArg) return eqArg.split("=")[1];
  const idx = args.indexOf("--lang");
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return "en";
}

const lang = parseLang();
// Find command: skip --flag and the value after --lang
function findCommand(): string | undefined {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      // Skip --lang's value if it's a separate arg
      if (arg === "--lang") i++;
      continue;
    }
    return arg;
  }
  return undefined;
}

const command = findCommand();

async function main() {
  await i18n.setLocale(lang);
  const t = i18n.t;

  // 无参数时显示帮助
  if (!command) {
    log(colors.blue, t.cli.helpTitle);
    log(colors.gray, t.cli.usage);
    log(undefined);
    log(colors.gray, t.cli.initDesc);
    log(colors.gray, t.cli.linkDesc);
    log(colors.gray, t.cli.specifyDesc);
    log(colors.gray, t.cli.planDesc);
    log(colors.gray, t.cli.validateDesc);
    log(colors.gray, t.cli.reverseDesc);
    log(undefined);
    log(colors.gray, t.cli.langHint);
    return;
  }

  switch (command) {
    case "init":
      await init(args);
      break;
    case "link":
      await link();
      break;
    case "specify":
    case "plan":
    case "validate":
    case "reverse":
      const workflowArgs = args.filter(a => a !== command && !a.startsWith("--lang") && a !== lang);
      await runWorkflow(command as WorkflowType, workflowArgs);
      break;
    default:
      log(colors.red, t.cli.unknownCommand + command);
      log(colors.gray, t.cli.usage);
      log(undefined);
      log(colors.gray, t.cli.initDesc);
      log(colors.gray, t.cli.linkDesc);
      log(colors.gray, t.cli.specifyDesc);
      log(colors.gray, t.cli.planDesc);
      log(colors.gray, t.cli.validateDesc);
      log(colors.gray, t.cli.reverseDesc);
      break;
  }
}

main().catch((err) => {
  log(colors.red, `Error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});