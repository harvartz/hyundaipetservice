package com.hyundai.thepet.admin.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hyundai.thepet.admin.dto.ReservationDTO;
import com.hyundai.thepet.admin.dto.ReservationTotalDTO;
import com.hyundai.thepet.admin.service.AdminService;

@Controller
@RequestMapping(value = "admin")
public class AdminController {

	Logger log = LogManager.getLogger("case3");

	@Autowired
	private AdminService service;

	@GetMapping(value = "main")
	public String adminMain() {
		return "admin/main";
	}

	@PostMapping(value = "reservationDetial")
	@ResponseBody
	public ResponseEntity<ReservationDTO> adminReservationDetail(ReservationDTO reservation) throws Exception {

		log.debug("controller 진입 : reservationDetail = " + reservation);
		ReservationDTO result = service.getReservationDetail(reservation);
		try {
			return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return null;
		}
	}
	
	@GetMapping(value="reservationManagement")
	@ResponseBody
	public ResponseEntity<ReservationTotalDTO> adminReservationTotal(ReservationDTO reservation){
		
		log.debug("controller 진입 : reservationManagement = " + reservation);
		ReservationTotalDTO result = service.getReservationTotal(reservation);
		try {
			return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
		}catch(Exception e){
			return null;
		}
	}
}
