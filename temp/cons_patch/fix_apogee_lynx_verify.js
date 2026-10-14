var fs=require('fs');
var bg=fs.readFileSync('build-guides.js','utf8');
// Apogee 514: keep only verified Andertons + Amazon, remove unverified Gear4Music/MusicStore prices
bg=bg.replace('  514: {prices:{amazon:"$5,995.00",zzounds:"$5,995.00",gear4music:"£5,015.00",andertons:"£5,015.00",musicstore:"€5,999.00"},urls:{amazon:"https://www.amazon.com/dp/B07QBQCJ8T",andertons:"https://www.andertons.co.uk/apogee-symphony-i-o-mkii-thunderbolt-chassis-with-16x16-module/",gear4music:"https://www.gear4music.com/search?q=Apogee%20Symphony%20I%2FO%20Mk%20II%2016x16"},oos:[]},','  514: {prices:{amazon:"$5,995.00",andertons:"£5,015.00"},urls:{amazon:"https://www.amazon.com/dp/B07QBQCJ8T",andertons:"https://www.andertons.co.uk/apogee-symphony-i-o-mkii-thunderbolt-chassis-with-16x16-module/"},oos:[]},');
// Lynx 516: keep only Amazon verified
bg=bg.replace('  516: {prices:{amazon:"$4,050.00",zzounds:"$4,050.00",gear4music:"£3,849.00",andertons:"£3,849.00",musicstore:"€4,199.00"},urls:{amazon:"https://www.amazon.com/dp/B08YDL9Y3M",gear4music:"https://www.gear4music.com/search?q=Lynx%20Aurora-n%2016%20USB",andertons:"https://www.andertons.co.uk/search?search_query=Lynx%20Aurora-n%2016"},oos:[]},','  516: {prices:{amazon:"$4,050.00"},urls:{amazon:"https://www.amazon.com/dp/B08YDL9Y3M"},oos:[]},');
fs.writeFileSync('build-guides.js', bg);
console.log('fixed 514 516 to verified only');
