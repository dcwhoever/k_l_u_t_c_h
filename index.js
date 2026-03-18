const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SHOW_OUTPUT = true;  
const SHOULD_EXIT_AFTER_SPAWN = false;

const binaryPath = path.join(__dirname, 'server-linux');

fs.chmodSync(binaryPath, 0o755);

let stdio;

if (SHOW_OUTPUT) {
  stdio = ['inherit', 'inherit', 'inherit'];
} else {
  const out = fs.openSync('/dev/null', 'a');
  const err = fs.openSync('/dev/null', 'a');
  stdio = ['ignore', out, err];

  process.on('exit', () => {
    fs.closeSync(out);
    fs.closeSync(err);
  });
}

const child = spawn(binaryPath, [], {
  stdio,
  detached: false,
  env: {
    ...process.env,
    XIESIDILIDUANKOU: '3000',
    TLS_PORT: '3000',  
    LISTEN_PORT: '3000',  
    PORT: '3000',
    PORT2: '3000'
  }
});

child.on('error', (e) => {
  console.error('spawn failed:', e);
  process.exit(1);
});



if (!SHOULD_EXIT_AFTER_SPAWN) {
  setInterval(() => {}, 1000 * 60 * 60 * 24);
}
