//Getter & setter for name, age, gender & signUpStatus

let name = "";

function setName(nameData) {
  name = nameData;
}

function getName() {
  return name;
}

let age = "";

function setAge(ageData) {
  age = ageData;
}

function getAge() {
  return age;
}

let gender = "";

function setGender(genderData) {
  gender = genderData;
}

function getGender() {
  return gender;
}

let signUpStatus = false;

function setSignUpStatus(statusData) {
  signUpStatus = statusData;
}

function getSignUpStatus() {
  return signUpStatus;
}

export { setName, getName, setAge, getAge, setGender, getGender, setSignUpStatus, getSignUpStatus }