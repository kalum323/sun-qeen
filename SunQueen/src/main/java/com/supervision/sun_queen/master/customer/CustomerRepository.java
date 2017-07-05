/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.customer;

import com.supervision.sun_queen.master.customer.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface CustomerRepository extends JpaRepository<Customer, Integer>{
    
}
