/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.calander;

import com.supervision.sun_queen.master.calander.model.Calander;
import com.supervision.sun_queen.master.calander.model.EventListModel;
import com.supervision.sun_queen.master.customer.model.Customer;
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
@RestController
@CrossOrigin
@RequestMapping(value = "/api/sun-queen/master/calander")
public class CalanderController {

    @Autowired
    private CalanderService calanderService;

    @RequestMapping(value = "/save-events", method = RequestMethod.POST)
    public Calander saveCustomer(@RequestBody List<Calander> eventList) {
        return calanderService.saveEvents(eventList);

    }
    @RequestMapping(value = "/find-by-month-and-year/{month}/{year}", method = RequestMethod.GET)
    public List<Calander> findByMonthAndYear(@PathVariable("month") String month,@PathVariable("year") String year){
        return calanderService.findByMonthAndYear(month, year);
    };
    @RequestMapping(value = "/find-by-month-and-year-data/{month}/{year}", method = RequestMethod.GET)
    public List<Calander> findByMonthAndYearData(@PathVariable("month") String month,@PathVariable("year") String year){
        return calanderService.findByMonthAndYearData(month, year);
    };
            
            
//    public Calander saveCustomer(@RequestBody EventListModel eventList) {
//        System.out.println(eventList.toString());
//        return calanderService.saveEvents(eventList);
//    }
}
