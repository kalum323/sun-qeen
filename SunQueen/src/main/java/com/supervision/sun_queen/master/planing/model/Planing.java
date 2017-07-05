/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.planing.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supervision.sun_queen.master.order.model.OrderDetail;
import com.supervision.sun_queen.master.production.model.Production;
import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Kalum
 */
@Entity
@Table(name = "planing")
public class Planing implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "line")
    private String line;

    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    private Date startDate;
    
    @Column(name = "end_date")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "product_qty")
    private Integer productQty;
    
    @Column(name = "total_qty")
    private Integer totalQty;
    
    @Column(name = "balance_qty")
    private Integer balanceQty;

    @Column(name = "minutes")
    private Integer minutes;

    @Column(name = "workers")
    private Integer workers;
    
    @Column(name = "status")
    private String status;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "planing", fetch = FetchType.EAGER)
    private Set<Production> production;
    
    @JsonIgnore
    @JoinColumn(name = "order_detail", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private OrderDetail orderDetail;

    public Planing() {
    }

    public Planing(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public Integer getMinutes() {
        return minutes;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }

    public Integer getWorkers() {
        return workers;
    }

    public void setWorkers(Integer workers) {
        this.workers = workers;
    }

    public OrderDetail getOrderDetail() {
        return orderDetail;
    }

    public void setOrderDetail(OrderDetail orderDetail) {
        this.orderDetail = orderDetail;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getProductQty() {
        return productQty;
    }

    public void setProductQty(Integer productQty) {
        this.productQty = productQty;
    }

    public Integer getTotalQty() {
        return totalQty;
    }

    public void setTotalQty(Integer totalQty) {
        this.totalQty = totalQty;
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

    public Set<Production> getProduction() {
        return production;
    }

    public void setProduction(Set<Production> production) {
        this.production = production;
    }

}
