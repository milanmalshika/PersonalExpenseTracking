package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Expense;
import com.example.demo.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    //  get all expenses
    @GetMapping("/expenses")
    public List<Expense> getAllUsers() {
        return expenseRepository.findAll();
    }

    //  create expense rest api
    @PostMapping("/expenses")
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    // get expense by id rest api
    @GetMapping("/expenses/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
        return ResponseEntity.ok(expense);
    }

    //update employee rest api
    @PutMapping("/expenses/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
        expense.setDescription(expenseDetails.getDescription());
        expense.setType(expenseDetails.getType());
        expense.setDate(expenseDetails.getDate());
        expense.setExpense(expenseDetails.getExpense());

        Expense updatedExpense = expenseRepository.save(expense);
        return ResponseEntity.ok(updatedExpense);
    }

    //delete employee rest api
    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteExpense(@PathVariable Long id) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        expenseRepository.delete(expense);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //get expenses by type
    @GetMapping("/expenses/filter/{type}")
    public List<Expense> getExpenseByType(@PathVariable String type) {
//        System.out.println(expenseRepository.getExpensesByType(type));
        return expenseRepository.getExpensesByType(type);
    }

    @GetMapping("/expenses/total")
    public int getTotal() {
        return expenseRepository.getTotal();
    }

    @GetMapping("/expenses/pie")
    public List<Integer> getFoodsTotal() {
        List<Integer> res = new ArrayList<>();
        String[] arr={"Foods", "Movies", "Travelling","Online Subscription"};
        for (String data:arr) {
            res.add(expenseRepository.getSumByCat(data));
        }
        return res;
    }

}

