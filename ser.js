const net = require("net");

// Create a simple server
var server = net.createServer(function (conn) {
    console.log("Server: Client connected");

    // If connection is closed
    conn.on("end", function() {
        console.log('Server: Client disconnected');
        // Close the server
        server.close();
        // End the process
        process.exit(0);
    });

    // Handle data from client
    conn.on("data", function(data) {
        data = JSON.parse(data);
        console.log("Response from client: %s", data.response);
    });
    

    setInterval(function() {
        // Let's response with a hello message
        conn.write(
            JSON.stringify(
                { response: "Hey there client!" }
            )
        );
    }, 2000);
    




});

// Listen for connections
server.listen(61337, "localhost", function () {
    console.log("server running");
});
