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
    public List<Calander> findMontPlanAvalability(Date date) {
        return calanderRepository.findByDate(date);
    }

    public Calander saveEvents(List<Calander> eventList) {
        Calander calander = eventList.get(1);
        List<Calander> calanderList = findMontPlanAvalability(calander.getDate());
        if (calanderList.isEmpty()) {
            for (Calander calander1 : eventList) {
                calander = calanderRepository.save(calander1);
            }
        } else {
            for (int i = 0; i < calanderList.size(); i++) {
                Calander calander2 = calanderList.get(i);
                for (Calander calander3 : eventList) {
                    calander2.setStatus(calander3.getStatus());
                    calander2.setDate(calander3.getDate());
                    calander = calanderRepository.save(calander2);
                }

            }

        }
        return calander;
    }

    public List<Calander> findByMonthAndYearData(String month, String year) {
        return calanderRepository.findByMonthAndYearData(month, year);
    }
}
