package com.practiveprojects.coronavirustracker.services;

import com.practiveprojects.coronavirustracker.models.LocationStats;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.StringReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@Service
public class CoronaVirusDataService {

    private static String ACTIVE_CASES_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

    private static String TOTAL_DEATH_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

    private List<LocationStats> allStats = new ArrayList();

    @PostConstruct
    @Scheduled(cron = "* * 1 * * *")
    public void fetchActiveCases() throws IOException, InterruptedException {
        List<LocationStats> newStats = new ArrayList();
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest coronavirusRequest = HttpRequest.newBuilder()
                .uri(URI.create(ACTIVE_CASES_URL))
                .build();

        HttpResponse<String> response = client.send(coronavirusRequest, HttpResponse.BodyHandlers.ofString());

        StringReader reader = new StringReader(response.body());
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(reader);
        for (CSVRecord record : records) {
            LocationStats locationStat = new LocationStats();
            locationStat.setState(record.get("Province/State"));
            locationStat.setCountry(record.get("Country/Region"));
            locationStat.setLatestTotal(Integer.parseInt(record.get(record.size() - 1)));
            locationStat.setDiffFromPreviousDay(Integer.parseInt(record.get(record.size() - 1)) - Integer.parseInt(record.get(record.size() - 2)));
            newStats.add(locationStat);
        }
        newStats = fetchDeathCount(newStats);
        this.allStats = newStats;
    }

    public List<LocationStats> fetchDeathCount(List<LocationStats> newStats) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest coronavirusRequest = HttpRequest.newBuilder()
                .uri(URI.create(TOTAL_DEATH_URL))
                .build();
        HttpResponse<String> response = client.send(coronavirusRequest, HttpResponse.BodyHandlers.ofString());

        StringReader reader = new StringReader(response.body());
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(reader);
        for (CSVRecord record : records) {
            newStats
                    .parallelStream()
                    .filter(stat -> {
                        if (stat.getCountry().equals(record.get("Country/Region")) && stat.getState().equals(record.get("Province/State"))) {
                            return true;
                        }
                        return false;
                    }).forEach(stat -> {
                        stat.setNewDeaths(Integer.parseInt(record.get(record.size() - 1)) - Integer.parseInt(record.get(record.size() - 2)));
                        stat.setTotalDeath(Integer.parseInt(record.get(record.size() - 1)));
            });
        }

        return  newStats;

    }


    public List<LocationStats> getAllStats() {
        return allStats;
    }
}
