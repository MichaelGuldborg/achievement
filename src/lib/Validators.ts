class Validators {
    static notEmpty = (text: string) => (Validators.isEmpty(text) ? 'Feltet må ikke være tomt' : undefined);
    static isEmpty = (text?: string) => text === undefined || text.trim().length === 0;
    static isNotEmpty = (text?: string) => !Validators.isEmpty(text);

    static email = (text: string) => (Validators.isNotEmail(text) ? 'Emailen er ikke gyldig' : undefined);
    static isEmail = (text: string) => Validators.isNotEmpty(text) && text.includes('@') && text.includes('.');
    static isNotEmail = (text: string) => !Validators.isEmail(text);

    static password = (text: string) => {
        if (Validators.isNotPassword(text)) {
            const goodLength = text.length >= 6 && text.length <= 64;
            if (!goodLength) {
                return "Adgangskoden skal være imellem 6 og 64 tegn"
            }

            const hasNum = /\d/.test(text);
            if (!hasNum) {
                return "Adgangskoden skal indeholde mindst ét nummer"
            }

            const hasUpper = /[A-ZÆØÅ]/.test(text);
            if (!hasUpper) {
                return "Adgangskoden skal indeholde mindst ét stort bogstav"
            }
        }

        return undefined;
    }
    static isPassword = (text: string) => {
        const goodLength = text.length >= 6 && text.length <= 64;
        const hasNum = /\d/.test(text);
        const hasUpper = /[A-ZÆØÅ]/.test(text);

        return Validators.isNotEmpty(text) && goodLength && hasNum && hasUpper;
    };
    static isNotPassword = (text: string) => !Validators.isPassword(text);

    static array = (array: unknown[]) => (Validators.isEmptyArray(array) ? 'Feltet må ikke være tomt' : undefined);
    static isEmptyArray = (array: unknown[]) => array?.length === 0;
    static isNotEmptyArray = (array: unknown[]) => !Validators.isEmptyArray(array);

    static passwordRepeat = (password: string, passwordRepeat: string) => (password !== passwordRepeat ? 'De indtastede adgangskoder er ikke ens' : undefined);

    static isPhoneNumber = (phoneNumber?: string) => phoneNumber !== undefined && phoneNumber !== null && phoneNumber.replace(/\D/g, "").length >= 8 && phoneNumber.trim().match(/^[+]*[-\s0-9]*$/g)
    static isNotPhoneNumber = (phoneNumber?: string) => !Validators.isPhoneNumber(phoneNumber);
    static phoneNumber = (phoneNumber?: string) => {
        return Validators.isEmpty(phoneNumber) || Validators.isPhoneNumber(phoneNumber) ? undefined : "Det indtastede telefonnummer er ikke gyldigt";
    }
    static isColor = (color?: string) => color !== undefined && color !== null;
    static color = (color?: string) => {
        return Validators.isEmpty(color) || Validators.isColor(color) ? undefined : "Det indtastede telefonnummer er ikke gyldigt";
    }
}

export default Validators;