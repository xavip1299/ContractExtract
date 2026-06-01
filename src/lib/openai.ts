import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractContractData(text: string) {
  const prompt = `You are a legal contract analysis expert. Analyze the following contract text and extract the key information. Return ONLY valid JSON with the following fields (use null if not found):

{
  "parties": "string - list all parties involved",
  "effectiveDate": "string - when the contract starts",
  "expirationDate": "string - when the contract ends or null if perpetual",
  "paymentTerms": "string - payment amounts, schedule, and conditions",
  "governingLaw": "string - which jurisdiction's law governs",
  "confidentiality": "string - summary of confidentiality/NDA clauses",
  "terminationClause": "string - how and when contract can be terminated",
  "keyObligations": "string - main obligations of each party",
  "summary": "string - 2-3 sentence plain English summary of the contract"
}

Contract text:
${text.slice(0, 12000)}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.1,
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No response from OpenAI");

  return JSON.parse(content) as {
    parties: string | null;
    effectiveDate: string | null;
    expirationDate: string | null;
    paymentTerms: string | null;
    governingLaw: string | null;
    confidentiality: string | null;
    terminationClause: string | null;
    keyObligations: string | null;
    summary: string | null;
  };
}
