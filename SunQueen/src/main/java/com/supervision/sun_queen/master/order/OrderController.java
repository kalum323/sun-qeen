/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.order;

import com.supervision.sun_queen.master.order.model.OrderDetail;
import com.supervision.sun_queen.master.order.model.OrderSummary;
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
@RequestMapping("/api/sun-queen/master/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/find-all-order", method = RequestMethod.GET)
    public List<OrderSummary> findAllOrder() {
        return orderService.findAllOrder();
    }

    @RequestMapping(value = "/find-By-orderNo/{orderNo}", method = RequestMethod.GET)
    public OrderSummary findByOrderNo(@PathVariable String orderNo) {
        List<OrderSummary> list = orderService.findAllByOrderNo(orderNo);
        if (list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }

    @RequestMapping(value = "/save-order", method = RequestMethod.POST)
    public OrderSummary saveOrder(@RequestBody OrderSummary orderSummaryRequest) {
        return this.orderService.saveOrder(orderSummaryRequest);
    }

    @RequestMapping(value = "/delete-order/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteOrder(@PathVariable Integer indexNo) {
        orderService.deleteOrder(indexNo);
        return indexNo;
    }
}
