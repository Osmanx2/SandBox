package com.vum.commentsapi.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Autowired
    private Environment env;

    @GetMapping("/health")
    public String getHealth() {
        return "Comments API is up and running on "+env.getProperty("envName")+" ....";
    }
}
