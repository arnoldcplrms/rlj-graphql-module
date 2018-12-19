const activities = "/api/activities",
    accounts = "/api/accounts",
    accountability = "/api/accountabilities",
    activitiesDetails = '/api/activity_details';

module.exports = {
    ACCOUNTS: accounts,
    ACCOUNTS_BY_ID: `${accounts}/:id`,
    LOGIN: `${accounts}/login`,

    ACTIVITIES: activities,
    ACTIVITIES_BY_ID: `${activities}/:id`,
    ACTIVITIES_SEEN: `${activities}/seen`,
    ACTIVITIES_COUNT: `${activities}/:id/count`,

    ACTIVITY_DETAILS_SEEN: `${activitiesDetails}/seen`,
    ACTIVITY_DETAILS_EXP: `${activitiesDetails}/explain`,

    ACCOUNTABILITIES: accountability,
    ACCTBLREQ: `${accountability}/request`,
    ACCTBLREQ_BY_ID: `${accountability}/:id`
}