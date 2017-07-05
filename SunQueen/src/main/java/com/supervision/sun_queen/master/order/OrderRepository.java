/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.order;

import com.supervision.sun_queen.master.order.model.OrderSummary;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kalum
 */
public interface OrderRepository extends JpaRepository<OrderSummary, Integer>{
    @Query(value = "SELECT MAX(transaction_no) FROM order_summary", nativeQuery = true)
    public Integer getMaximumNumber();

    public List<OrderSummary> findByOrderNo(String orderNo);
}
