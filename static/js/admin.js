document.addEventListener("DOMContentLoaded", function () {

    // Revenue Chart

    const revenue = document.getElementById("revenueChart");

    if (revenue) {

        new Chart(revenue, {
            type: "line",
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],
                datasets: [{
                    label: "Revenue",
                    data: [
                        1200,
                        3000,
                        4200,
                        5200,
                        7600,
                        9800
                    ],
                    tension: .4
                }]
            }
        });

    }

    // Booking Chart

    const booking = document.getElementById("bookingChart");

    if (booking) {

        new Chart(booking, {
            type: "bar",
            data: {
                labels: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                datasets: [{
                    label: "Bookings",
                    data: [
                        30,
                        42,
                        55,
                        38,
                        70,
                        90,
                        65
                    ]
                }]
            }
        });

    }

});