package com.example;

public class CarService {

    // Calculate service bill based on service type
    public double calculateBill(String serviceType, double hours) {
        double ratePerHour;

        switch (serviceType.toLowerCase()) {
            case "oil change":   ratePerHour = 500.0; break;
            case "brake repair": ratePerHour = 1200.0; break;
            case "full service": ratePerHour = 2000.0; break;
            default:             ratePerHour = 300.0; break;
        }
        return ratePerHour * hours;
    }

    // Check if a car is due for service based on km driven
    public boolean isServiceDue(int kmDriven) {
        return kmDriven >= 10000;
    }

    // Simple greeting used by the main method
    public String getGreeting(String customerName) {
        return "Welcome to Car Service, " + customerName + "!";
    }

    public static void main(String[] args) {
        CarService service = new CarService();
        System.out.println(service.getGreeting("Divyansh"));
        System.out.println("Oil change (2 hrs) bill: ₹" + service.calculateBill("oil change", 2));
        System.out.println("Service due for 12000 km? " + service.isServiceDue(12000));
    }
}