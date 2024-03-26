interface User {
    id: string;
    logged_in: Date[];
    logged_out: Date[];
    lastSeenAt: Date[];
}

interface MonthlyStats {
    month: number;
    loggedInUsers: number;
    activeUsers: number;
}

function calculateMonthlyStats(users: User[]): MonthlyStats[] {
    const monthlyStats: MonthlyStats[] = [];

    for (let month = 0; month < 12; month++) {
        const loggedInUsers: Set<string> = new Set();
        const activeUsers: Set<string> = new Set();

        for (const user of users) {
            user.logged_in.forEach((loginTimestamp, index) => {
                if (loginTimestamp.getMonth() === month) {
                    loggedInUsers.add(user.id);

                    const loggedInDuration = user.logged_out[index].getTime() - loginTimestamp.getTime();
                    const daysInMonth = new Date(loginTimestamp.getFullYear(), loginTimestamp.getMonth() + 1, 0).getDate();
                    const threshold = daysInMonth * 0.5; 

                    if (loggedInDuration > threshold) {
                        activeUsers.add(user.id);
                    }
                }
            });
        }

        monthlyStats.push({
            month: month + 1,
            loggedInUsers: loggedInUsers.size,
            activeUsers: activeUsers.size
        });
    }

    return monthlyStats;
}


