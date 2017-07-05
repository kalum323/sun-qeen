/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.order.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supervision.sun_queen.master.planing.model.Planing;
import com.supervision.sun_queen.master.production.model.Production;
import java.io.Serializable;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Kalum
 */
@Entity
@Table(name = "order_detail")
public class OrderDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "colour")
    private String colour;

    @Column(name = "size")
    private String size;

    @Column(name = "line")
    private String line;

    @Column(name = "order_qty")
    private Integer orderQty;

    @Column(name = "deliver_qty")
    private Integer deliverQty;

    @Column(name = "product_qty")
    private Integer productQty;

    @Column(name = "balance_qty")
    private Integer balanceQty;
    
    @Column(name = "status")
    private String status;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "orderDetail", fetch = FetchType.EAGER)
    private Set<Planing> planingSet;

    @JsonIgnore
    @JoinColumn(name = "order_summary", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private OrderSummary orderSummary;

    public OrderDetail() {
    }

    public OrderDetail(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getPoNo() {
        return poNo;
    }

    public void setPoNo(String poNo) {
        this.poNo = poNo;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public OrderSummary getOrderSummary() {
        return orderSummary;
    }

    public void setOrderSummary(OrderSummary orderSummary) {
        this.orderSummary = orderSummary;
    }

    public Integer getOrderQty() {
        return orderQty;
    }

    public void setOrderQty(Integer orderQty) {
        this.orderQty = orderQty;
    }

    public Integer getDeliverQty() {
        return deliverQty;
    }

    public void setDeliverQty(Integer deliverQty) {
        this.deliverQty = deliverQty;
    }

    public Integer getProductQty() {
        return productQty;
    }

    public void setProductQty(Integer productQty) {
        this.productQty = productQty;
    }

    public Integer getBalanceQty() {
        return balanceQty;
    }

    public void setBalanceQty(Integer balanceQty) {
        this.balanceQty = balanceQty;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<Planing> getPlaningSet() {
        return planingSet;
    }

    public void setPlaningSet(Set<Planing> planingSet) {
        this.planingSet = planingSet;
    }
    

}
