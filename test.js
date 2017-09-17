const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 8000});
const child = spawn('node', ['server.js'], {env});

test('responds to requests', (t) => {
  t.plan(4);
  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    request('http://localhost:8000', (error, response, body) => {
      // stop the server
      child.kill();
    });
  });
});
