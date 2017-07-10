/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.calander;

import com.supervision.sun_queen.master.calander.model.Calander;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class CalanderService {

    @Autowired
    private CalanderRepository calanderRepository;

    public List<Calander> findByMonthAndYear(String month, String year) {
        return calanderRepository.findByMonthAndYear(month, year);
    }

    public List<Calander> findMontPlanAvalability(Integer indexNo) {
        return calanderRepository.findByIndexNo(indexNo);
    }

    public Calander saveEvents(List<Calander> eventList) {
       Calander calander= new Calander();
            for (Calander calander1 : eventList) {
                System.out.println(calander1.getIndexNo());
                System.out.println(calander1.getDate());
                System.out.println(calander1.getStatus());
 
                calander = calanderRepository.save(calander1);
            }
        return calander;
    }

    public List<Calander> findByMonthAndYearData(String month, String year) {
        return calanderRepository.findByMonthAndYearData(month, year);
    }
}
