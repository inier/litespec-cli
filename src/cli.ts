import { init } from "./commands/init";
import { link } from "./commands/link";
import { runWorkflow, WorkflowType } from "./commands/workflows";
import { log, colors } from "./utils";
import { i18n } from "./i18n";

const args = process.argv.slice(2);
const command = args.find(a => !a.startsWith("--"));
const lang = args.find(a => a.startsWith("--lang="))?.split("=")[1] || "en";

async function main() {
  await i18n.setLocale(lang);
  const t = i18n.t;

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
      const workflowArgs = args.filter(a => a !== command && !a.startsWith("--lang="));
      await runWorkflow(command as WorkflowType, workflowArgs);
      break;
    default:
      log(colors.red, t.cli.unknownCommand + command);
      log(colors.blue, t.cli.usage);
      log(colors.gray, t.cli.initDesc);
      log(colors.gray, t.cli.linkDesc);
      log(colors.gray, t.cli.specifyDesc);
      log(colors.gray, t.cli.planDesc);
      log(colors.gray, t.cli.validateDesc);
      log(colors.gray, t.cli.reverseDesc);
      break;
  }
}

main();