export default class Regex {
    public static isEmail(email: string): boolean {
        let pattern = new RegExp(/^[a-zA-Z0-9]{5,}(@)[a-z]{3,}.(com|co|us|ng)$/g);
        return pattern.test(email)
    }
    public static isValidName(name: string): boolean {
        let pattern = new RegExp(/^[a-zA-Z\s]{3,}$/g);
        return pattern.test(name)
    }
    public static isValidForumTitle(title: string): boolean {
        let pattern = new RegExp(/^[a-zA-Z0-9\s]{10,}$/g);
        return pattern.test(title)
    }
    public static isValidPassword(password: string): boolean {
        let pattern = new RegExp(/^[a-zA-Z0-9]{6,}$/g);
        return pattern.test(password)
    }
    public static isValidMessage(message: string): boolean {
        let pattern = new RegExp(/^[a-z,(.)!'A-Z0-9\s]{20,}$/g);
        return pattern.test(message)
    }
}