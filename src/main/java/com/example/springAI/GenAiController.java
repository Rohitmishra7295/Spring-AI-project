package com.example.springAI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class GenAiController {

    private final ChatService chatService;
    private final RecipeService recipeService;
    private final WeatherService weatherService;
    private final TranslationService translationService;
    private final SummarizerService summarizerService;

    public GenAiController(
            ChatService chatService,
            RecipeService recipeService,
            WeatherService weatherService,
            TranslationService translationService,
            SummarizerService summarizerService
    ) {
        this.chatService = chatService;
        this.recipeService = recipeService;
        this.weatherService = weatherService;
        this.translationService = translationService;
        this.summarizerService = summarizerService;
    }

    @GetMapping("/ask-ai")
    public String getResponse(@RequestParam String prompt) {
        return chatService.getResponse(prompt);
    }

    @GetMapping("/ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt) {
        return chatService.getResponseOptions(prompt);
    }

    @GetMapping("/recipe-creator")
    public String recipeCreator(@RequestParam String ingredients,
                                @RequestParam(defaultValue = "any") String cuisine,
                                @RequestParam(defaultValue = "") String dietaryRestrictions) {
        return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
    }


    @GetMapping("/weather")
    public ResponseEntity<?> getWeather(@RequestParam String city) {
        return weatherService.getWeather(city);
    }



    @GetMapping("/translate")
    public String translateText(@RequestParam String text,
                                @RequestParam String targetLanguage) {
        return translationService.translate(text, targetLanguage);
    }

    @PostMapping("/summarize")
    public String summarizeText(@RequestBody Map<String, String> requestBody, @RequestParam String length) {
        String inputText = requestBody.get("inputText");
        return summarizerService.summarizeText(inputText, length);
    }
}
