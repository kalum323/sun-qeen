/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.production.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.supervision.sun_queen.master.order.model.OrderDetail;
import com.supervision.sun_queen.master.planing.model.Planing;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Kalum
 */
@Entity
@Table(name = "production")
public class Production implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "index_no")
    private Integer indexNo;

    @Column(name = "product_qty")
    private Integer productQty;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @JsonIgnore
    @JoinColumn(name = "planing", referencedColumnName = "index_no")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Planing planing;

    public Production() {
    }

    public Production(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getIndexNo() {
        return indexNo;
    }

    public void setIndexNo(Integer indexNo) {
        this.indexNo = indexNo;
    }

    public Integer getProductQty() {
        return productQty;
    }

    public void setProductQty(Integer productQty) {
        this.productQty = productQty;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Planing getPlaning() {
        return planing;
    }

    public void setPlaning(Planing planing) {
        this.planing = planing;
    }

}
