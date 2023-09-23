import http from 'http';
const options = {
  host: 'localhost',
  port: 80,
  timeout: 2000
};

const healthCheck = http.request(options, (res) => {
  console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
  if (res.statusCode == 200) {
    process.exit(0);
  }
  else {
    process.exit(1);
  }
});

healthCheck.on('error', () => {
  process.exit(1);
});

healthCheck.end();