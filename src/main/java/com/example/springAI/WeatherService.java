package com.example.springAI;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private static final String BASE_URL = "http://api.weatherstack.com/current";

    public ResponseEntity<?> getWeather(String city) {
        RestTemplate restTemplate = new RestTemplate();

        // Build URL with access_key and city query
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("access_key", apiKey)
                .queryParam("query", city)
                .toUriString();

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(response.getBody());
            } else {
                return ResponseEntity.status(response.getStatusCode()).body("Error fetching weather data.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error: " + e.getMessage());
        }
    }
}
