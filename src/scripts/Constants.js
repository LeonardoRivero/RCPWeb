class EndPoints {
    domine = "https://leonardorivero.pythonanywhere.com"
    get getAllGender() {
        return `${this.domine}/api/idtype/all/`;
    }
    get getORcreateInsurance() {
        return `${this.domine}/api/insurance/all/`;
    }
}
class Messages {
    get successMessage() {
        return "Datos Guardados Correctamente";
    }
    get errorMessage() {
        return "Ocurrio un error. Intentelo de nuevo"
    }
}
export default { EndPoints, Messages }