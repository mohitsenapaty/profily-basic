const dynamoose = require("dynamoose");
const { omit, isEmpty, pick, compact } = require('lodash');
const bcrypt = require('bcryptjs');

const id_gen = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const studentprofileSchema = new dynamoose.Schema({
  _id: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
    hashKey: true,
    default: id_gen
  },
  schoolid: {
    type: String,
    required: true,
    index: {
      name: 'schoolid-studentprofile',
      global: true,
    },
  },
  userid: {
    type: String,
    index: {
      name: 'userid-studentprofile',
      global: true,
    },
  },
  admissionid: {
    type: String,
  },
  studentname: {
    type: String,
  },
  studentphone: {
    type: String,
  },
  studentemail: {
    type: String,
  },
  dob: {
    type: String,
  },
  guardianname: {
    type: String,
  },
  comments: {
    type: Array,
    schema: [{ type: String }],
  },
  joindate: {
    type: String,
  },
  reference: {
    type: String,
    index: {
      name: 'reference-studentprofile',
      global: true,
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

const studentprofileModel = dynamoose.model("Profily-Studentprofile", studentprofileSchema);

studentprofileModel.methods.set("createStudentprofile", async function (params) {
  const createParams = {
    ...(params),
    _id: id_gen()
  }
  await dynamoose.transaction([
    this.transaction.create(createParams),
  ]);
  const studentprofile = this.get({_id: createParams._id});
  return studentprofile;
});

studentprofileModel.methods.set("updateStudentprofile", async function (key, params) {
  await dynamoose.transaction(compact([
    this.transaction.update(key, params),
  ]));
  const studentprofile = await this.get(key);
  return studentprofile;
});

module.exports = studentprofileModel;