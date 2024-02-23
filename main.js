const wifi = require('wifi-control')

const keyboardChars = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
  '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', 
  '[', ']', '{', '}', '|', ';', ':', ',', '.', '/', '<', '>', '?', ' '
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateStrings(length, delay, callback) {
  const startTime = new Date().getTime();

  async function generateHelper(prefix, remainingLength) {
    if (remainingLength === 0) {
      callback(prefix);
    } else {
      for (let char of keyboardChars) {
        await sleep(delay);
        await generateHelper(prefix + char, remainingLength - 1);
      }
    }
  }
  await generateHelper('', length);

  const endTime = new Date().getTime();
  const elapsedTime = Math.floor((endTime - startTime) / 1000);
  const formattedTime = generateTime(elapsedTime);
  console.log(`Time spent generating strings: ${formattedTime}`);
}

function generateTime(time) {
  var second = time % 60;
  var minute = Math.floor(time / 60) % 60;
  var hour = Math.floor(time / 3600) % 24;
  var days = Math.floor(time / 86400);

  second = (second < 10) ? '0'+second : second;
  minute = (minute < 10) ? '0'+minute : minute;
  hour = (hour < 10) ? '0'+hour : hour;
  day = (days < 10) ? '0'+ days : days;

  return day + ':' + hour + ':' + minute + ':' + second;
}

const length = 10;
const delay = 0;
generateStrings(length, delay, str => {
  var bodyX = {
    ssid: 'Grundstellung-Enigma',
    password: str
  }

  wifi.connectToAP(bodyX, function(err, response){
    if(err){ console.log('failed to connect to wifi: ', err)}

    console.log('successfully found password: ', response, str)
  })

}).then(() => {
  console.log(`Finished generating strings of length ${length}`);
});
