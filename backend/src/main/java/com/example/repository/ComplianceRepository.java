package com.example.tool.repository;

import com.example.tool.entity.ComplianceRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplianceRepository extends JpaRepository<ComplianceRecord, Long> {
}