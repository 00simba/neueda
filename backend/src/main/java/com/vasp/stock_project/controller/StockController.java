package com.vasp.stock_project.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")  // frontend url
@RequestMapping("/api/stocks")
@RestController

public class StockController {

}
