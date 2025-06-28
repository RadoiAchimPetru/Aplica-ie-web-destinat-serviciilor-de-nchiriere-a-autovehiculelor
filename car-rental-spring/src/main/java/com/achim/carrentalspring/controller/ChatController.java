package com.achim.carrentalspring.controller;

import com.achim.carrentalspring.services.chatbot.ChatService;
import java.util.Map;
import org.springframework.web.bind.annotation.*;



// ChatController.java
@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatController {

    private final ChatService chat;

    public ChatController(ChatService chat) { this.chat = chat; }

    @PostMapping
    public Map<String,String> ask(@RequestBody Map<String,String> body) {
        String question = body.getOrDefault("message", "");
        String answer   = chat.reply(question);
        return Map.of("answer", answer);
    }
}

