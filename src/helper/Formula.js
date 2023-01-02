import moment from "moment";

export const computeAge = (birthday) => {
    console.log("birthday", birthday)
    var today = moment(new Date())
    var ageDate = moment.duration(today.diff(birthday));
    var age = Math.trunc(ageDate.asYears())

    console.log("birthday", birthday)
    console.log("today", today)
    return age
}