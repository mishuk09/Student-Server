const db = require("../helpers/db.helpers");
const { Op } = require("sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  changeStatus,
  searchByKeyword,
};
async function getAll() {
  return await db.Student.findAll();
}
async function getById(id, callback) {
  getStudent(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function update(id, params) {
  const student = await getStudent(id);
  const nameChanged =
    params.student_name && params.student_name !== student.student_name;
  if (
    nameChanged &&
    (await db.Student.findOne({ where: { student_name: params.student_name } }))
  ) {
    return "Student with name " + params.student_name + " is already exists";
  }
  Object.assign(student, params);
  await student.save();
  return student;
}
async function create(params) {
  if (
    await db.Student.findOne({ where: { student_name: params.student_name } })
  ) {
    return "Student " + params.student_name + " is already exists";
  }
  const student = new db.Student(params);

  await student.save();
  return student;
}
async function changeStatus(id) {
  const student = await getStudent(id);
  //    const ret_msg = '';
  if (student.student_status) {
    student.student_status = false;
    // ret_msg = 'Camp Inactivated';
    console.log("from true");
  } else {
    student.student_status = true;
    console.log("from false");
    // ret_msg = 'Camp Activated';
  }
  await student.save();
  return student;
}
async function searchByKeyword(searchKeyword) {
  const student = await db.Student.findAll({
    where: { student_name: { [Op.like]: "%" + searchKeyword + "%" } },
  });

  if (!student || student == []) return "no Student found";
  return student;
}
async function getStudent(id) {
  const student = await db.Student.findByPk(id);
  if (!student) return "Student not found";
  return student;
}
async function del(id) {
  return await db.Student.destroy({
    where: {
      id: id,
    },
  });
}
