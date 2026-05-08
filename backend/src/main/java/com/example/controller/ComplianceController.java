package com.example.tool.controller;

import com.example.tool.entity.ComplianceRecord;
import com.example.tool.service.ComplianceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ComplianceController {

    private final ComplianceService service;

    public ComplianceController(ComplianceService service) {
        this.service = service;
    }

    @GetMapping("/records")
    public List<ComplianceRecord> getRecords() {
        return service.getAll();
    }
}