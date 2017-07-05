/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.production;

import com.supervision.sun_queen.master.production.model.Production;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface ProductionRepository extends JpaRepository<Production, Integer>{
    
}
