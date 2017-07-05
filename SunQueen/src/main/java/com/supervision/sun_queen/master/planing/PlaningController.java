/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.planing;

import com.supervision.sun_queen.master.planing.model.Planing;
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
@RequestMapping("/api/sun-queen/master/plans")
public class PlaningController {
    
    @Autowired
    private PlaningService planingService;
    
    @RequestMapping(value = "/find-all-plans", method = RequestMethod.GET)
    public List<Planing> findAllPlans() {
        return planingService.findAllPlans();
    }
//    @RequestMapping(value = "/find-By-line-and-status", method = RequestMethod.GET)
//    public Planing findByLineAndStatus(@PathVariable String lineNo,String Active) {
//        return planingService.findByLineAndStatus(lineNo, Active);
//    }

    @RequestMapping(value = "/save-plans", method = RequestMethod.POST)
    public Planing savePlans(@RequestBody Planing planing) {
        return planingService.savePlans(planing);
    }

    @RequestMapping(value = "/delete-plans/{indexNo}", method = RequestMethod.DELETE)
    public void deletePlans(@PathVariable Integer indexNo) {
        planingService.deletePlans(indexNo);
    }
}
