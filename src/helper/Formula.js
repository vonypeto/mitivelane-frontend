import moment from "moment";

export const computeAge = (birthday) => {
    var today = moment(new Date())
    var ageDate = moment.duration(today.diff(birthday));
    var age = Math.trunc(ageDate.asYears())
    return age
}