import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

app.post("/", async (req, res) => {
  console.log(req.body); // Log the parsed JSON body
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "次のテキストは、懇親における2人の会話を録音したものです。この会話の内容を適切に表すキーワードを日本語でいくつか列挙してください。適切なキーワードとは、列挙された全てのキーワードを見てその会話の内容を思い出すことができるものを指します。キーワードの数は、min:2, max:5です。アウトプットの形式は、キーワードA, キーワードB, キーワードCのようにし、それ以外は何も出力しないでください。なお、録音の精度が悪く文章が一部乱れていたり、周囲で会話している人の音声がテキスト化されている可能性があるため、会話の流れをもとに推測しながら列挙してください。",
      },
      { role: "user", content: req.body.message },
    ],
    model: "gpt-3.5-turbo-1106",
  });

  res.send(chatCompletion.choices[0].message?.content);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
