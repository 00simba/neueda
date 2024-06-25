package com.vasp.stock_project.repository;

import com.vasp.stock_project.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
    
}