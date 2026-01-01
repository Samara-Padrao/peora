import Groq from "groq-sdk";
import { GROQ_TOKEN } from "./environment";

export const groq = new Groq({
  apiKey: GROQ_TOKEN,
  dangerouslyAllowBrowser: true
})




