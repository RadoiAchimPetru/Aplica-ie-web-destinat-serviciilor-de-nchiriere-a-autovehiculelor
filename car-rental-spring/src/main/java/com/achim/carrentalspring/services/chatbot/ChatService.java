package com.achim.carrentalspring.services.chatbot;

import com.achim.carrentalspring.entity.Car;
import com.achim.carrentalspring.repository.CarRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.completion.chat.*;
import org.springframework.data.domain.PageRequest;

import java.util.List;

// ChatService.java
@Service
public class ChatService {

    private final CarRepository cars;
    private final OpenAiService openai;

    @Value("${openai.model:gpt-4o-mini}")   // ex. model: gpt-3.5-turbo
    private String model;

    public ChatService(CarRepository cars,
                       @Value("${openai.api-key}") String apiKey) {
        this.cars   = cars;
        this.openai = new OpenAiService(apiKey);   // ← client real
    }

    public String reply(String question) {

        /* ①  build context din DB  */
        Pageable top5 = PageRequest.of(0, 5);
        List<Car> related = cars
                .findTop5ByNameContainingIgnoreCaseOrBrandContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        question, question, question, top5);
        StringBuilder ctx = new StringBuilder();
        related.forEach(c -> ctx.append("- ")
                .append(c.getBrand()).append(' ').append(c.getName())
                .append(": ").append(c.getDescription()).append('\n'));

        String system = """
            Eşti un asistent al site-ului de închirieri auto.
            Răspunzi doar la întrebări despre maşinile disponibile.
            Dacă întrebarea nu are legătură cu maşinile, spui politicos
            că nu poţi ajuta.
            Iată datele tale actuale:
            """ + ctx;

        /* ②  cerere chat completare  */
        ChatCompletionRequest req = ChatCompletionRequest
                .builder()
                .model(model)
                .messages(List.of(
                        new ChatMessage("system", system),
                        new ChatMessage("user",   question)))
                .n(1)
                .build();

        ChatCompletionResult res = openai.createChatCompletion(req);
        return res.getChoices()
                .get(0)
                .getMessage()
                .getContent()
                .trim();
    }
}

