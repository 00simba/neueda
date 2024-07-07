package com.vasp.stock_project.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vasp.stock_project.model.Stock;
import com.vasp.stock_project.repository.StockRepository;


@CrossOrigin(origins = "http://localhost:3000")  // frontend url
@RequestMapping("/api/stocks")
@RestController
public class StockController {
    private final StockRepository repository;

    public StockController(StockRepository repository) {
        this.repository = repository;
    }

    // All assets
    
    // GET operation
    @GetMapping()
    List<Stock> getAll() {
        return repository.findAll();
    }

    // POST operation
    @PostMapping()
    Stock create(@RequestBody Stock newStock){
        return repository.save(newStock);
    }
    
    // Single item
    
    // GET operation
    @GetMapping("/{id}")
    Optional<Stock> getOne(@PathVariable Long id) {
        return repository.findById(id);
    }

    // PUT operation
    @PutMapping("/{id}")
    Stock update(@RequestBody Stock newStock, @PathVariable Long id) {
        return repository.findById(id).map(stock -> {
            stock.setName(newStock.getName());
            stock.setSymbol(newStock.getSymbol());
            stock.setPrice(newStock.getPrice());
            return repository.save(stock);
        }).orElseGet(() -> {
            return repository.save(newStock);
        });
    }    
}
