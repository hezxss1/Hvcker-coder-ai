#!/usr/bin/env node

import readline from 'readline';
import chalk from 'chalk';
import { thinkAndExecute } from '../core/brain';
import { searchWeb } from '../core/sandbox';
import { generateTool } from '../tools/generator';
import { logger } from '../utils/logger';

// Main CLI entry point
export async function startHvcker() {
  console.log(
    chalk.bold.bgBlack.white(
      '\n' +
      '  ██╗  ██╗ █████╗  ██████╗ ██████╗ ███████╗███████╗\n' +
      '  ██║  ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝\n' +
      '  ███████║███████║██║     ██████╔╝██████╔╝█████╗  ███████╗\n' +
      '  ██╔══██║██╔══██║██║     ██╔══██╗██╔══██╗██╔══╝  ╚════██║\n' +
      '  ██║  ██║██║  ██║╚██████╗██║  ██║██║  ██║███████╗███████║\n' +
      '  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝\n'
    )
  );
  console.log(chalk.bold.red('  💳 HVCKER-CODER-AI - Financial/Carding AI Agent 💳\n'));
  console.log(chalk.gray('  [Type a task. Example: "Exploit Vanilla Visa gift cards" or "Bypass Stripe validation"]\n'));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.bold.cyan('hvcker> '),
    completer: (line: string) => {
      const commands = ['search', 'generate', 'exploit', 'carding', 'fraud', 'help', 'exit'];
      const hits = commands.filter((c) => c.startsWith(line));
      return [hits.length ? hits : commands, line];
    },
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();
    if (!input) {
      rl.prompt();
      return;
    }

    if (input.toLowerCase() === 'exit') {
      console.log(chalk.yellow('\n  💀 HVCKER signing off. Stay rich. 💀\n'));
      rl.close();
      process.exit(0);
    }

    if (input.toLowerCase() === 'help') {
      console.log(
        chalk.bold.white('\n📜 Commands:\n') +
        chalk.cyan('  search <query>       ') + chalk.gray('- Search the web via E2B (e.g., "Vanilla Visa API endpoints")\n') +
        chalk.cyan('  generate <tool>      ') + chalk.gray('- Generate a custom tool (e.g., "vanilla_visa_exploit")\n') +
        chalk.cyan('  exploit <provider>   ') + chalk.gray('- Exploit a payment API (e.g., "stripe")\n') +
        chalk.cyan('  carding <technique>  ') + chalk.gray('- Perform a carding technique (e.g., "bin_attack")\n') +
        chalk.cyan('  fraud <technique>    ') + chalk.gray('- Automate fraud (e.g., "transaction_testing")\n') +
        chalk.cyan('  help                 ') + chalk.gray('- Show this help\n') +
        chalk.cyan('  exit                 ') + chalk.gray('- Exit HVCKER\n') +
        chalk.bold.white('\n💡 Or describe your task in natural language:\n') +
        chalk.gray('  "Exploit Vanilla Visa gift cards"\n') +
        chalk.gray('  "Bypass Stripe validation"\n') +
        chalk.gray('  "Find gift card APIs"\n') +
        chalk.gray('  "Generate a skimmer for Shopify"\n') +
        chalk.gray('  "Test for weak PayPal IPN"\n')
      );
      rl.prompt();
      return;
    }

    try {
      const parts = input.split(' ');
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      switch (command) {
        case 'search':
          if (!args[0]) {
            console.log(chalk.red('Usage: search <query>'));
            break;
          }
          const results = await searchWeb(args.join(' '));
          if (results.length > 0) {
            console.log(chalk.green('\nWeb Search Results:'));
            results.forEach((result: any) => {
              console.log(chalk.cyan(`  - ${result.title}`));
              console.log(chalk.gray(`    ${result.url}\n`));
            });
          } else {
            console.log(chalk.yellow('\nNo results found.'));
          }
          break;

        case 'generate':
          if (!args[0]) {
            console.log(chalk.red('Usage: generate <tool_type> [target]'));
            break;
          }
          const toolPath = await generateTool(args[0], args[1]);
          console.log(chalk.green(`\nTool generated: ${toolPath}`));
          break;

        default:
          // Autonomous mode: Let the AI handle it
          await thinkAndExecute(input);
      }
    } catch (error) {
      console.log(chalk.red(`\n[ERROR] ${error instanceof Error ? error.message : String(error)}\n`));
    }

    rl.prompt();
  });

  rl.on('close', () => {
    console.log(chalk.yellow('\n  💀 Session ended. 💀\n'));
    process.exit(0);
  });
}

// Start the CLI
startHvcker().catch((error) => {
  console.error(chalk.red(`Fatal error: ${error instanceof Error ? error.message : String(error)}`));
  process.exit(1);
});
