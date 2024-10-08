import react, { useEffect, useRef, useState } from "react";
import { DetButton } from "./UI/DetButton";
import { Signal } from "./UI/Signal";
import { Box, Button, ButtonGroup, Slider, Stack } from "@mui/material";
import { DetInsideBox } from "./UI/DetInsideBox";
import { DetInsideBoxTitle } from "./UI/DetInsideBoxTitle";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { displayPartsToString } from "typescript";

function App() {
  let ctx = new AudioContext()
  const sleep = (duration: number) => new Promise(resolve => setTimeout(resolve, duration))

  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isAnswering, setIsAnswering] =  useState<boolean>(false)
  const [playingTrack, setPlayingTrack] =  useState<Number>(0)

  const [freqDiff, setFreqDiff] = useState<number>(5);
  const [questionAmt, setQuestionAmt] = useState<number>(5);
  const freqDiffhandleChange = (event: Event, newValue: number | number[]) => {
    setFreqDiff(newValue as number);
  };
  const questionAmthandleChange = (event: Event, newValue: number | number[]) => {
    setQuestionAmt(newValue as number);
  };

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

  const [isGreenLightning, setIsGreenLightning] = useState<boolean>(false);
  const [isRedLightning, setIsRedLightning] = useState<boolean>(false);

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
    setIsRunning(true)
    for (let i = 0; i < questionAmt; i++) {
      setIsAnswering(true);

      setPlayingTrack(1);
      await oscillator(440);
      setPlayingTrack(0);
      await sleep(1000);

      setPlayingTrack(2);
      var rand = Math.random();
      if (rand < 0.5) {
        setCorrect("High");
        await oscillator(440 + freqDiff);
        
      } else {
        setCorrect("Low");
        await oscillator(440 - freqDiff);      
      }

      setPlayingTrack(0);
      await sleep(3000);
      
      setIsAnswering(false)

      if (answerRef.current === correctRef.current) {
        setIsGreenLightning(true)
      } else {
        setIsRedLightning(true)
      }

      await sleep(1500);
      
      setIsGreenLightning(false)
      setIsRedLightning(false)
      setAnswer("")
      setCorrect("")
    }
    setIsRunning(false)
  }

  const [showProps, setShowProps] = useState<boolean>(false)
  const toggleShowProps = () => {
    setShowProps(!showProps)
  }

  return (
    <>
    <Stack gap="24px">
    
    <DetInsideBox>
      <DetInsideBoxTitle title="Mode">
        <DetButton onClick={looping} disabled={isRunning}>start</DetButton>
      </DetInsideBoxTitle>
      <p>Diff of Freq(Hz)</p>
      <Slider
        aria-label="Difference of Frequency"
        defaultValue={5}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={5}
        value={freqDiff}
        onChange={freqDiffhandleChange}
        disabled={isRunning}
      />
      <p>Amt of Question(s)</p>
      <Slider
        aria-label="Amount of Questions"
        defaultValue={5}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={20}
        value={questionAmt}
        onChange={questionAmthandleChange}
        disabled={isRunning}
      />
    </DetInsideBox>
    
    <DetInsideBox>
    <DetInsideBoxTitle title="Stage" />
    <ButtonGroup>
      <Button onClick={() => setAnswer("High")} disabled={!isAnswering} variant={answer == "High" ? "contained" : "outlined"}>high</Button>
      <Button onClick={() => setAnswer("Low")} disabled={!isAnswering} variant={answer == "Low" ? "contained" : "outlined"}>low</Button>
    </ButtonGroup>
    <Box height="24px" />
       <Signal isGreenLightning={isGreenLightning} isRedLightning={isRedLightning}/>
    </DetInsideBox>
    
    <DetInsideBox>
      <DetInsideBoxTitle title="Properties">
        <Button onClick={toggleShowProps}>
          {showProps ?<ArrowDropUp /> : <ArrowDropDown />}
        </Button> 
      </DetInsideBoxTitle>
      <Box sx={showProps ? null : {display: "none"}}>
        <p>Answer: {answer}</p>
        <p>Correct: {correct}</p>
        <p>isAnswering?: {isAnswering ? "true" : "false"}</p>
        <p>playingTrack: {String(playingTrack)}</p>
        <p>Diff of Freq: {String(freqDiff)}</p>
        <p>isRunning?: {String(isRunning)}</p>
      </Box>
      
    </DetInsideBox>
    
    </Stack>
    </>
  );
}

export default App;
