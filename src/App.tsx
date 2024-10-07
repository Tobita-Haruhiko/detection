import react, { useEffect, useRef, useState } from "react";

function App() {
  let ctx = new AudioContext()

  const sleep = (duration: number) => new Promise(resolve => setTimeout(resolve, duration))

  const [answer, setAnswer] = useState<string>("")
  const [correct, setCorrect] = useState<string>("")
  const answerRef = useRef(answer);
  const correctRef = useRef(correct);
  useEffect(() => {
    answerRef.current = answer
  }, [answer])
  useEffect(() => {
    correctRef.current = correct
  }, [correct])

  const oscillator = async(freq: number) => {
    await ctx.resume();
    let osc = new OscillatorNode(ctx)
    osc.frequency.value = freq
    osc.type = "sine"
    osc.connect(ctx.destination)
    osc.start();
    await sleep(1000);
    osc.stop();
  };

  const looping = async() => {
    for (let i = 0; i < 5; i++) {
      await oscillator(440);
      await sleep(1000);

      var rand = Math.random();
      if (rand < 0.5) {
        setCorrect("High");
        await oscillator(445);
        
      } else {
        setCorrect("Low");
        await oscillator(435);
        
      }
      await sleep(3000);

      console.log(answerRef.current)
      console.log(correctRef.current)

      if (answerRef.current === correctRef.current) {
        console.log("correct")
      } else {
        console.log("wrong")
      }
    }
  }

  return (
    <>
    <button onClick={looping}>start</button>
    <button onClick={() => setAnswer("High")}>high</button>
    <button onClick={() => setAnswer("Low")}>low</button>
    <button onClick={() => console.log(answer)}>ans?</button>
    <p>Answer: {answer}</p>
    <p>Correct: {correct}</p>
    </>
  );
}

export default App;
