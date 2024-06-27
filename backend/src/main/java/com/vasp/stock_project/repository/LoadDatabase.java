package com.vasp.stock_project.repository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.vasp.stock_project.model.Stock;

@Configuration
public class LoadDatabase {
    @Bean
    CommandLineRunner initDatabase(StockRepository repository) {
        return args -> {
            repository.save(new Stock(null, null, 0));
        };
    }


}
