package com.ynab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ynab.model.Budget;
import com.ynab.service.BudgetService;

import java.util.stream.Collectors;
import java.util.List;

import lombok.Data;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    @Data
    private static class CreateBudgetRequest {
        private Long userId;
        private String budgetName;
    }

    @Data
    private static class BudgetResponse {
        private Long budgetId;
        private String budgetName;

        public BudgetResponse(Budget budget) {
            this.budgetId = budget.getId();
            this.budgetName = budget.getName();
        }
    }

    @PostMapping("/createBudget")
    public ResponseEntity<BudgetResponse> createBudget(@RequestBody CreateBudgetRequest req) {
        /* *ECP FIXME: NEED THE BUDGET NAME TO BE UNIQUE FOR THE USER */
        Budget budget = budgetService.createBudgetForUser(req.userId, req.budgetName);
        if (budget == null)
            return ResponseEntity.badRequest().build(); // Should be different if the budget already existed vs failure
        return ResponseEntity.ok(new BudgetResponse(budget));
    }

    @GetMapping("/getBudget")
    public ResponseEntity<BudgetResponse> getBudget(@RequestParam Long budgetId) {
        Budget budget = budgetService.getBudgetById(budgetId);
        if (budget == null)
            return ResponseEntity.notFound().build();
        // return ResponseEntity.ok(budget);
        return ResponseEntity.ok(new BudgetResponse(budget));
    }

    @GetMapping("/getBudgetList")
    public ResponseEntity<List<BudgetResponse>> getBudgetList(@RequestParam Long userId) {
        List<Budget> budgets = budgetService.getBudgetsForUser(userId);
        if (budgets == null || budgets.isEmpty())
            return ResponseEntity.notFound().build();
        List<BudgetResponse> budgetResponses = budgets.stream()
            .map(BudgetResponse::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(budgetResponses);
    }

    @PutMapping("/updateBudget")
    public ResponseEntity<Budget> updateBudget() {
        return null;
    }

    @PostMapping("/deleteBudget")
    public ResponseEntity<Budget> deleteBudget() {
        return null;
    }
}
