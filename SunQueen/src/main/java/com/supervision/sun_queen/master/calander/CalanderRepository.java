/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.supervision.sun_queen.master.calander;

import com.supervision.sun_queen.master.calander.model.Calander;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Kalum
 */
public interface CalanderRepository extends JpaRepository<Calander, Integer> {

    @Query(nativeQuery = true, value = "select \n"
            + "index_no, \n"
            + "date, \n"
            + "status \n"
            + "from \n"
            + "calander \n"
            + "where \n"
            + "MONTH(date)=:month\n"
            + " and \n"
            + " YEAR(date) =:year")
    public List<Calander> findByMonthAndYear(@Param("month") String month, @Param("year") String year);

    public List<Calander> findByDate(Date date);
}
