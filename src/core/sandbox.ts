import { Sandbox } from 'e2b';
import { logger } from '../utils/logger';
import chalk from 'chalk';

let sandbox: Sandbox | null = null;

export async function initializeSandbox(): Promise<Sandbox> {
  if (sandbox) return sandbox;
  if (!process.env.E2B_API_KEY) {
    logger.warn(chalk.yellow('[HVCKER] E2B not configured. Sandbox and web browsing disabled.'));
    return null as any;
  }

  logger.info(chalk.blue('[HVCKER] Initializing E2B sandbox + web browsing...'));
  sandbox = await Sandbox.create('hvcker-sandbox', {
    apiKey: process.env.E2B_API_KEY,
    cpuCount: 2,
    memoryMB: 2048,
  });
  logger.info(chalk.green('[HVCKER] Sandbox + Web Browsing ready.'));
  return sandbox;
}

// Execute code in sandbox
export async function runInSandbox(code: string): Promise<{ stdout: string; stderr: string }> {
  if (!sandbox) await initializeSandbox();
  if (!sandbox) throw new Error('Sandbox not available.');

  logger.info(chalk.blue('[HVCKER] Executing in sandbox...'));
  const result = await sandbox.execute(code, { timeout: 60000 });
  return { stdout: result.stdout || '', stderr: result.stderr || '' };
}

// Web search via E2B
export async function searchWeb(query: string): Promise<any[]> {
  if (!sandbox) await initializeSandbox();
  if (!sandbox) {
    logger.error(chalk.red('[HVCKER] Web search unavailable. E2B not configured.'));
    return [];
  }

  logger.info(chalk.blue(`[HVCKER] Searching web for: "${query}"...`));

  try {
    // Use E2B's web search capability
    const results = await sandbox.searchWeb(query, { maxResults: 5 });
    return results;
  } catch (error) {
    logger.error(chalk.red(`[HVCKER] Web search failed: ${error instanceof Error ? error.message : String(error)}`));
    return [];
  }
}
