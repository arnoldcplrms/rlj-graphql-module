const ActivitiesRoutes = require('./routes/ActivitiesRoutes'),
    AccountsRoutes = require('./routes/AccountsRoutes'),
    AccountabilityRequestRoutes = require('./routes/AccountabilityRequestRoutes'),
    AccountabilitiesRoutes = require('./routes/AccountabilitiesRoutes'),
    ActivityDetailsRoutes = require('./routes/ActivityDetailsRoutes')

module.exports = app => {
    app.use('/api/activities',
        ActivitiesRoutes)

    .use('/api/accounts',
        AccountsRoutes)

    .use('/api/accountabilities-request',
        AccountabilityRequestRoutes)

    .use('/api/accountabilities',
        AccountabilitiesRoutes)

    .use('/api/activity_details',
        ActivityDetailsRoutes)
}