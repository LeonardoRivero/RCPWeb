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
    get getORcreateDxMainCode() {
        return `${this.domine}/api/dxmaincode/all/`;
    }
    get getORcreateRelationCode() {
        return `${this.domine}/api/relationcode/all/`;
    }
    updateInsurance(id) {
        return this._urlUpdate = `${this.domine}/api/insurance/${id}/`;
    }
    updateSpeciality(id) {
        return this._urlUpdate = `${this.domine}/api/speciality/${id}/`;
    }
    updateDxMainCode(id) {
        return this._urlUpdate = `${this.domine}/api/dxmaincode/${id}/`;
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