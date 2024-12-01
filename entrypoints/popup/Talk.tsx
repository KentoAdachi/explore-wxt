import OpenAI from "openai";

export const buttonHandler = async (apiKey: string) => {
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-4o",
  });
  console.log(completion.choices[0].message.content);

  return completion.choices[0].message.content;
};
