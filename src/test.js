const promiseRetry = require('./index')
async function retryMe(name, attempt) {
  console.log(`${name} - ${attempt}`)
  if (coinFlip()) {
    throw new Error('shit')
  } else {
    return `good: ${attempt}`
  }
}

function coinFlip() {
  return !Math.floor(Math.random() * 2)
}
/*
promiseRetry((attempt) => retryMe("bob", attempt), {
  maxAttempts: 10,
  milliseconds: 1000,
})
  .then((poo) => {
    console.log(`poo: ${poo}`);
  })
  .catch((err) => {
    console.log("bummer");
  });
  */
;(async () => {
  const value = await promiseRetry(
    async (attempt) => {
      if (coinFlip()) {
        return attempt
      } else {
        console.log('nope')
        throw new Error('nope')
      }
    },
    {
      milliseconds: 1000,
    }
  )
  console.log(value)
})()
