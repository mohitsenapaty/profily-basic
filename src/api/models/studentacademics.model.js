const dynamoose = require("dynamoose");
const { omit, isEmpty, pick, compact } = require('lodash');
const bcrypt = require('bcryptjs');

const id_gen = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const studentacademicsSchema = new dynamoose.Schema({
  _id: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
    hashKey: true,
    default: id_gen
  },
  academicprofileid: {
    type: String,
    required: true,
    index: {
      name: 'academicprofileid-studentacademics',
      global: true,
    },
  },
  schoolid: {
    type: String,
    required: true,
    index: {
      name: 'schoolid-studentacademics',
      global: true,
    },
  },
  studentprofileid: {
    type: String,
    required: true,
    index: {
      name: 'studentprofileid-studentacademics',
      global: true,
    },
  },
  details: {
    type: Object,
    schema: {
      standard: String,
      section: String,
      rollno: String,
    },
  },
  addedby: {
    type: String,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  archivedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const studentacademicsModel = dynamoose.model("Profily-Studentacademics", studentacademicsSchema);

studentacademicsModel.methods.set("createStudentacademics", async function (params) {
  const createParams = {
    ...(params),
    _id: id_gen()
  }
  await dynamoose.transaction([
    this.transaction.create(createParams),
  ]);
  const studentacademics = this.get({_id: createParams._id});
  return studentacademics;
});

studentacademicsModel.methods.set("updateStudentacademics", async function (key, params) {
  await dynamoose.transaction(compact([
    this.transaction.update(key, params),
  ]));
  const studentacademics = await this.get(key);
  return studentacademics;
});

module.exports = studentacademicsModel;