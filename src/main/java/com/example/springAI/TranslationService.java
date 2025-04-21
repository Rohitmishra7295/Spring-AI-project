package com.example.springAI;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class TranslationService {
    private final ChatModel chatModel;

    // Constructor to inject ChatModel instance
    public TranslationService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    // Method to translate text into a target language
    public String translate(String text, String targetLanguage) {
        // Validate input parameters
        if (text == null || text.trim().isEmpty()) {
            throw new IllegalArgumentException("Text cannot be null or empty.");
        }

        if (targetLanguage == null || targetLanguage.trim().isEmpty()) {
            throw new IllegalArgumentException("Target language cannot be null or empty.");
        }

        // Define the translation prompt template
        var template = """
                Please translate the following text into {targetLanguage}: {text}.
                Ensure that the translation sounds natural and fluent in the target language.
                """;

        // Create the prompt template with the given parameters
        PromptTemplate promptTemplate = new PromptTemplate(template);
        Map<String, Object> params = Map.of(
                "text", text,
                "targetLanguage", targetLanguage
        );

        // Generate the prompt for the translation request
        Prompt prompt = promptTemplate.create(params);

        // Call the translation model and capture the result
        var result = chatModel.call(prompt);

        // Log the entire result to inspect the response (useful for debugging)
        System.out.println("Translation API Response: " + result);

        // Check if the result is null or lacks the expected structure
        if (result == null || result.getResult() == null || result.getResult().getOutput() == null) {
            throw new RuntimeException("Error in translation response. The result structure is unexpected.");
        }

        // Extract and return the translated text
        return result.getResult().getOutput().getText();
    }
}
