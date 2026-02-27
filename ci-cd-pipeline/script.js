function checkPipeline(){
    let statuses = [
        "✅ Build Successful",
        "🚀 Deploying to Server",
        "🔥 Pipeline Running",
        "✔ All Tests Passed"
    ];

    let randomStatus = statuses[Math.floor(Math.random()*statuses.length)];
    document.getElementById("status").innerText = randomStatus;
}