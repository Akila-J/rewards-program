const isCurrentMonth = date => {
    const now = new Date();
    return (
        (date.getFullYear() == now.getFullYear()) &&
        (date.getMonth() == now.getMonth())
    );
}

const isPreviousMonth = date => {
    const now = new Date();
    let prevMonth = now.getMonth() - 1
    let nextYear = now.getFullYear()
    if (prevMonth == 12) {
        prevMonth = 0
        nextYear++
    }
    return (
        (date.getFullYear() === nextYear) &&
        (date.getMonth() == prevMonth)
    );
}

const calculateRewardPoints = amount => {
    let rewardPoints = 0;
    if (amount > 100) {
        rewardPoints = (amount - 100) * 2 + 50 * 1;
    } else if (amount > 50 && amount <= 100) {
        rewardPoints = (amount - 50) * 1;
    }

    return rewardPoints;
};

export const transformData = users => {
    const uniqueUsers = [];
    users.forEach(u => {
        const userExistsIdx = uniqueUsers.findIndex(uu => uu.firstName === u.firstName);
        if (userExistsIdx > -1) {
            if (isCurrentMonth(new Date(u.transactionDate))) {
                uniqueUsers[userExistsIdx].currentMonthRewardPoints = (uniqueUsers[userExistsIdx].currentMonthRewardPoints || 0) + calculateRewardPoints(u.transactionAmount);
            } else if (isPreviousMonth(new Date(u.transactionDate))) {
                uniqueUsers[userExistsIdx].previousMonthRewardPoints = (uniqueUsers[userExistsIdx].previousMonthRewardPoints || 0) + calculateRewardPoints(u.transactionAmount);
            } else {
                uniqueUsers[userExistsIdx].otherRewardPoints = (uniqueUsers[userExistsIdx].otherRewardPoints || 0) + calculateRewardPoints(u.transactionAmount);
            }
        } else {
            if (isCurrentMonth(new Date(u.transactionDate))) {
                u.currentMonthRewardPoints = calculateRewardPoints(u.transactionAmount);
            } else if (isPreviousMonth(new Date(u.transactionDate))) {
                u.previousMonthRewardPoints = calculateRewardPoints(u.transactionAmount);
            } else {
                u.otherRewardPoints = calculateRewardPoints(u.transactionAmount);
            }
            uniqueUsers.push(u);
        }
    });

    return uniqueUsers;
};
