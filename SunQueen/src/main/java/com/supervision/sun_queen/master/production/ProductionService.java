/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.production;

import com.supervision.sun_queen.master.planing.model.Planing;
import com.supervision.sun_queen.master.production.model.Production;
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
public class ProductionService {

    @Autowired
    private ProductionRepository productionRepository;

    public Production savePlans(Production production) {
        return productionRepository.save(production);
    }
}
