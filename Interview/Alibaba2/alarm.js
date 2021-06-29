function alarmA() {
  console.log("alarmA");
}
function alarmB() {
  console.log("alarmB");
}
function alarmC() {
  console.log("alarmC");
}

function runAndWait(fn, time) {
  return new Promise((resolve) => {
    fn();
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function runAlarms() {
  await runAndWait(alarmA(), 3000)
  await runAndWait(alarmB(), 2000)
  await runAndWait(alarmC(), 1000)
  runAlarms()
}
