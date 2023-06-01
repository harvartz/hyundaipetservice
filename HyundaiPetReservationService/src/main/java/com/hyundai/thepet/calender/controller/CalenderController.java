package com.hyundai.thepet.calender.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hyundai.thepet.calender.service.CalenderService;
import com.hyundai.thepet.calender.vo.CalenderVO;
import com.hyundai.thepet.calender.vo.LocationInfoVO;

@Controller
@RequestMapping(value = "calender")
public class CalenderController {
	
	Logger log = LogManager.getLogger("case3");
	
	@Autowired
	private CalenderService calenderService; 
	
	@PostMapping(value = "detail", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public ResponseEntity<List<CalenderVO>> getCalenderDetails(String date) {
		List<CalenderVO> list = new ArrayList<>();
		list = calenderService.getAllDetails(date);
		return new ResponseEntity<> (list, HttpStatus.ACCEPTED);
	}
	
	@PostMapping(value = "oneMonth", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public ResponseEntity<List<CalenderVO>> getOneMonthCalenderDetails(String category, String startDate, String endDate){
		List<CalenderVO> list = new ArrayList<>();
		
		list = calenderService.getOneMonthDetails(category, startDate, endDate);
		return new ResponseEntity<> (list, HttpStatus.ACCEPTED);
	}
	
	@PostMapping(value = "facilitiesLocation", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public ResponseEntity<LocationInfoVO> getFacilitiesLocation(String branchOffice, String facilities) {
		LocationInfoVO location = new LocationInfoVO();

		location = calenderService.getLocationInfo(branchOffice, facilities);
		
		return new ResponseEntity<> (location, HttpStatus.ACCEPTED);
	}
	
	@PostMapping(value = "price", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public int getServicePrice(String dogSize, String dogFacilities) {
		return calenderService.getPrice(dogSize, dogFacilities);
	}
}
