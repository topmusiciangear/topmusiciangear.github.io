var fs=require('fs');
var h=fs.readFileSync('guides/streaming-interfaces.html','utf8');
console.log('Vocaster:',h.indexOf('Focusrite Vocaster One')>-1?'FOUND':'NOT FOUND');
console.log('Sections:',(h.match(/Is the Focusrite Vocaster One/g)||[]).length);
console.log('Table column:',h.indexOf('Focusrite Vocaster One')>-1?'FOUND (in table)':'NOT FOUND');
console.log('Verdict:',h.indexOf('Focusrite Vocaster One</div>')>-1?'FOUND':'NOT FOUND');
console.log('Photo:',h.indexOf('511329-Vocaster-One')>-1?'FOUND':'NOT FOUND');