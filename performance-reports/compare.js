const fs = require('fs');

console.log('=== PERFORMANCE IMPROVEMENTS ===\n');
console.log('Page       | Before | After | Improvement | Before LCP | After LCP | Improvement');
console.log('-----------|--------|-------|-------------|------------|-----------|------------');

const pages = [
  { name: 'home', before: 'home-prod.json', after: 'home-optimized.json' },
  { name: 'projects', before: 'projects-prod.json', after: 'projects-optimized.json' }
];

pages.forEach(page => {
  const beforeFile = './performance-reports/' + page.before;
  const afterFile = './performance-reports/' + page.after;

  if (!fs.existsSync(beforeFile) || !fs.existsSync(afterFile)) {
    console.log(page.name.padEnd(11) + '| Missing data');
    return;
  }

  const before = JSON.parse(fs.readFileSync(beforeFile, 'utf8'));
  const after = JSON.parse(fs.readFileSync(afterFile, 'utf8'));

  const beforeScore = Math.round(before.categories.performance.score * 100);
  const afterScore = Math.round(after.categories.performance.score * 100);
  const scoreDiff = afterScore - beforeScore;

  const beforeLcp = before.audits['largest-contentful-paint'].displayValue;
  const afterLcp = after.audits['largest-contentful-paint'].displayValue;
  const beforeLcpMs = before.audits['largest-contentful-paint'].numericValue;
  const afterLcpMs = after.audits['largest-contentful-paint'].numericValue;
  const lcpImprovement = Math.round(((beforeLcpMs - afterLcpMs) / beforeLcpMs) * 100);

  console.log(
    page.name.padEnd(11) + '| ' +
    (beforeScore + '/100').padEnd(7) + '| ' +
    (afterScore + '/100').padEnd(6) + '| ' +
    (scoreDiff > 0 ? '+' : '') + scoreDiff + ' pts'.padEnd(12) + '| ' +
    beforeLcp.padEnd(11) + '| ' +
    afterLcp.padEnd(10) + '| ' +
    (lcpImprovement > 0 ? '+' : '') + lcpImprovement + '%'
  );
});

console.log('\n=== OPTIMIZED METRICS ===\n');

pages.forEach(page => {
  const file = './performance-reports/' + page.after;
  if (!fs.existsSync(file)) return;

  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const score = Math.round(data.categories.performance.score * 100);

  console.log(page.name.toUpperCase() + ' PAGE: ' + score + '/100');

  const fcp = data.audits['first-contentful-paint'];
  const lcp = data.audits['largest-contentful-paint'];
  const tbt = data.audits['total-blocking-time'];
  const cls = data.audits['cumulative-layout-shift'];

  console.log('  FCP: ' + fcp.displayValue + ' (' + Math.round(fcp.score * 100) + '/100)');
  console.log('  LCP: ' + lcp.displayValue + ' (' + Math.round(lcp.score * 100) + '/100)');
  console.log('  TBT: ' + tbt.displayValue + ' (' + Math.round(tbt.score * 100) + '/100)');
  console.log('  CLS: ' + cls.displayValue + ' (' + Math.round(cls.score * 100) + '/100)');
  console.log('');
});
