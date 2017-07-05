/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.planing;

import com.supervision.sun_queen.master.planing.model.Planing;
import java.util.List;
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
public class PlaningService {

    @Autowired
    private PlaningRepository planingRepository;

    public List<Planing> findAllPlans() {
        return planingRepository.findAll();
    }

    public Planing savePlans(Planing planing) {
        return planingRepository.save(planing);
    }

    public void deletePlans(Integer indexNo) {
        planingRepository.delete(indexNo);
    }

//    public Planing findByLineAndStatus(String lineNo, String Active) {
//        return planingRepository.findByLineAndStatus(lineNo , Active);
//    }

}
