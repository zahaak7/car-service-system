package com.example;

import static org.junit.Assert.*;
import org.junit.Test;

public class CarServiceTest {

    CarService service = new CarService();

    @Test
    public void testOilChangeBill() {
        assertEquals(1000.0, service.calculateBill("oil change", 2), 0.001);
    }

    @Test
    public void testBrakeRepairBill() {
        assertEquals(2400.0, service.calculateBill("brake repair", 2), 0.001);
    }

    @Test
    public void testFullServiceBill() {
        assertEquals(6000.0, service.calculateBill("full service", 3), 0.001);
    }

    @Test
    public void testUnknownServiceDefaultRate() {
        assertEquals(600.0, service.calculateBill("car wash", 2), 0.001);
    }

    @Test
    public void testServiceDueAtThreshold() {
        assertTrue(service.isServiceDue(10000));
    }

    @Test
    public void testServiceNotDueBelowThreshold() {
        assertFalse(service.isServiceDue(5000));
    }

    @Test
    public void testGreeting() {
        assertEquals("Welcome to Car Service, Ravi!", service.getGreeting("Ravi"));
    }
}