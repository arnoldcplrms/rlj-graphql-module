setInterval(() => {
    const { rss, heapTotal, heapUsed } = process.memoryUsage()
    console.log(`rss : ${rss.toString()} , heapTotal : ${heapTotal.toString()} , heapUsed : ${heapUsed.toString()}`);
}, 5000);