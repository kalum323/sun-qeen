/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.production;

import com.supervision.sun_queen.master.planing.model.Planing;
import com.supervision.sun_queen.master.production.model.Production;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kalum
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/sun-queen/master/production")
public class ProductionController {
    
    @Autowired
    private ProductionService productionService;
    
    @RequestMapping(value = "/save-production", method = RequestMethod.POST)
    public Production  savePlans(@RequestBody Production production) {
        return productionService.savePlans(production); 
    }
}
