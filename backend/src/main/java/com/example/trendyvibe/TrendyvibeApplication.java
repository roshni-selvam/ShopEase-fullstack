package com.example.trendyvibe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TrendyvibeApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrendyvibeApplication.class, args);
    }

}