import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Default configuration
const DEFAULT_CONFIG = {
  ollama: {
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    model: process.env.OLLAMA_MODEL || 'dolphin3-qwen2.5',
  },
  e2b: {
    apiKey: process.env.E2B_API_KEY || '',
    enabled: !!process.env.E2B_API_KEY,
  },
  ai: {
    temperature: parseFloat(process.env.AI_TEMPERATURE || '0.9'),
    maxTokens: parseInt(process.env.AI_MAX_TOKENS || '4096'),
  },
  features: {
    financialTools: process.env.ENABLE_FINANCIAL_TOOLS !== 'false',
    cardingTools: process.env.ENABLE_CARDING_TOOLS !== 'false',
    fraudAutomation: process.env.ENABLE_FRAUD_AUTOMATION !== 'false',
    webSearch: process.env.ENABLE_WEB_SEARCH !== 'false',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: 'logs/app.log',
  },
};

// Configuration class
class Config {
  private config: any;
  private configPath: string;

  constructor() {
    this.config = DEFAULT_CONFIG;
    this.configPath = path.join(process.cwd(), 'config.json');
    this.loadConfig();
  }

  // Load configuration from file
  private loadConfig(): void {
    try {
      if (fs.existsSync(this.configPath)) {
        const fileConfig = JSON.parse(fs.readFileSync(this.configPath, 'utf-8'));
        this.config = this.mergeConfig(DEFAULT_CONFIG, fileConfig);
      }
    } catch (error) {
      console.warn('Failed to load config file, using defaults');
    }
  }

  // Merge configurations
  private mergeConfig(defaultConfig: any, fileConfig: any): any {
    return {
      ...defaultConfig,
      ...fileConfig,
      ollama: { ...defaultConfig.ollama, ...fileConfig.ollama },
      e2b: { ...defaultConfig.e2b, ...fileConfig.e2b },
      ai: { ...defaultConfig.ai, ...fileConfig.ai },
      features: { ...defaultConfig.features, ...fileConfig.features },
      logging: { ...defaultConfig.logging, ...fileConfig.logging },
    };
  }

  // Get configuration
  public get(): any {
    return this.config;
  }

  // Get specific configuration value
  public getValue(key: string): any {
    const keys = key.split('.');
    let current = this.config;
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        return undefined;
      }
    }
    return current;
  }

  // Save configuration to file
  public save(): void {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (error) {
      console.error('Failed to save config file');
    }
  }
}

// Singleton instance
export const config = new Config();
export default config;
