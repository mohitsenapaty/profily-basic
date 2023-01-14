const dynamoose = require("dynamoose");
const { omit, isEmpty, pick, compact } = require('lodash');
const bcrypt = require('bcryptjs');

const id_gen = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const teacherprofileSchema = new dynamoose.Schema({
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
      name: 'schoolid-teacherprofile',
      global: true,
    },
  },
  userid: {
    type: String,
    required: true,
    index: {
      name: 'userid-teacherprofile',
      global: true,
    },
  },
  employmentid: {
    type: String,
  },
  teachername: {
    type: String,
  },
  teacheremail: {
    type: String,
  },
  teacherphone: {
    type: String,
  },
  nickname: {
    type: String,
  },
  joindate: {
    type: String,
  },
  reference: {
    type: String,
    index: {
      name: 'reference-teacherprofile',
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

const teacherprofileModel = dynamoose.model("Profily-Teacherprofile", teacherprofileSchema);

teacherprofileModel.methods.set("createTeacherprofile", async function (params) {
  const createParams = {
    ...(params),
    _id: id_gen()
  }
  await dynamoose.transaction([
    this.transaction.create(createParams),
  ]);
  const school = this.get({_id: createParams._id});
  return school;
});

teacherprofileModel.methods.set("updateTeacherprofile", async function (key, params) {
  await dynamoose.transaction(compact([
    this.transaction.update(key, params),
  ]));
  const school = await this.get(key);
  return school;
});

module.exports = teacherprofileModel;