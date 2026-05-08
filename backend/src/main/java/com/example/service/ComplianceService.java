package com.example.tool.service;

import com.example.tool.entity.ComplianceRecord;
import com.example.tool.repository.ComplianceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplianceService {

    private final ComplianceRepository repo;

    public ComplianceService(ComplianceRepository repo) {
        this.repo = repo;
    }

    public List<ComplianceRecord> getAll() {
        return repo.findAll();
    }
}