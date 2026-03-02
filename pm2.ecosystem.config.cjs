module.exports = {
  apps: [
    {
      name: 'si-ai-gen',
      cwd: '/Users/jackychan/.openclaw/workspace-work/Simpleinfo',
      script: 'npm',
      args: 'run ai:bot:loop -- --interval 15000 --fallback-template',
      autorestart: true,
      max_restarts: 20,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'si-ai-opt',
      cwd: '/Users/jackychan/.openclaw/workspace-work/Simpleinfo',
      script: 'npm',
      args: 'run ai:bot:optimize:loop -- --interval 15000',
      autorestart: true,
      max_restarts: 20,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
