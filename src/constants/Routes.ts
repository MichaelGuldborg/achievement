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
    static readonly lifeMap = '/home/life-map';
    static readonly habits = '/home/habits';
    static readonly activity = '/home/activity/:activityId';
    static readonly challenge30Day = '/home/challenge/30-day';


    static readonly profile = '/home/profile';


}

export default Routes;
