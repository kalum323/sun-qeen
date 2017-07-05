/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.order;

import com.supervision.sun_queen.master.order.model.OrderDetail;
import com.supervision.sun_queen.master.order.model.OrderSummary;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public List<OrderSummary> findAllOrder() {
        return orderRepository.findAll();
    }

    @Transactional
    public OrderSummary saveOrder(OrderSummary orderSummaryRequest) {
        //set transaction number
        if (orderSummaryRequest.getTransactionNo() == null) {
            orderSummaryRequest.setTransactionNo(orderRepository.getMaximumNumber() + 1);
        }

        //set order summry index to order detail list object
        for (OrderDetail orderDetail : orderSummaryRequest.getOrderDetail()) {
            orderDetail.setOrderSummary(orderSummaryRequest);
        }

        //save order summry details
        return orderRepository.save(orderSummaryRequest);
    }

    public void deleteOrder(Integer indexNo) {

        //get order detail by index no
        OrderDetail getOrderDetailData = orderDetailRepository.getOne(indexNo);

        //get order summry object by order index no
        Integer orderSummryIndexNo = getOrderDetailData.getOrderSummary().getIndexNo();

        //get main object indexno
        OrderSummary orderSummary = orderRepository.getOne(orderSummryIndexNo);

        //remove order detail
        orderSummary.getOrderDetail().remove(getOrderDetailData);
        //save order detail
        orderDetailRepository.delete(getOrderDetailData);
        
        //save order summry object
        orderRepository.save(orderSummary);
    }

    public List<OrderSummary> findAllByOrderNo(String orderNo) {
        return orderRepository.findByOrderNo(orderNo);
    }

}
