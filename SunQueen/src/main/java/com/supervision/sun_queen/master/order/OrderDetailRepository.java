/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.order;

import com.supervision.sun_queen.master.order.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{
    
}
