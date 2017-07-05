/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.order.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Kalum
 */
@Entity
@Table(name = "order_summary")
public class OrderSummary implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Basic(optional = false)
    @Column(name = "order_no")
    private String orderNo;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "style")
    private String style;

    @Column(name = "brand")
    private String brand;
    
    @Column(name = "qty")
    private String qty;
    
    @Column(name = "status")
    private String status;

    @Basic(optional = false)
    @Column(name = "customer")
    private Integer customer;
    
    @NotNull
    @Column(name = "transaction_no")
    private Integer transactionNo;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "orderSummary", fetch = FetchType.EAGER)
    private Set<OrderDetail> orderDetail;

    public OrderSummary() {
    }

    public OrderSummary(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public OrderSummary(Integer indexNo, String orderNo) {
        this.indexNo = indexNo;
        this.orderNo = orderNo;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getCustomer() {
        return customer;
    }

    public void setCustomer(Integer customer) {
        this.customer = customer;
    }

    public String getQty() {
        return qty;
    }

    public void setQty(String qty) {
        this.qty = qty;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getTransactionNo() {
        return transactionNo;
    }

    public void setTransactionNo(Integer transactionNo) {
        this.transactionNo = transactionNo;
    }

    public Set<OrderDetail> getOrderDetail() {
        return orderDetail;
    }

    public void setOrderDetail(Set<OrderDetail> orderDetail) {
        this.orderDetail = orderDetail;
    }
    
}
