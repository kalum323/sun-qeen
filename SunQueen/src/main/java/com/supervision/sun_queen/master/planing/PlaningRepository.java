/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.planing;

import com.supervision.sun_queen.master.planing.model.Planing;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface PlaningRepository extends JpaRepository<Planing, Integer>{

    public void findByLineAndStatus(String lineNo, String Active);
        
}
