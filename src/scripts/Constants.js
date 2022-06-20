
export default class EndPoints {
    domine = "http://leonardorivero.pythonanywhere.com"
    get getAllGender() {
        return `${this.domine}/api/idtype/all/`;
    }
}
