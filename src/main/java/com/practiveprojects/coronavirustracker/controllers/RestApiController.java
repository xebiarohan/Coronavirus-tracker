package com.practiveprojects.coronavirustracker.controllers;


import com.practiveprojects.coronavirustracker.models.LocationStats;
import com.practiveprojects.coronavirustracker.services.CoronaVirusDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/virusData")
public class RestApiController {

    @Autowired
    private CoronaVirusDataService coronaVirusDataService;


    @GetMapping("/trackerData")
    public ResponseEntity<List<LocationStats>> getTrackerData() {
        List<LocationStats> allStats = coronaVirusDataService.getAllStats();
        allStats = allStats
                .stream()
                .sorted(Comparator.comparing(LocationStats::getLatestTotal).reversed())
                .collect(Collectors.toList());


        int totalNewCases = allStats.stream().mapToInt(stat -> stat.getDiffFromPreviousDay()).sum();
        return new ResponseEntity<>(allStats,HttpStatus.OK);
    }

    @GetMapping("/activeCases")
    public ResponseEntity<Integer> getTotalCases() {
        List<LocationStats> allStats = coronaVirusDataService.getAllStats();
        allStats = allStats
                .stream()
                .sorted(Comparator.comparing(LocationStats::getLatestTotal).reversed())
                .collect(Collectors.toList());
        int totalCases = allStats.stream().mapToInt(stat -> stat.getLatestTotal()).sum();

        return new ResponseEntity(totalCases,HttpStatus.OK);
    }

}
