class EndPoints {
    domine = "https://leonardorivero.pythonanywhere.com"
    get getAllGender() {
        return `${this.domine}/api/idtype/all/`;
    }
    get getORcreateInsurance() {
        return `${this.domine}/api/insurance/all/`;
    }
    get getORcreateSpeciality() {
        return `${this.domine}/api/speciality/all/`;
    }
    updateInsurance(id) {
        return this._urlUpdate = `${this.domine}/api/insurance/${id}/`;
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