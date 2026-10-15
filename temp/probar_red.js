const { execFile } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const urls = [
  ['CJ zzounds', 'https://www.anrdoezrs.net/click-101857888-10439229?url=https%3A%2F%2Fwww.zzounds.com%2Fitem--PRSERISSTUDIO5'],
  ['Awin G4M', 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FPreSonus-Eris-Studio-5%2F5S8A']
];
(async () => {
  for (const [n, u] of urls) {
    await new Promise(res => {
      execFile('curl.exe', ['-s', '-L', '--max-time', '40', '-A', UA, '-o', 'NUL',
        '-w', 'http=%{http_code} final=%{url_effective} ip=%{remote_ip}', u],
        { windowsHide: true }, (e, out, err) => {
          console.log(n + ': ' + (out || '').trim() + (e ? '   ERR: ' + e.message.split('\n')[0] : ''));
          res();
        });
    });
  }
})();
