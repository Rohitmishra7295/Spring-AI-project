package com.example.springAI;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SummarizerService {

    private final ChatModel chatModel;

    public SummarizerService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String summarizeText(String inputText, String length) {
        try {
            // Template for summarization
            String template = """
                    Summarize the following text: {inputText}.
                    The summary should be of {length} length.
                    Please provide the summary in a concise manner.
                    """;

            // Creating the prompt template with dynamic content
            PromptTemplate promptTemplate = new PromptTemplate(template);
            Map<String, Object> params = Map.of(
                    "inputText", inputText,
                    "length", length
            );

            // Creating the prompt with the parameters
            Prompt prompt = promptTemplate.create(params);

            // Log the generated prompt for debugging
            System.out.println("Generated Prompt: " + prompt);

            // Making the request to the AI model and returning the summarized text
            String summary = chatModel.call(prompt).getResult().getOutput().getText();

            // Log the summary result for debugging
            System.out.println("Summary: " + summary);

            return summary;
        } catch (Exception e) {
            // Log the error and return a meaningful message
            e.printStackTrace();
            return "Error occurred during summarization.";
        }
    }
}
