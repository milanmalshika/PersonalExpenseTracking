package com.example.demo.repository;

import com.example.demo.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query(value = "SELECT e FROM Expense e where e.type=:t ")
    List<Expense> getExpensesByType(@Param("t") String type);

    @Query(value = "SELECT e FROM Expense e where e.date=:d")
    List<Expense> getExpensesByDate(@Param("d") String date);

    @Query(value = "SELECT SUM(e.expense) from Expense e")
    int getTotal();

    @Query(value = "SELECT SUM(e.expense) from Expense e where e.type=:f")
    int getFoodTotal(@Param("f") String type);
}
