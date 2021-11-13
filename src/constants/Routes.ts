class Routes {

    // auth
    static readonly landing = '/';
    static readonly forgotPassword = '#forgot-password';
    static readonly resetPassword = '/reset-password';
    static readonly register = '/register';
    static readonly registerAuth = '/register/auth';
    static readonly registerPicture = '/register/picture';

    // error
    static readonly error = '/error';
    static readonly test = '/test';

    // dashboard
    static readonly home = '/home';
    static readonly challenges = '/home/challenges';
    static readonly challenges30Day = '/home/challenges/:challengeId/30-day';
    static readonly homeLanding = '/home/landing';
    static readonly lifeMap = '/home/life-map';
    static readonly habits = '/home/habits';
    static readonly agenda = '/home/agenda';
    static readonly activity = '/home/activity/:activityId';


    static readonly profile = '/home/profile';


}

export default Routes;
