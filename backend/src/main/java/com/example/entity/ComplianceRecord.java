package com.example.tool.entity;

import jakarta.persistence.*;

@Entity
public class ComplianceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String complianceType;
    private String dueDate;
    private String status;

    public Long getId() { return id; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getComplianceType() { return complianceType; }
    public void setComplianceType(String complianceType) { this.complianceType = complianceType; }

    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}