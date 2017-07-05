/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.customer;

import com.supervision.sun_queen.master.customer.model.Customer;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kalum
 */
@CrossOrigin
@RestController
@RequestMapping("/api/sun-queen/master/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/find-all-customer", method = RequestMethod.GET)
    public List<Customer> findAllCustomer() {
        return customerService.findAllCustomer();
    }

    @RequestMapping(value = "/save-customer", method = RequestMethod.POST)
    public Customer saveCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    @RequestMapping(value = "/delete-customer/{indexNo}", method = RequestMethod.DELETE)
    public void deleteCustomer(@PathVariable Integer indexNo) {
        customerService.deleteCustomer(indexNo);
    }

}
