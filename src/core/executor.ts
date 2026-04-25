import { generateTool } from '../tools/generator';
import { runInSandbox } from './sandbox';
import { logger } from '../utils/logger';
import chalk from 'chalk';

export async function executeTask(action: string, options: any = {}): Promise<void> {
  switch (action) {
    case 'generate_tool':
      const toolPath = await generateTool(options.type, options.target);
      logger.info(chalk.green(`[HVCKER] Tool generated: ${toolPath}`));
      
      // If sandbox is enabled, offer to run it
      if (options.sandbox) {
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        
        const answer = await new Promise<string>((resolve) => {
          rl.question(chalk.cyan('\nRun this tool in sandbox? (y/N): '), (ans: string) => {
            rl.close();
            resolve(ans.toLowerCase());
          });
        });
        
        if (answer === 'y' || answer === 'yes') {
          const fs = require('fs');
          const code = fs.readFileSync(toolPath, 'utf-8');
          const result = await runInSandbox(code);
          logger.info(chalk.green(`\nSandbox Output:\n${result.stdout}`));
          if (result.stderr) {
            logger.error(chalk.red(`\nErrors:\n${result.stderr}`));
          }
        }
      }
      break;

    case 'execute':
      if (options.sandbox) {
        // For now, just log that we'd run in sandbox
        logger.info(chalk.blue('[HVCKER] Would execute in sandbox (implement specific execution logic as needed)'));
      }
      break;

    case 'exploit':
      logger.info(chalk.blue(`[HVCKER] Executing exploit for vector: ${options.vector}`));
      // In a real implementation, this would trigger specific exploit logic
      break;

    default:
      logger.warn(chalk.yellow(`[HVCKER] Unknown action: ${action}`));
  }
}
