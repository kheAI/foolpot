import { evaluateInterview } from './lib/gemini.js';

async function test() {
  const result = await evaluateInterview(["test", "test", "test"]);
  console.log(result);
}

test();
