package com.ynab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ynab.model.Budget;
import com.ynab.model.User;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Budget findByName(String name);
}
