package com.practiveprojects.coronavirustracker.controllers;

import com.practiveprojects.coronavirustracker.models.LocationStats;
import com.practiveprojects.coronavirustracker.services.CoronaVirusDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private CoronaVirusDataService dataService;

    @GetMapping("/")
    public String getData(Model model) {
        List<LocationStats> allStats = dataService.getAllStats();
        int totalCases = allStats.stream().mapToInt(stat -> stat.getLatestTotal()).sum();
        int totalNewCases = allStats.stream().mapToInt(stat -> stat.getDiffFromPreviousDay()).sum();
        model.addAttribute("locationStats", allStats);
        model.addAttribute("totalReportedCases",totalCases);
        model.addAttribute("totalNewCases",totalNewCases);
        return "home";
    }
}
